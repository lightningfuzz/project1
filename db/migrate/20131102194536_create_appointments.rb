class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.integer :year
      t.integer :month
      t.integer :day
      t.integer :hour
      t.integer :minute
      t.string :description

      t.timestamps
    end
  end
end
