class FoldersController < ApplicationController
  before_action :set_folder, only: %i[edit update destroy]

  # GET /folders
  # GET /folders.json
  def index
    # Need to find the current user's root folder
    @folder = current_user.root_folder

    redux_store("configureStore", props: @folder.to_json(include: :contents))
  end

  # GET /folders/1
  # GET /folders/1.json
  def show
    folder = Folder.includes(:contents).find(params[:id])

    render json: folder.contents
  end

  # GET /folders/new
  def new
    @folder = Folder.new
  end

  # GET /folders/1/edit
  def edit
  end

  # POST /folders
  # POST /folders.json
  def create
    @folder = current_user.folders.build(folder_params)

    respond_to do |format|
      if @folder.save
        format.html { redirect_to root_path, notice: 'Folder was successfully created.' }
        format.json { render :show, status: :created, location: @folder }
      else
        format.html { render :new }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /folders/1
  # PATCH/PUT /folders/1.json
  def update
    new_files = folder_params['files']
    add_more_files(new_files) unless new_files.empty?
    respond_to do |format|
      if @folder.save
        format.html { redirect_to root_path, notice: 'Folder was successfully updated.' }
        format.json { render :show, status: :ok, location: @folder }
      else
        format.html { render :edit }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /folders/1
  # DELETE /folders/1.json
  def destroy
    @folder.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Folder was successfully destroyed.' }
      format.json { head :no_content }
    end
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

    def add_more_files(new_files)
      files = @folder.files
      files += new_files
      @folder.files = files
    end
end
