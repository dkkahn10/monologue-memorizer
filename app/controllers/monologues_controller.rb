class MonologuesController < ApplicationController
  before_action :authorize_user

  def show
    @user = current_user
    @monologue = Monologue.find(params[:id])
    uri = URI("#{@monologue.text_file}")
    @response = Net::HTTP.get(uri)
  end

  def new
    @user = current_user
    @monologue = Monologue.new
  end

  def create
    @user = current_user
    @monologue = Monologue.new(monologue_params)
    @monologue.user_id = @user.id

    if @monologue.save
      flash[:notice] = "You uploaded a new monologue! Congratulations!"
      redirect_to user_monologue_path(@user, @monologue.id)
    else
      flash[:notice] = @monologue.errors.full_messages.join(', ')
      render :new
    end
  end

  private

  def monologue_params
    params.require(:monologue).permit(:play_title, :character, :page_number, :text_file, :genre)
  end

  protected

  def authorize_user
    if !user_signed_in?
      redirect_to new_user_session_path
    end
  end

end
