class AddUserRefToFolders < ActiveRecord::Migration[5.1]
  def change
    add_reference :folders, :user, foreign_key: true, null: false
  end
end
