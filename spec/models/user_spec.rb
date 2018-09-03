require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { user = create(:user) }

  let(:invalid_user) {
    invalid_user = User.new(
      first_name: nil,
      last_name: nil,
      email: nil,
      password: nil
    )
  }

  describe "validations" do
    context "on a new user" do
      it "is valid with a first_name, last_name, email, and password" do
        expect(user).to be_valid
      end

      it "is invalid without a first_name" do
        invalid_user.valid?
        expect(invalid_user.errors[:first_name]).to include("can't be blank")
      end

      it "is invalid without a last_name" do
        invalid_user.valid?
        expect(invalid_user.errors[:last_name]).to include("can't be blank")
      end

      it "is invalid without an email address" do
        invalid_user.valid?
        expect(invalid_user.errors[:email]).to include("can't be blank")
      end

      it "is invalid without a password" do
        invalid_user.valid?
        expect(invalid_user.errors[:password]).to include("can't be blank")
      end

      it "is invalid with a duplicate email address regardless of case" do
        User.create(
          first_name:   "John",
          last_name:    "Doe",
          email:        "j_doe@email.com",
          password:     "password"
        )

        user = User.new(
          first_name:   "Jane",
          last_name:    "Doe",
          email:        "J_Doe@email.com",
          password:     "password"
        )

        user.valid?
        expect(user.errors[:email]).to include("has already been taken")
      end

      it "is invalid with an incorrectly formatted email address" do
        invalid_addresses = %w[
          user@example,com
          user_at_foo.org
          user.name@example.
          foo@bar_baz.com
          foo@bar+baz.com
        ]

        invalid_addresses.each do |invalid_address|
          user = User.new(email: invalid_address)
          user.valid?
          expect(user.errors[:email]).to include("is invalid")
        end
      end

      it "is invalid with a short password" do
        user = User.new(password: "short", password_confirmation: "short")
        user.valid?
        expect(user.errors[:password]).
          to include("is too short (minimum is 8 characters)")
      end

      it "is invalid with a confirmation mismatch" do
        user = User.new(password: "short", password_confirmation: "long")
        user.valid?
        expect(user.errors[:password_confirmation]).
          to include("doesn't match Password")
      end
    end
  end

  describe "after validations" do
    it "formats name before saving in database" do
      user = User.create(
        first_name:   "jake",
        last_name:    "doe",
        email:        "j_doe@email.com",
        password:     "password"
      )

      expect(user.full_name).to include("Jake Doe")
    end
  end

  describe "associations" do
    it { is_expected.to have_many :folders }
  end
end
