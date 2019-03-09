function setDropDownOrigin() {
	for(var i = 0; i < ddds.length; i++){
		var option = new Option(ddds[i], ddds[i]);
		$( "#origin" ).append(option);		
	}
}

function setDropDownDestination(org) {
	$( "#destination" ).children("option:not(:first)").remove();
	for(var i = 0; i < ddds.length; i++){
		if (ddds[i] != org && rates[org + '-' + ddds[i]]) {
			var option = new Option(ddds[i], ddds[i]);
			$( "#destination" ).append(option);
		}
	}
}

function calculateButton(org, dest, min) {

	hideMsg();
	var msg = checkError(org, dest, min);
	if (msg != "") {
		showMsg( "alert alert-danger container", msg);
		return;
	}

	var rate = rates[org + '-' + dest];
	calculateRates(rate, min);
	markBestRate();
	msg = "<p>Valores para ligacoes do DDD <strong>" + org + "</strong> para o DDD <strong>" + dest + "</strong> por <strong>" + min + "</strong> minutos.</p>";
	showMsg( "alert alert-primary container", msg );

}

function hideMsg() {
	$( "#message" ).removeClass().addClass( "hidden" );
}

function checkError(org, dest, min) {
	var error = "";
	if (isNaN(org) || isNaN(dest) || org<0 || dest<0) error += "<p>Escolha os DDDs de origem e destino.</p>";
	if (isNaN(min) || min < 0) error += "<p>Insira a quantidade de minutos que deseja falar.</p>";
	return error;
}

function showMsg( newClass, msg ) {
	if($( "#message" ).hasClass( "hidden" )) $( "#message" ).removeClass( "hidden" );
	$( "#message" ).addClass( newClass );
	$( "#message" ).html(msg);
}

function calculateRates(rate, min) {
	for(var i = 0; i < plans.length; i++){
		plans[i].variablePrice = Math.max(min - plans[i].freeMinutes, 0)*rate*plans[i].rateMultiplier;

		$( "#full-price-" + (i + 1) ).text( numberToReal(plans[i].fixedPrice + plans[i].variablePrice) );
		$( "#fee-" + (i + 1) ).text( numberToReal(plans[i].fixedPrice) );
		$( "#over-" + (i + 1) ).text( numberToReal(plans[i].variablePrice) );
	}
}

function numberToReal(num){
	var format = "R$ " + num.toFixed(2).replace(".",",");
	return format;
}

function markBestRate() {
	var prices = [];
	for(var i = 0; i < plans.length; i++){
		if($( "#card-" + (i + 1)).hasClass( "best-rate" )) $( "#card-" + (i + 1)).removeClass( "best-rate" );
		if(!$( "#card-btn-" + (i + 1)).hasClass( "btn-primary" )) $( "#card-btn-" + (i + 1)).addClass( "btn-primary" );
		if($( "#card-btn-" + (i + 1)).hasClass( "btn-success" )) $( "#card-btn-" + (i + 1)).removeClass( "btn-success" );
		prices.push( plans[i].fixedPrice + plans[i].variablePrice );
	}
	var bestRate = prices.indexOf( Math.min.apply(null, prices) );
	$( "#card-" + (bestRate + 1) ).addClass( "best-rate" );
	$( "#card-btn-" + (bestRate + 1) ).removeClass( "btn-primary" ).addClass( "btn-success" );
}