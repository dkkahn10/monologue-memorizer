class Monologue < ApplicationRecord
  belongs_to :user
  has_many :memories

  validates :play_title, presence: true
  validates :text_file, presence: true
end
