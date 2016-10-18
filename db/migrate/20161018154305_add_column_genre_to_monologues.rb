class AddColumnGenreToMonologues < ActiveRecord::Migration[5.0]
  def change
    add_column :monologues, :genre, :string, null: false 
  end
end
