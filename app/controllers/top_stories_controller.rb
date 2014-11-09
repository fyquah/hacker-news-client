class TopStoriesController < ApplicationController
  before_action :server_update_before_filter, :only => [:update]

  def update
    puts params[:ids]
    TopStory.update_stories(params[:ids].map { |x| x.to_i })
    render :json => { :notice => "Updated the top stories list!" }, :status => 201
  end
end
