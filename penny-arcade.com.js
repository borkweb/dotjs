var dotjs_pa = {};

dotjs_pa.init = function() {
	$('#leaderboard').css( 'padding', 0 );
	$('#main').css( 'padding-top', '5px' );
	$('#comic .navTop').hide();
	$('.copy.comicTag h4 a').css( {
		backgroundSize: '75% 75%',
		height: '25px',
		width: '25px'
	});
	$('.copy.comicTag h2').css( {
		fontSize: '24px',
		lineHeight: '30px'
	});
	$('.btnBuyPrint').hide();

	setTimeout( function() {
		$('#leaderboard').slideUp('fast');
	}, 700 );
};
dotjs_pa.init();
