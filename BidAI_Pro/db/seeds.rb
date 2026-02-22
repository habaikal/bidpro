# Clear existing data
Bid.destroy_all

categories = ['IT', 'Construction', 'Security', 'Research', 'Services']
agencies = ['Seoul Metropolitan Government', 'Ministry of Science and ICT', 'National Police Agency', 'Korea Land and Housing Corporation', 'Incheon Airport Corporation']

projects = [
  "Next-Gen Smart City IoT Platform",
  "Cloud Security Infrastructure Upgrade",
  "AI-based Traffic Management System",
  "Government Complex Facilities Maintenance",
  "National Data Center Expansion",
  "Blockchain Voting System Pilot",
  "Cyber Threat Intelligence Network",
  "Educational VR Content Development",
  "Public Sector API Gateway Construction",
  "Integrated Disaster Response System"
]

projects.each_with_index do |project_name, index|
  category = categories.sample
  base_price = rand(100_000_000..10_000_000_000)
  
  bid = Bid.create!(
    title: project_name,
    agency: agencies.sample,
    base_price: base_price,
    category: category,
    status: ['Open', 'Imminent', 'Open', 'Closed'].sample,
    deadline: rand(1..30).days.from_now,
    description: "This project aims to implement #{project_name.downcase} with state-of-the-art technology.",
    nano_banana_image_url: "https://source.unsplash.com/random/800x600/?#{category.downcase},technology"
  )

  # Simulate AI prediction for open bids
  if bid.status != 'Closed'
    prediction = BidPredictionService.predict(bid)
    bid.update!(
      predicted_price: prediction[:predicted_price],
      confidence_score: prediction[:confidence_score]
    )
  end
end

puts "Created #{Bid.count} bids."
