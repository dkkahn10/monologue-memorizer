class Memory < ApplicationRecord
  belongs_to :monologue

  validates :memory_monologue, presence: true
end
