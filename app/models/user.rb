# frozen_string_literal: true

# User model
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/ }

  after_validation :format_name, on: %i[create update]

  has_many :folders, dependent: :destroy

  def format_name
    return unless errors.empty?
    self.first_name = first_name.downcase.titleize
    self.last_name = last_name.downcase.titleize
  end

  def full_name
    first_name << ' ' << last_name
  end
end
