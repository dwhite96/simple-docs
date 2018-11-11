class FileUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "../user_file_storage/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def rename(new_name, index)
    old_file = self.file
    new_filename = "#{new_name}#{File.extname(old_file.file)}"
    new_path = File.join(File.dirname(old_file.file), new_filename)
    new_file = old_file.move_to(new_path)
    # Need to update the database column array element directly. Updating using
    #   the Folder instance will not work because the FileUploader instance is
    #   'mounted' on it.
    database_files_array = Folder.where(id: model.id).pluck(:files).first
    database_files_array[index] = new_filename
    model.update_column(mounted_as, database_files_array)
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_whitelist
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
