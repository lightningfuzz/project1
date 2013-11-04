
class AppointmentsController < ApplicationController

	#get /appointments
	def index
		@appointments = Appointment.all
		@appointments = Appointment.where(
			year: params[:year], month: params[:month]).order(:hour, :minute).find(:all)
		render json: @appointments
	end

	#post /appointments
	def create
		@appointment = Appointment.create!(appointment_parms)
		@appointment.save
	end

	private

	def appointment_parms
		params.permit(:year, :month, :day, :hour, :minute, :description)
	end
end
	