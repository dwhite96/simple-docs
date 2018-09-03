require 'rails_helper'

RSpec.describe Folder, type: :model do
  describe "validations" do
    it { is_expected.to validate_presence_of :name }
  end

  describe "associations" do
    it { is_expected.to belong_to :user }

    it { is_expected.to have_many :contents }
  end
end
