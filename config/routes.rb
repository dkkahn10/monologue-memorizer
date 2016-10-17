Rails.application.routes.draw do
  devise_scope :user do
    root to: "devise/registrations#edit"
  end

  resources :profiles, only: [:show] 

  devise_for :users

end
