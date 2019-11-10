Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }

  root 'folders#index'

  resources :folders do
    resources :files, except: %i[index show create] do
      get 'download', to: 'files#download', on: :member
    end

    patch 'files', to: 'files#create'
  end
end
