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
		'.dotjs-view {' +
		'  font-family: Helvetica, arial, freesans, clean, sans-serif;' +
		'  font-size: 13px;' +
		'  font-weight: normal;' +
		'  margin-left: 10px;' +
		'  margin-right: 0;' +
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
	dotjs_github.submodule_awesome();
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

dotjs_github.submodule_awesome = function() {
	$('#files .file').each( function() {
		var $el       = $(this);
		var $info     = $el.find('.info');
		var $diffstat = $info.find('.diffstat');

		var num_lines = parseInt( $diffstat.text().substr(0,1), 10 );

		if ( 2 != num_lines ) {
			console.log('not enough lines - ' + num_lines );
			return;
		}//end if

		var $change = $el.find('.diff-line-code');
		var change = $change.text();

		if ( ! change.match(/-Subproject/) ) {
			console.log('not a submodule');
			return;
		}//end if

		var submodule = $el.find('.info .js-selectable-text').text().trim();

		var repo_url = 'https://github.com/';

		switch ( submodule ) {
			case 'scriblio':
			case 'scriblio-authority':
			case 'bcms':
			case 'bsocial':
				repo_url += 'misterbisson/';
				break;
			default:
				repo_url += 'GigaOM/';
		}//end switch

		repo_url += submodule;

		var $commits      = $change.find('.x');
		var $prior_commit = $commits.eq(0);
		var $new_commit   = $commits.eq(1);

		var prior_hash = $prior_commit.text();
		var new_hash   = $new_commit.text();

		var diff_url = repo_url + '/compare/' + prior_hash.substr(0,7) + '...' + new_hash.substr(0, 7);

		$info.find('.js-selectable-text').after('<a href="' + diff_url + '" class="dotjs-view minibutton">view diff</a> <a href="' + repo_url + '/commits/master#' + $new_commit.text() + '" class="dotjs-view minibutton">view commit stream</a>');

		$prior_commit.wrap('<a href="' + repo_url + '/commit/' + prior_hash + '"/>');
		$new_commit.wrap('<a href="' + repo_url + '/commit/' + new_hash + '"/>');
	});
};

dotjs_github.init();
