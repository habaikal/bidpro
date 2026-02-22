class AnalysisController < ApplicationController
  def index
    # Mock data for analysis charts
    @monthly_performance = [65, 59, 80, 81, 56, 55, 40]
    @category_distribution = { 'IT' => 30, 'Construction' => 20, 'Service' => 50 }
  end
end
