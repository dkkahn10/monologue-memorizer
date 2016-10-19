class Monologue < ApplicationRecord
  mount_uploader :text_file, TextFileUploader
  belongs_to :user

  validates :play_title, presence: true
  validates_integrity_of :text_file
  validates :text_file, presence: true
end
