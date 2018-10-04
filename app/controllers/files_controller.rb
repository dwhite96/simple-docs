class FilesController < ApplicationController
  before_action :set_folder, only: %i[new edit update destroy]

  def new
    render 'folders/_file_upload_form'
  end

  def edit
    render 'folders/_file_upload_form'
  end

  def create
    add_more_files(files_params['files'])
    flash[:error] = "Failed uploading files" unless @folder.save
    redirect_to root_path
  end

  def update
    add_more_files(files_params['files'])
    flash[:error] = "Failed uploading files" unless @folder.save
    redirect_to root_path
  end

  def destroy
    remove_file_at_index(params[:id].to_i)
    flash[:error] = "Failed deleting file" unless @folder.save
    redirect_to root_path
  end

  private

  def set_folder
    @folder = Folder.find(params[:folder_id])
  end

  def add_more_files(new_files)
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
    params.require(:folder).permit({files: []})
  end
end
