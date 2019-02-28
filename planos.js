$(document).ready(function(){

	// Inicializacao dos planos em um Array
	var plans = [

	{
		preco : 0,
		duracao: 0,
		txMin: 1,
	},

	{
		preco : 30,
		duracao: 30,
		txMin: 1.1,
	},

	{
		preco : 60,
		duracao: 60,
		txMin: 1.1,
	},

	{
		preco : 120,
		duracao: 120,
		txMin: 1.1,
	},];

	// Tarifas por minuto de A (linhas) para B (colunas)
	var pricesTable = [[0,'11','16','17','18'],
   					   ['11', 0, 1.9, 1.7, 0.9],
				  	   ['16', 2.9, 0, 0, 0],
				       ['17', 2.7, 0, 0, 0],
				       ['18', 1.9, 0, 0, 0],];

	//Criar opcoes de select para DDD de origem no formulário on page load
	for(var i = 1; i < pricesTable.length; i++){
		var option = new Option(pricesTable[0][i],pricesTable[0][i].value);
		$( "#origem" ).append(option);		
	}

	//Criar opcoes de select para o DDD de destino no formulário on DDD Origen selec change
	$( "#origem" ).change(function() {
		$( "#destino" ).children("option:not(:first)").remove();
		var index = pricesTable[0].indexOf($( "#origem" ).children( "option:selected" ).val());
		for(var i = 1; i < pricesTable.length; i++){
			//Pares Origem e Destino sem preco sao incluidos 
			if (pricesTable[i][index] != 0) {
				var option = new Option(pricesTable[i][0], pricesTable[i][0]);
				$( "#destino" ).append(option);					
			}
		}
	});

	//Calcular tarifas para cada plano on button click
	$( "#calculate" ).click(function() {
		
		$( "#message" ).removeClass().addClass( "hidden" );
		
		var msg = "";
		var min = parseInt($( "#minutos" ).val());
		//Matriz de precos é NxN, cujos valores da primeira linha sao iguais aos da primeira coluna (indices iguais para valores iguais entre linha x coluna)
		var dest = $( "#destino" ).children( "option:selected" ).val();
		var org = $( "#origem" ).children( "option:selected" ).val()
		var j = pricesTable[0].indexOf(dest);
		var i = pricesTable[0].indexOf(org);

		//Mensagem de erro(s) por mal preenchimento do formulário
		if (isNaN(i) || isNaN(j) || i<0 || j<0) {
			msg += "<p>Escolha os DDDs de origem e destino.</p>";	
		}
		if (isNaN(min) || min < 0) {
			msg += "<p>Insira a quantidade de minutos que deseja falar.</p>";
		}
		if (msg != "") {
			$( "#message" ).addClass( "alert alert-danger container" );
		} else {
			var tarifa = pricesTable[i][j];
		//Loop pelo array de planos para calculo de precos
			for(var i = 0; i < plans.length; i++){
				$( "#full-price-" + (i+1) ).text( numberToReal(plans[i].preco + Math.max(min - plans[i].duracao, 0)*tarifa*plans[i].txMin) );
				$( "#fee-" + (i+1) ).text( numberToReal(plans[i].preco) );
				$( "#over-" + (i+1) ).text( numberToReal(Math.max(min - plans[i].duracao, 0)*tarifa*plans[i].txMin) );			
			}
			//Mensagem de sucesso
			msg = "<p>Valores para ligacoes do DDD <strong>" + org + "</strong> para o DDD <strong>" + dest + "</strong> por <strong>" + min + "</strong> minutos.</p>";
			$( "#message" ).addClass( "alert alert-primary container" );
		}
		//Show div de mensagens
		$( "#message" ).html(msg);
		if($( "#message" ).hasClass( "hidden" )) $
			( "#message" ).removeClass( "hidden" );

	});

	// Funcao - conversao de número para BRL currency
	function numberToReal(num){
	    var format = "R$ " + num.toFixed(2).replace(".",",");
	    return format;
	}

});