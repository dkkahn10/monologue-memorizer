FactoryGirl.define do
  factory :monologue do
    sequence(:play_title) { |n| "Brighton Beach Memoirs#{n}" }
    author 'Neil Simon'
    character 'Eugene'
    page_number '48'
    genre 'Drama'
    text_file 'I am a awesome monologue!'
    user
  end
end
