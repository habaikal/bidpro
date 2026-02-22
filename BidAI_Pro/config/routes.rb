Rails.application.routes.draw do
  root "bids#index"
  
  resources :bids, only: [:index, :show] do
    post :auto_bid, on: :member
  end
end
