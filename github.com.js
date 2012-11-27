var dotjs_github = {};

dotjs_github.init = function() {
	dotjs_github.$labels = $('.js-color-label-list');
	dotjs_github.$label_container = $('.js-editable-labels-container');
	dotjs_github.$issues = $('.issues');

	var style = '<style>' +
		'.filter-exclude { margin-top: 10px; }' +
		'.filter-exclude input {' +
		'  box-sizing: border-box;' +
		'  padding: 3px 4px;' +
		'  width: 100%;' +
		'}' +
		'.filter-exclude .minibutton {' +
		'  display: block;' +
		'}' +
		'</style>';

	$('body').append( style );

	var $exclude = $('<div class="filter-exclude"><h4>Exclude</h4><input type="text" placeholder="Exclude labels"/><p class="clearfix"><a href="#" class="minibutton exclude-submit">Hide those mother effers</a></p></div>');

	$exclude.appendTo( '.sidebar' );

	dotjs_github.$exclude_submit = $('.filter-exclude .exclude-submit');
	dotjs_github.$exclude = $('.filter-exclude input');
	
	dotjs_github.$exclude_submit.bind('click', function( e ) {
		e.preventDefault();
		e.stopPropagation();
		var val = dotjs_github.$exclude.val();

		var values = val.split(',');
		for ( var i in values ) {
			dotjs_github.$issues.find('.label[data-name="' + $.trim( values[ i ] ) + '"]').closest('tr').hide();
		}
	});
};

dotjs_github.init();
