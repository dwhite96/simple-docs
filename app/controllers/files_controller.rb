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

    files = {
      id: @folder.id,
      filenames: @folder.extract_filenames,
      type: 'APPEND_NEW_FILE'
    }

    if @folder.save
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
    add_files(files_params['files']) if files_params['files']

    # flash[:error] = "Failed uploading files" unless @folder.save
    # redirect_to root_path


    respond_to do |format|
      if @folder.update(files_params)
        format.html { redirect_to root_path, notice: 'File was successfully updated.' }
        format.json { render json: { filenames: @folder.extract_filenames } }
      else
        format.html { render :edit }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /folders/:folder_id/files/:id
  def destroy
    remove_file_at_index(params[:id].to_i)
    flash[:error] = "Failed deleting file" unless @folder.save
    redirect_to root_path
  end

  private

  def set_folder
    @folder = Folder.find(params[:folder_id])
  end

  def set_file
    @file = @folder.files[params[:id].to_i]
  end

  def add_files(new_files)
    files = @folder.files
    files += new_files
    @folder.files = files
  end

  def remove_file_at_index(index)
    files = @folder.files
    deleted_file = files.delete_at(index)
    # deleted_file.try(:remove!) # delete image from S3 if S3 storage implemented
    @folder.files = files
  end

  def files_params
    params.permit({files: []})
  end
end
