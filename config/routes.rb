Rails.application.routes.draw do
  root "users#show"

  resources :users, only: [:show] do
    resources :monologues, only: [:show, :new, :create, :edit, :destroy]
  end

  resources :monologues, only: [:index] do
    resources :memories, only: [:show]
  end

  devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register', sign_up: 'cmon_let_me_in' }

end
