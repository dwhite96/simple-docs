# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@email.com",
  password: "12345678"
)

Folder.create!(name: "Documents", user_id: 1)
Folder.create!(name: "Photos", user_id: 1)

10.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 1)
end

5.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 3)
end

5.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 4)
end

3.times do |n|
  Folder.create!(name: Faker::Lorem.word, user_id: 1, folder_id: 13)
end
