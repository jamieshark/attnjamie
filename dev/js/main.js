'use strict';

(function() {

	$(document).on('ready', function() {

		// initialize foundation
		$(document).foundation();

		// copyright content
		var favoriteThings = [
			"cold brew coffee",
			"Cowgirl Creamery cheese",
			"strawberries",
			"Blue Bottle coffee",
			"Choco Tacos",
			"grilled pork belly",
			"coconut water",
			"peanut butter",
			"green tea ice cream",
			"empanadas",
			"tacos <i>al pastor</i>",
			"burrata",
			"waffle fries",
			"stouts",
			"porters",
			"grapefruit juice",
			"matcha"
		];

		// do the Knuth shuffle
		function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex ;
		  while (0 !== currentIndex) {
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		}
		var insertCopyright = function(targetEl) {
			shuffle(favoriteThings);
			var baseStr = "© " + new Date().getFullYear() + " | Powered mainly by " + favoriteThings[0] + " and " + favoriteThings[1] + ".";

			$(targetEl).html(baseStr);
		}($('#copyright'));
		// do nav bar stuff

		var toggleCurrentClass = function($li) {
			$('.dot-nav li').removeClass('current');
			$('.dot-nav li').find('a').blur();
			$($li).addClass('current');
		};

		var offsets = [];

		// TODO: Some bugs with the middle section not firing current class
		$('.content__section').each(function() {
			offsets.push($(this).offset().top - $('nav').height() * 2);
		});

		$('.dot-nav li').on('click', function(e) {
			e.preventDefault();
			var href = $(this).find('a').attr('href');
	    $('html, body')
	    	.animate({
	       scrollTop: $(href).offset().top - $('nav').height()
	    	}, 500);

	    return false;
		});

		$(window).on('load scroll', function() {
			var windowPos = $(this).scrollTop(),
				heroHeight = $('.hero-video').height() - 100,
				$heroText   = $('.intro.row'),
				$navBar		 = $('nav');

			if (windowPos > heroHeight) {
				$navBar.addClass('nav--even');
			}
			else {
				$navBar.removeClass('nav--even');
			}

			for (var i = 0; i < offsets.length; i++) {
				if (windowPos > offsets[i] && windowPos < offsets[i+1]) {
					toggleCurrentClass($('.dot-nav li')[i]);
				}
				if (windowPos + $(window).height() === $(document).height()) {
		       		toggleCurrentClass($('.dot-nav li')[offsets.length-1]);
		       	}
			}

			// mobile stuff
			if ($(window).width() < 640) {
				if ($navBar.offset().top > $heroText.offset().top - $navBar.height()*2) {
					$heroText.fadeOut();
				}
				if (windowPos === 0) {
					$heroText.fadeIn();
				}
			}
		});
	});

})();
