'use strict';

(function() {

	$(document).on('ready', function() {
		$(document).foundation();

		var toggleCurrentClass = function($li) {
			$('.dot-nav li').removeClass('current');
			$($li).addClass('current');
		};

		var offsets = [];

		$('.main-content').each(function() {
			offsets.push($(this).offset().top - $('nav').height() * 2);
		});

		$('.dot-nav li').on('click', function(e) {
			e.preventDefault();
			toggleCurrentClass($(this));

			var href = $(this).find('a').attr('href');
	    $('html, body').animate({
	        scrollTop: $(href).offset().top - $('nav').height() * 2
	    }, 500);

	    return false;
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

			for (var i = 0; i < offsets.length; i++) {
				if ($windowPos > offsets[i] && $windowPos < offsets[i+1]) {
					toggleCurrentClass($('.dot-nav li')[i]);
				}
				if ($windowPos + $(window).height() === $(document).height()) {
       		toggleCurrentClass($('.dot-nav li')[offsets.length-1]);
       	}
			}
		});
	});
	
})();
