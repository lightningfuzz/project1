// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

months = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];


$(document).ready(function(){
	date = new Date();
	updateUI(date);

	$('#back-year').click(function(){
		date = new Date(date.getFullYear() - 1, date.getMonth());
		updateUI(date);
	})

	$('#back-month').click(function(){
		date = new Date(date.getFullYear(), (date.getMonth()-1));
		updateUI(date);
	})

	$('#forward-month').click(function(){
		date = new Date(date.getFullYear(), (date.getMonth()+1));
		updateUI(date);
	})

	$('#forward-year').click(function(){
		date = new Date(date.getFullYear() + 1, date.getMonth());
		updateUI(date);
	})
});

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
		$('tr:last-child td:last-child').html(day);
		date.setDate(++day);
		dayOfWeek++;
	}

	//buffer left over days
	dayOfWeek = dayOfWeek%7
	for(dayOfWeek; dayOfWeek<7 && dayOfWeek>0; dayOfWeek++){
		$('tbody tr:last-child').append($("<td></td>"));
	}


}

