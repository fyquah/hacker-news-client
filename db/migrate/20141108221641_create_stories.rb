class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.column :hacker_news_id, :integer, :index => true
      t.timestamps
    end
  end
end
