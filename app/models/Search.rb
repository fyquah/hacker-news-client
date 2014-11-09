class Search # just a normal ruby class
  def self.for hacker_news_id
    Story.find_by(:id => hacker_news_id)
  end
end