Rails.application.routes.draw do
  root "users#show"

  resources :users, only: [:show, :index] do
    resources :monologues, only: [:new, :create, :edit, :destroy]
  end

  resources :monologues, only: [:index, :show] do
    resources :memories, only: [:show, :new, :create, :destroy]
  end

  devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register', sign_up: 'cmon_let_me_in' }

end
