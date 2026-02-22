Rails.application.routes.draw do
  root "bids#index"
  
  resources :bids, only: [:index, :show] do
    post :auto_bid, on: :member
  end
  
  get 'analysis', to: 'analysis#index', as: 'analysis_index'
  get 'interested_bids', to: 'interested_bids#index', as: 'interested_bids_index'
  get 'settings', to: 'settings#index', as: 'settings_index'
end
