class InterestedBidsController < ApplicationController
  def index
    # For demo, just show some random bids as 'interested'
    @bids = Bid.limit(5)
  end
end
