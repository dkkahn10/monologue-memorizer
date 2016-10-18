FactoryGirl.define do
  factory :monologue do
    sequence(:play_title) { |n| "Brighton Beach Memoirs#{n}"}
    character 'Eugene'
    genre 'Dramedy'
    page_number 35
    user_id
  end
end
