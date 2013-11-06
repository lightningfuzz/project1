// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function createCal(){
	
	months = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];
			
	date = new Date();

	$('#time').val('12:00pm');

	updateUI(date);

	$('#back-year').click(function(){
		date = new Date(date.getFullYear() - 1, date.getMonth());
		updateUI(date);
	});

	$('#back-month').click(function(){
		date = new Date(date.getFullYear(), (date.getMonth()-1));
		updateUI(date);
	});

	$('#forward-month').click(function(){
		date = new Date(date.getFullYear(), (date.getMonth()+1));
		updateUI(date);
	});

	$('#forward-year').click(function(){
		date = new Date(date.getFullYear() + 1, date.getMonth());
		updateUI(date);
	});

	$('table').delegate('.del-button', 'click',function(e){
		$.ajax({
		  type: "DELETE",
		  url: "/appointments/" + $(this).parent().attr('data-id'),
		});
		$(this).parent('li').remove();
		e.stopPropagation();
	});
}

function updateUI(date){
	$('tbody').empty();
	today = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	$('#month').html(months[month] + " "+year);
	date = new Date(year, month, 1)
	dayOfWeek = date.getDay();

	//buffer first blank days of month
	$('tbody').append($("<tr></tr>"));
	for(i=0; i<dayOfWeek; i++){
		$('tbody tr:last-child').append($("<td></td>"));
	}
	
	//fill in days of month
	while(month == date.getMonth()){
		if((dayOfWeek%7) == 0){
			$('tbody').append($("<tr></tr>"));
		}
		day = date.getDate();
		$('tbody tr:last-child').append($("<td></td>"));
		//$('tr:last-child td:last-child').toggleClass("dayOfMonth");
		$('tr:last-child td:last-child').attr('data-day', day)
		$('tr:last-child [data-day]:last-child').append(day);
		$('tr:last-child [data-day]:last-child').append('<ul></ul>');
		if((month == (new Date).getMonth() && day == (new Date).getDate())){
			$('tr:last-child [data-day]:last-child').css('background-color', '#D0DBDB');
		}

		date.setDate(++day);
		dayOfWeek++;
	}

	//buffer left over days
	dayOfWeek = dayOfWeek%7
	for(dayOfWeek; dayOfWeek<7 && dayOfWeek>0; dayOfWeek++){
		$('tbody tr:last-child').append($("<td></td>"));
	}

	fillInAppointments(month, year);

	$('tr').delegate('[data-day]','click',function(){
		des = $("#description").val();
		if(des != ""){
			timeTemp = $('#time').val();
			time = ($("#time").val()).split(/:|am|pm/);
			timeOfDay = ($("#time").val()).split(/\d+:\d\d/);
			hour = Number(time[0]);
			minute = Number(time[1]);
			day = $(this).attr('data-day');

			if (hour < 12 && timeOfDay[1] == 'pm'){
				hour += 12;
			}
			if (hour == 12 && timeOfDay[1] == 'am'){
				hour = 0;
			}	
			appointment = {'year': year, 'month': month, 'day': day, 'hour': hour,'minute': minute, 'description': des};
			
			$.post('/appointments', appointment, function(appoint){

				temp = $('[data-day='+ appoint.day +'] ul').append($('<li></li>').append(timeTemp + ' ' + des).attr(
					 	'data-hour',hour).attr('data-id', 0));
				$('li:last-child', temp).append("<div class='del-button'><a>x</a></div>").attr("data-id", appoint.id);
			});
			// $('ul', this).append($('<li></li>').append($('#time').val() + ' ' + des).attr(
			// 	'data-hour',hour).attr('data-id', 0));

			// $('li:last-child', this).append("<div class='del-button'><a>x</a></div>").attr("data-id", appointment.id);

			setTimeout(function(){
			  sortList(day);
			}, 200);
			
			//alert('test');
		}

		$('#description').val('');
		$('#time').val('12:00pm');
	});



}

function fillInAppointments(month, year){
	$.get('/appointments', {'month': month, 'year': year}, 
		function(appointments){
		$.each(appointments, function(index, appointment){

			if(appointment.minute < 10){
				minute = '0' + appointment.minute;
			}
			else{
				minute = appointment.minute
			}

			switch (true){
				case appointment.hour == 12:
					hour = 12;
					timeOfDay = 'pm';
					break;
				
				case appointment.hour > 12:
					hour = appointment.hour - 12;
					timeOfDay = 'pm';
					break;

				case appointment.hour == 0:
					hour = 12;
					timeOfDay = 'am';
					break;
				
				default:
					hour = appointment.hour;
					timeOfDay = 'am';
			}

			temp = $('[data-day='+ appointment.day +'] ul').append(
				$('<li></li>').append(hour + ':' + minute + timeOfDay
					+ ' ' + appointment.description).attr('data-hour', appointment.hour));

			$('li:last-child', temp).append("<div class='del-button'><a>x</a></div>").attr("data-id", appointment.id);

		});
	});
}

function sortList(day){
	list = $('[data-day='+ day +'] ul li');
	list.sort(function(a,b){
		compA = Number($(a).attr('data-hour'));
		compB = Number($(b).attr('data-hour'));
		if (compA > compB) return 1;
		if (compA < compB) return -1;
		return 0;
	});
	$('[data-day='+ day +'] ul').append(list);
}









