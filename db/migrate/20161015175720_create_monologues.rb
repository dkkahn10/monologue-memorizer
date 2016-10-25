class CreateMonologues < ActiveRecord::Migration[5.0]
  def change
    create_table :monologues do |t|
      t.string :play_title, null: false
      t.string :author
      t.string :character
      t.integer :page_number
      t.string :text_file, null: false
    end
  end
end
