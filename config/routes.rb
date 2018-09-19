Rails.application.routes.draw do
  devise_for :users

  root 'folders#index'

  resources :folders do
    resources :files, except: %i[index show]
  end
end
