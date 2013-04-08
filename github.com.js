var dotjs_github = {};

dotjs_github.init = function() {
	dotjs_github.$issues = $('.issue-list-group');

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
		'  font-size: 20px;' +
		'  line-height: 20px;' +
		'  left: -45px;' +
		'  position: absolute;' +
		'  top: 0px;' +
		'}' +
		'.filter-list .hide-it.clicked {' +
		'  color: #ccc;' +
		'}' +
		'.filter-list .custom-hidden a:nth-child(2) {' +
		'  text-decoration: line-through;' +
		'  opacity: 0.3;' +
		'}' +
		'.filter-list .hide-it:hover {' +
		'  text-decoration: none;' +
		'}' +
		'.issue-list-group .issue-list-item.hidden {' +
		'  display: none;' +
		'}' +
		'</style>';

	$('body').append( style );

	$('.sidebar .filter-item').live('click.dotjs_github', function( e ) {
		e.preventDefault();
		setTimeout( function() {
			dotjs_github.$issues = $('.issue-list-group');
			dotjs_github.add_hide_links();
		}, 500 );
	});

	dotjs_github.add_hide_links();
};

dotjs_github.add_hide_links = function() {
	var $labels = $('.js-color-label-list');
	$labels.children('li').prepend('<a href="#" class="hide-it minibutton">☠</a>');
	$labels.find('.hide-it').bind('click', function( e ) {
		e.preventDefault();
		e.stopPropagation();

		var $el = $(this);
		var val = $el.next().data('label');
		var $issues = dotjs_github.$issues.find('.issue-list-item .label[data-name="' + $.trim( val ) + '"]').closest('li');

		if ( ! $el.hasClass('clicked') ) {
			$el.addClass('clicked').closest('li').addClass('custom-hidden');
			$issues.addClass('hidden');
		} else {
			$el.removeClass('clicked').closest('li').removeClass('custom-hidden');
			$issues.removeClass('hidden');
		}//end else

		var count = $('.issues-list').find('.list-browser-item:not(.hidden)').length;

		var $selected = $('.list-browser-filter-tabs .selected');
		$selected.html( parseInt( count, 10 ) + ' ' + $selected.data('filter') + ' issues' );
	});
};

dotjs_github.init();
