class CreateMonologues < ActiveRecord::Migration[5.0]
  def change
    create_table :monologues do |t|
      t.string :play_title, null: false
      t.string :character, null: false
      t.integer :page_number, null: false
      t.string :text_file, null: false 
    end
  end
end
