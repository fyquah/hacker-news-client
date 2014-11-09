class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session

  def server_update_before_filter
    unless params[:authenticity_token] == ENV["HN_CLIENT_AUTHENTICITY_TOKEN"]
      render :json => { :error => "You are not authorized to perform the action" }, :status => 403
    end
  end
end
