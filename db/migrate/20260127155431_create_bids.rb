class CreateBids < ActiveRecord::Migration[8.1]
  def change
    create_table :bids do |t|
      t.string :title
      t.string :agency
      t.decimal :base_price
      t.string :category
      t.string :status
      t.datetime :deadline
      t.text :description
      t.decimal :predicted_price
      t.integer :confidence_score
      t.string :nano_banana_image_url

      t.timestamps
    end
  end
end
