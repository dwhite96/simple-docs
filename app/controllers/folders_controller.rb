class FoldersController < ApplicationController
  before_action :set_folder, only: %i[edit update destroy]

  # GET /folders
  # GET /folders.json
  def index
    # Route to current user's root folder after login
    @folder = current_user.root_folder

    redux_store("configureStore", props: @folder.as_json(include: :contents).merge(
      { filenames: @folder.extract_filenames }
    ))
  end

  # GET /folders/1
  # GET /folders/1.json
  def show
    @folder = Folder.includes(:contents).find(params[:id])

    # See if there is a better way to add filenames at a later date
    render json: @folder.as_json(include: :contents).merge(
      { filenames: @folder.extract_filenames }
    )
  end

  # GET /folders/new
  def new
    @folder = Folder.new

    respond_to do |format|
      format.js {}
    end
  end

  # GET /folders/1/edit
  def edit
    respond_to do |format|
      format.js {}
    end
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
    add_more_files(new_files)
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
