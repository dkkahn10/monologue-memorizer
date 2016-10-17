class ProfilesController < ApplicationController
  before_action :authorize_user

  def show
    @user = current_user
  end

  protected

  def authorize_user
    if !user_signed_in?
      redirect_to new_user_session_path
    end
  end

end
