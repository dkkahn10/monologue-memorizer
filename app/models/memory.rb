class MemoryMonologue < ApplicationRecord
  belongs_to :monologue

  validates :memory_monologue, presence: true
end
