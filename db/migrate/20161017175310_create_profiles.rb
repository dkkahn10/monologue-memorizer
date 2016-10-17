class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.belongs_to :user, null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end
