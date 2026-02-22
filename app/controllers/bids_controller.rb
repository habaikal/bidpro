class BidsController < ApplicationController
  def index
    @bids = Bid.all.order(deadline: :asc)
    @dashboard_stats = {
      total_bids: Bid.count,
      won_bids: 23, # Hardcoded for demo
      success_rate: 85.2,
      avg_savings: 12.8
    }
  end

  def show
    @bid = Bid.find(params[:id])
  end

  def auto_bid
    @bid = Bid.find(params[:id])
    user_price = params[:amount].to_i
    
    # Simulate processing delay
    sleep 1
    
    render turbo_stream: turbo_stream.update(
      "bid_modal_#{@bid.id}", 
      partial: "bids/auto_bid_result", 
      locals: { bid: @bid, user_price: user_price }
    )
  end
end
