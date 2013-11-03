require 'json'
class AppointmentsController < ApplicationController

	#get /appointments
	def index
		@appointments = Appointment.all
		#@appointments = Appointment.where(year: params[:year], month: params[:month])
	end

	#post /appointments
	def create
		@appointment = Appointment.new(params[:appointment)
		@appointment.save
	end
end
	