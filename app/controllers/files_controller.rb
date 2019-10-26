class FilesController < ApplicationController
  before_action :set_folder, only: %i[new edit create update destroy]

  # GET /folders/:folder_id/files/new
  def new
    respond_to :js
  end

  # GET /folders/:folder_id/files/:id/edit
  def edit
    respond_to :js
  end

  # POST /folders/:folder_id/files
  def create
    add_files(files_params['files']) if files_params['files']

    # Generate :js response to close rails form modal and
    #   then broadcast data via websocket to react component.
    if @folder.save
      files = {
        id: @folder.id,
        filenames: @folder.extract_filenames,
        type: 'UPDATE_FILE_LIST'
      }

      respond_to do |format|
        format.js { render 'closeModal.js' }
      end

      flash.now[:notice] = 'File was successfully created.'
      FoldersChannel.broadcast_to(current_user, files)
    else
      flash.now[:error] = 'File could not be created.'
    end
  end

  # PATCH/PUT /folders/:folder_id/files/:id
  def update
    file = @folder.files[params[:id].to_i]

    if file.rename(files_params[:file], params[:id].to_i)
      updated_file_list = {
        id: @folder.id,
        filenames: @folder.extract_filenames,
        type: 'UPDATE_FILE_LIST'
      }

      respond_to do |format|
        format.js { render 'closeModal.js' }
      end

      flash.now[:notice] = 'File was successfully updated.'
      FoldersChannel.broadcast_to(current_user, updated_file_list)
    else
      flash.now[:error] = 'File could not be updated.'
    end
  end

  # DELETE /folders/:folder_id/files/:id
  def destroy
    # Actually updating folder and deleting file in Folder#files array
    remove_file_at_index(params[:id].to_i)

    if @folder.save
      updated_file_list = {
        id: @folder.id,
        filenames: @folder.extract_filenames,
        type: 'UPDATE_FILE_LIST'
      }
      flash.now[:notice] = 'File was successfully deleted.'
      FoldersChannel.broadcast_to(current_user, updated_file_list)
      head :no_content
    else
      flash.now[:error] = "File could not be deleted."
    end
  end

  private

    def set_folder
      @folder = Folder.find(params[:folder_id])
    end

    def add_files(new_files)
      files = @folder.files
      files += new_files
      @folder.files = files
      @folder.files_will_change!
    end

    def remove_file_at_index(index)
      files = @folder.files
      deleted_file = files.delete_at(index)
      p "Deleted #{deleted_file}"
      @folder.files = files
    end

    def files_params
      params.require(:folder).permit({files: []}, :file)
    end
end
