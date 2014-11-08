class TopStory < ActiveRecord::Base
  class << self
    def update_stories arr
      self.delete_all
      arr.each do |x|
        self.create :hacker_news_id => x
      end
    end

    def retrieve
      Story.where(:hacker_news_id => arr_of_ids)
    end

    private
      def arr_of_ids
        self.connection.select_all("SELECT hacker_news_id FROM top_stories").map { |x| 
          print x
          x["hacker_news_id"] 
        }
      end
  end
end
