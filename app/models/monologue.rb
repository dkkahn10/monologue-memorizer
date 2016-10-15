class Monologue < ApplicationRecord
  mount_uploader :text_file, TextFileUploader

  validates :play_title, presence: true
  validates :text_file, presence: true

end
