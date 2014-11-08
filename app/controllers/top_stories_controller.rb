class TopStoriesController < ApplicationController
  def update
    puts params[:ids]
    TopStory.update_stories(params[:ids].map { |x| x.to_i })
    render :json => { :notice => "Updated the stories!" }, :status => 201
  end
end
