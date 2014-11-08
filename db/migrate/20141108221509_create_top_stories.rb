class CreateTopStories < ActiveRecord::Migration
  def change
    create_table :top_stories do |t|
      t.column :hacker_news_id, :integer, :unique => true
      t.timestamps
    end
  end
end
