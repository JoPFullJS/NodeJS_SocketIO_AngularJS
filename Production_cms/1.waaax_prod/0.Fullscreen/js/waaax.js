
	//	Video BG only for ecology section
	
	jQuery(document).ready(function() {
	
		$(window).on('scroll click', function () {
			if($('#bg-eco').hasClass( "active" ) ){
				$('.video-bg').show();
			}
			else{
				$('.video-bg').hide();
			}
		});
	
	});

	// Nav in toolscontainer
	
	
	// Nav profil
	$('a[href="#toolscontainer"][data-nav="profil"]').click(function(){
		$('#toolscontainer .container').hide();
		$('#profil').show();
	});
	// Nav transporteur
	$('a[href="#toolscontainer"][data-nav="transporteur"]').click(function(){
		$('#toolscontainer .container').hide();
		$('#transporteur').show();
	});
	// Nav profiltransporteur
	$('a[href="#toolscontainer"][data-nav="profiltransporteur"]').click(function(){
		$('#toolscontainer .container').hide();
		$('#profiltransporteur').show();
	});
	// Nav WEB
	$('a[href="#toolscontainer"][data-nav="web"]').click(function(){
		$('#toolscontainer .container').hide();
		$('#web').show();
	});
	// Nav DNS
	$('a[href="#toolscontainer"][data-nav="dns"]').click(function(){
		$('#toolscontainer .container').hide();
		$('#dns').show();
	});
	
	