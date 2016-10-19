class MemoriesController < ApplicationController
  before_action :authorize_user

  def show
    @memory = Memory.find(params[:id])
    @monologue = @memory.monologue
    uri = URI("#{@monologue.text_file}")
    if uri.to_s.include?("http")
      @response = Net::HTTP.get(uri)
    else
      @response = ""
    end
  end

  def new
    @memory = Memory.new
    @monologue = Monologue.find(params[:monologue_id])
  end

  def create
    @memory = Memory.new(memory_params)
    @monologue = Monologue.find(params[:monologue_id])
    @memory.monologue_id = @monologue.id

    if @memory.save
      flash[:notice] = "The acting gods have spoken!"
      redirect_to monologue_memory_path(@monologue, @memory)
    else
      flash[:notice] = @memory.errors.full_messages.join(', ')
      render :new
    end
  end

  private

  def memory_params
    params.require(:memory).permit(:memory_monologue)
  end

  protected

  def authorize_user
    if !user_signed_in?
      redirect_to new_user_session_path
    end
  end

end
