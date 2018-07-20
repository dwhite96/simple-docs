class Folder < ApplicationRecord
  validates :name, presence: true

  has_many :contents, class_name: "Folder"
end
