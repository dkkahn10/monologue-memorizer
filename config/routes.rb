Rails.application.routes.draw do
  root "users#show"

  resources :users, only: [:show, :index, :destroy] do
    resources :monologues, only: [:new, :create, :destroy, :edit, :update] do
      member do
        post 'copy_monologue'
      end
    end
  end

  resources :monologues, only: [:index, :show]

  devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register', sign_up: 'cmon_let_me_in' }

end
