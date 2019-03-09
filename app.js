$(document).ready(function(){

	setDropDownOrigin();

	$( "#origin" ).change(function(){
		setDropDownDestination($( "#origin" ).children( "option:selected" ).val());
	});

	//Calcular tarifas para cada plano on button click
	$( "#calculate" ).click( function(){
		var org = parseInt($( "#origin" ).children( "option:selected" ).val());
		var dest = parseInt($( "#destination" ).children( "option:selected" ).val());
		var min = parseInt($( "#minutes" ).val());	
		calculateButton(org, dest, min);

	});

});

