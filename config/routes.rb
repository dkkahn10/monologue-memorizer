Rails.application.routes.draw do
  root "profiles#show"
  
  resources :profiles, only: [:show]

  devise_for :users

end
