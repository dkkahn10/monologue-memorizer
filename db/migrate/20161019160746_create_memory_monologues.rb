class CreateMemoryMonologues < ActiveRecord::Migration[5.0]
  def change
    create_table :memory_monologues do |t|
      t.belongs_to :monologue, null: false
      t.string :memory_text, null: true 
    end
  end
end
