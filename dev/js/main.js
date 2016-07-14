'use strict';

(function() {
	$(document).on('ready', function() {
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
			"matcha",
			"dismantling the patriarchy",
			"challenging heteronormativity"
		];

		var workPokemon = {
			'tech': [
				{
					"title": "Dropbox",
					"hp": 90
				},
				{
					"title": "Qulture Collective",
					"hp": 70
				},
				{
					"title": "ZURB - Foundation",
					"hp": 60
				},
				{
					"title": "Rainbow Ipsum",
					"hp": 40
				},
				{
					"title": "CBITS @ Northwestern University",
					"hp": 30
				},
				{
					"title": "Razorfish",
					"hp": 30
				}
			],
			'talk': [
				{
					"title": "Beyond the Code",
					"hp": 90
				},
				{
					"title": "AlterConf",
					"hp": 30
				},
				{
					"title": "Lesbians Who Tech - Summit",
					"hp": 60
				},
				{
					"title": "Waffle JS",
					"hp": 40
				},
				{
					"title": "Dropbox",
					"hp": 30
				},
				{
					"title": "DreamForce",
					"hp": 30
				}
			],
			'model': [
				{
					"title": "St. Harridan",
					"hp": 80
				},
				{
					"title": "Miki Vargas",
					"hp": 90
				},
				{
					"title": "THÚY Custom Clothier",
					"hp": 40
				},
				{
					"title": "STUZO",
					"hp": 40
				},
				{
					"title": "QWEAR Fashion",
					"hp": 30
				},
				{
					"title": "Sharpe Suiting",
					"hp": 30
				}
			]
		}

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
			var baseStr = "© " + new Date().getFullYear() + " | Turning " + favoriteThings[0] + " and " + favoriteThings[1] + " into code.";

			$(targetEl).html(baseStr);
		}($('#copyright'));

		// do nav bar stuff
		var toggleCurrentClass = function(li) {
			var targetDot = $(li).find('.nav__dot');
			var targetAnchor = $(li).find('.nav__anchor');
			$('.nav__dot').removeClass('nav__dot--current');
			$('.nav__anchor').removeClass('nav__anchor--current');
			$('.nav__list-item').find('a').blur();
			$(targetDot).addClass('nav__dot--current');
			$(targetAnchor).addClass('nav__anchor--current');
		};

		var animateScrolled = function() {
			var windowPos = $(window).scrollTop(),
				heroHeight = $('.hero').height() - 100,
				$heroText   = $('.hero__content'),
				$navBar		 = $('nav');

			if (windowPos > heroHeight) {
				$navBar.addClass('nav--even');
			}
			else {
				$navBar.removeClass('nav--even');
			}

			for (var i = 0; i < offsets.length; i++) {
				if (windowPos > offsets[i] && windowPos < offsets[i+1]) {
					toggleCurrentClass($('.nav__list-item')[i]);
				}
		       	if (windowPos + $(window).height() === $(document).height()) {
		       		toggleCurrentClass($('.nav__list-item')[offsets.length-2]);
		       	}
			}
			if ($navBar.offset().top > heroHeight * (2/3)) {
				$heroText.fadeOut();
			}
			else {
				$heroText.fadeIn();
			}
		}

		$('.work__filter').on('click', function() {
			var filterKey = $(this).data('poke-filter');
			$.each(workPokemon[filterKey], function(idx, el) {
				var targetTitle = $('.work__pokemon .work__title')[idx];
				var targetHP = $('.work__pokemon .work__hp-fill')[idx];
				$(targetTitle).text(el.title);
				$(targetHP).css('width', el.hp + '%');

				if (el.hp < 70 && el.hp >= 40) {
					// yellow
					$(targetHP).css('background-color', '#fcca00');
				}
				else if (el.hp < 40) {
					// red
					$(targetHP).css('background-color', '#e82110');
				}
				else {
					// green
					$(targetHP).css('background-color', '#48ac68');
				}
			})
		})
		// navbar scroll animation
		$(window).on('load scroll', function() {
			animateScrolled();
		});

		var offsets = [];
		$(window).on('resize load', function() {
			offsets = [];

			$('.section__title').each(function() {
				offsets.push($(this).offset().top - $('nav').height() * 2);
			});

			$('.nav__list-item').on('click', function(e) {
				e.preventDefault();
				var href = $(this).find('a').attr('href');
			    $('html, body')
			    	.animate({
			       scrollTop: $(href).offset().top - $('nav').height()
			    	}, 500);

			    return false;
			});

			offsets.push($(document).height());
		});

		// video and splash screen behavior
		var mobileAgent = false;
		$(window).on('load', function() {
			// don't show video on mobile
			if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				mobileAgent = true;
			}
			if (mobileAgent || $(window).width() < 640) {
				$('video').remove();
			}
			else {
				if ($('video').length || $('video')[0].buffered.length) {
					$('.hero').addClass('hero--loaded')
				}
			}
		});
	});

})();
