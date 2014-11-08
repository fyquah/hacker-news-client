class AddColumnsToStories < ActiveRecord::Migration
  def change
    change_table :stories do |t|
      t.column :deleted, :boolean, :default => false
      t.column :by, :string
      t.column :time, :timestamp
      t.column :dead , :boolean, :default => false
      t.column :url, :text
      t.column :title, :text
      t.column :score, :integer
    end
  end
end
