/* ========================================================================
 * Non-Bootstrap sitewide JS.
 * ======================================================================== */

$(function() {
	
	/* OLD & DEPRECATED -- Translation button JS to toggle between English and Spanish */
	/*
	$('.translate-btn').click(function() {
		$( "span.en" ).toggleClass( "active" );
		$( "span.es" ).toggleClass( "active" );
		if ( $( "body" ).hasClass( "en" ) ) {
			$( "body" ).removeClass( "en" ).addClass( "es" );
		}
		else if ( $( "body" ).hasClass( "es" ) ) {
			$( "body" ).removeClass( "es" ).addClass( "en" );
		}
	});
	*/
	
	// Translation button JS to toggle between English and Spanish
	const toggle = document.getElementById('translate-btn');
	const html = document.documentElement;
	
	// Load saved language
	let savedLang = localStorage.getItem('site-lang') || 'en';
	
	html.setAttribute('data-lang', savedLang);
	html.setAttribute('lang', savedLang);
	
	if (savedLang === 'es') {
	  toggle.checked = true;
	}
	
	let currentLang = savedLang;
	
	toggle.addEventListener('change', (e) => {

  const animatedBlocks = document.querySelectorAll('.lang-animated');
	
	  animatedBlocks.forEach(block => {
		block.classList.add('fade-out');
	  });
	
	  setTimeout(() => {
		  currentLang = currentLang === 'en' ? 'es' : 'en';
		  
		  html.setAttribute('data-lang', currentLang);
		  html.setAttribute('lang', currentLang);
		  
		  localStorage.setItem('site-lang', currentLang);
		
		  animatedBlocks.forEach(block => {
			block.classList.remove('fade-out');
			block.classList.add('fade-in');
		  });
		
		  setTimeout(() => {
			animatedBlocks.forEach(block => {
			  block.classList.remove('fade-in');
			});
		  }, 180);
		
		}, 120);
	
	  });
	
	
	// Motion design styles to dynamically fade-in/animate blocks of content as you scroll down the page
	const revealElements = document.querySelectorAll('.reveal-item');

	const observer = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('is-visible');
		  observer.unobserve(entry.target); // animate once only
		}
	  });
	}, {
	  threshold: 0.15
	});
	
	revealElements.forEach(el => {
	  observer.observe(el);
	});
	
	
	/* Sets active links in nav based on which page you're on */
	//Home/Work Page
	if (window.location.href.indexOf("index") > -1) {
    	$('li.work').addClass('selected');
	}
	//About Page
	if (window.location.href.indexOf("about") > -1) {
    	$('li.about').addClass('selected');
    	$('li.work').removeClass('selected');
	}
	
	/* Link to portfolio on homepage links to English or Spanish page depending on language selected */
	var portfolioLinkLang = function(){
		if ( $( "body#homepage" ).hasClass( "es" ) ) {
			$("body#homepage .featured-work .button a.es").insertBefore("body#homepage .featured-work .button a.en");
		}
		if ( $( "body#homepage" ).hasClass( "en" ) ) {
			$("body#homepage .featured-work .button a.en").insertBefore("body#homepage .featured-work .button a.es");
		}
	};
	
	portfolioLinkLang();
	
	$('.translate-btn').click(function() {
        portfolioLinkLang();
    });
	
	
	/* White gradient appears below hamburger and translate button on scroll on mobile */
/*	var overlayNavBG = function(){
		var scrollTop = $(window).scrollTop();
		var mastheadBottom = $('#masthead .container').offset().top + $('#masthead .container').outerHeight(true);
		
		// If statements for overlay gradient bg
		if (scrollTop > mastheadBottom) { 
        	$('.overlay-bg').addClass('visible');
    	}
    	if (scrollTop < mastheadBottom) {
        	$('.overlay-bg').removeClass('visible'); 
    	}
    };
     
    overlayNavBG();
     
    $(window).scroll(function() {
        overlayNavBG();
    });
    */
	
	/* Toggle's menu on mobile */
	$('.hamburger').click(function() {
		$( ".mobile-nav" ).addClass( "active" );
	});
	
	$('.close-btn').click(function() {
		$( ".mobile-nav" ).addClass( "transition-different" );
		$( ".mobile-nav" ).removeClass( "active" );
		
		$( ".menu-links" ).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
    	function(e) {
    		$( ".mobile-nav" ).removeClass( "transition-different" );
  		});
	});
	
	
	/* Scrolls page to contact info from contact link */
	$('li.contact').click(function() {
		$( ".mobile-nav" ).addClass( "transition-different" );
		$( ".mobile-nav" ).removeClass( "active" );
		
		$( ".menu-links" ).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
    	function(e) {
    		$( ".mobile-nav" ).removeClass( "transition-different" );
  		});
	});
	
	
	/* Makes the page scroll a smooth transition */
	$('a[href^="#footer"]').on('click',function (e) {
	  	e.preventDefault();

    	var target = this.hash;
    	var $target = $(target);

    	$('html, body').stop().animate({
    	    'scrollTop': $target.offset().top
    	}, 1500, 'swing', function () {
    	    window.location.hash = target;
    	});
	});
	
	

	
	
	/* Toggles active class on gallery slider navigation */
/*    $(".slide-controls").on('click','a', function(){
        $(this).toggleClass('active').siblings().removeClass('active');
    })
*/
	
	/* Opens portfolio details on clicking details buttons */
	var projectImageMain = $('.featured-work .image a');
	$(projectImageMain).click(function() {
		$(this).parents(".image").siblings( ".project-info-container" ).removeClass( "closed" );
		$(this).parents(".image").siblings( ".button.details" ).addClass( "display-none" );
	});
	
	$('.button.details').click(function() {
		$(this).siblings( ".project-info-container" ).removeClass( "closed" );
		$(this).closest( ".button.details" ).addClass( "display-none" );
	});
	
	
	/* Closes portfolio details on clicking close buttons */
	$('.button.close-btn').click(function() {
		$(this).closest( ".project-info-container" ).addClass( "closed" );
		$(this).closest( ".project-info-container" ).siblings( ".button.details" ).removeClass( "display-none" );
	});
});