'use strict';

(function() {

	$(document).on('ready', function() {
		$(document).foundation();

		$('.dot-nav li').on('click', function(e) {
			e.preventDefault();
			$('.dot-nav li').removeClass('current');
			$(this).addClass('current');
		});

		$(window).on('load scroll', function() {
			var $windowPos = $(this).scrollTop(),
					heroHeight = $('.hero-video').height() - 100,
					$navBar		 = $('nav');

			if ($windowPos > heroHeight) {
				$navBar.addClass('even');
			}
			else {
				$navBar.removeClass('even');
			}
		})
	});
	
})();
