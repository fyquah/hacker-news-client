class StoriesController < ApplicationController
  def index
    @stories = TopStory.retrieve
  end
end
