class FoldersController < ApplicationController
  before_action :set_folder, only: %i[edit update destroy]

  # GET /folders
  # GET /folders.json
  def index
    top_level_folders = current_user.top_level_folders

    redux_store("configureStore", props: top_level_folders)
  end

  # GET /folders/1
  # GET /folders/1.json
  def show
    @folder = Folder.includes(:subfolders).find(params[:id])

    # See if there is a better way to add filenames at a later date
    render json: @folder.as_json(include: :subfolders).merge(
      { filenames: @folder.extract_filenames }
    )
  end

  # GET /folders/new
  def new
    @folder = Folder.new(folder_id: params[:folder_id].to_i)

    respond_to :js
  end

  # GET /folders/1/edit
  def edit
    respond_to :js
  end

  # POST /folders
  def create
    @folder = current_user.folders.build(folder_params)

    # Generate :js response to close rails form modal and
    #   then broadcast data via websocket to react component.
    if @folder.save
      respond_to do |format|
        format.js { render 'closeModal.js' }
      end
      flash.now[:notice] = 'Folder was successfully created.'
      FoldersChannel.broadcast_to(current_user,
        @folder.as_json.merge({ type: 'CREATE_NODE' })
      )
    else
      flash.now[:error] = 'Folder could not be created.'
    end
  end

  # PATCH/PUT /folders/1
  def update
    if @folder.update(folder_params)
      respond_to do |format|
        format.js { render 'closeModal.js' }
      end
      flash.now[:notice] = 'Folder was successfully updated.'
      FoldersChannel.broadcast_to(current_user,
        @folder.as_json.merge({ type: 'UPDATE_NODE' })
      )
    else
      flash.now[:error] = 'Folder could not be updated.'
    end
  end

  # DELETE /folders/1
  def destroy
    deleted_folder = {
      id: @folder.id,
      folder_id: @folder.folder_id,
      type: 'DELETE_NODE'
    }
    @folder.destroy
    flash.now[:notice] = 'Folder was successfully destroyed.'
    FoldersChannel.broadcast_to(current_user, deleted_folder)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_folder
    @folder = Folder.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def folder_params
    params.require(:folder).permit(:name, :user_id, :folder_id, {files: []})
  end
end
