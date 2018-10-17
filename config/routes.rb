Rails.application.routes.draw do
  devise_for :users

  root 'folders#index'

  resources :folders do
    resources :files, except: %i[index show create]
    patch 'files', to: 'files#create'
  end
end
