class Folder < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :contents, class_name: "Folder"

  mount_uploaders :files, FileUploader
end
