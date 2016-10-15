FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "link#{n}@hyrulecastle.com" }
    first_name 'Link'
    last_name 'Courage'
    password 'zelda1212'
    password_confirmation 'zelda1212'
  end
end
