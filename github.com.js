var dotjs_github = {};

dotjs_github.init = function() {
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
		'  text-align: center;' +
		'}' +
		'.filter-list li {' +
		'  position: relative;' +
		'}' +
		'.filter-list .hide-it {' +
		'  color: #bf0000;' +
		'  font-size: 20px;' +
		'  line-height: 20px;' +
		'  left: -20px;' +
		'  position: absolute;' +
		'  top: 0px;' +
		'}' +
		'.filter-list .hide-it.clicked {' +
		'  color: #ccc;' +
		'}' +
		'.filter-list .hide-it:hover {' +
		'  text-decoration: none;' +
		'}' +
		'.issues .item.hidden {' +
		'  display: none;' +
		'}' +
		'</style>';

	$('body').append( style );

	$('.sidebar .filter-item').live('click.dotjs_github', function( e ) {
		e.preventDefault();
		setTimeout( function() {
			dotjs_github.$issues = $('.issues');
			dotjs_github.add_hide_links();
		}, 500 );
	});

	dotjs_github.add_hide_links();
};

dotjs_github.add_hide_links = function() {
	var $labels = $('.js-color-label-list');
	$labels.find('li').prepend('<a href="#" class="hide-it">☒</a>');
	$labels.find('.hide-it').bind('click', function( e ) {
		e.preventDefault();
		e.stopPropagation();

		var $el = $(this);
		var val = $el.next().data('label');
		var $issues = dotjs_github.$issues.find('.list-browser-item .label[data-name="' + $.trim( val ) + '"]').closest('tr');

		if ( ! $el.hasClass('clicked') ) {
			$el.addClass('clicked');
			$issues.addClass('hidden');
		} else {
			$el.removeClass('clicked');
			$issues.removeClass('hidden');
		}//end else

		var count = $('.issues-list').find('.list-browser-item:not(.hidden)').length;
		console.log( count );

		var $selected = $('.list-browser-filter-tabs .selected');
		$selected.html( parseInt( count, 10 ) + ' ' + $selected.data('filter') + ' issues' );
	});
};

dotjs_github.init();
