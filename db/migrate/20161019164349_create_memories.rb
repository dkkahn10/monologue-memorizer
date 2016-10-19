class CreateMemories < ActiveRecord::Migration[5.0]
  def change
    create_table :memories do |t|
      t.belongs_to :monologue, null: false
      t.text :memory_monologue, null: false
    end
  end
end
