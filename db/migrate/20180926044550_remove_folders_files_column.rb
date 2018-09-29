class RemoveFoldersFilesColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :folders, :files
  end
end
