class FolderSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :subfolders, class_name: "Folder"
end
