require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:username) {|n| "username#{n}" }
    sequence(:first_name) { |n| "Name#{n}" }
    last_name { 'Surname' }
    password { 'password' }
    password_confirmation { 'password' }
  end

end
