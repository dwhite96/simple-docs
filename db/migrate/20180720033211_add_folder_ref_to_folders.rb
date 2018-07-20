class AddFolderRefToFolders < ActiveRecord::Migration[5.1]
  def change
    add_reference :folders, :folder, foreign_key: true
  end
end
