class StoriesController < ApplicationController
  before_action :server_update_before_filter, :only => [:update]
  def index
    @stories = Story.all
  end

  def latest
    @stories = Story.all
  end

  def update
    if Story.where(:id => story_params[:id]).count == 0
      @story = Story.create!(story_params)
    else
      @story = Story.find_by(:id => story_params[:id])
      @story.update_attributes(story_params)
    end
    render :json => { :story => @story }, :status => 201
  end

  private
    def story_params
      parameters = params.require(:story).permit(:id, :deleted, :by, :time, :dead, :url, :score, :title)
    end
end
