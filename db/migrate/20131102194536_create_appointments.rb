class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.int :year
      t.int :month
      t.int :day
      t.int :hour
      t.int :minute
      t.string :description

      t.timestamps
    end
  end
end
