class Folder < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :subfolders, class_name: "Folder", dependent: :destroy

  mount_uploaders :files, FileUploader

  def extract_filenames
    files.map do |file|
      file.file.identifier
    end
  end
end
