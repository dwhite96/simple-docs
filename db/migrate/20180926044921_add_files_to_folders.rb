class AddFilesToFolders < ActiveRecord::Migration[5.1]
  def change
    add_column :folders, :files, :json
  end
end
