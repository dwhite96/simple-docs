# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  first_name: "David",
  last_name: "White",
  email: "daviddwhite75@gmail.com",
  password: "12345678"
)

Folder.create!(name: "My Docs", user_id: 1)

10.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 1)
end

5.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 2)
end

5.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 3)
end

3.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 12)
end
