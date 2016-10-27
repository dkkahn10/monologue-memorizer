class UpdatePageNumberInMonologues < ActiveRecord::Migration[5.0]
  def change
    change_column_null :monologues, :page_number, null: false
  end
end
