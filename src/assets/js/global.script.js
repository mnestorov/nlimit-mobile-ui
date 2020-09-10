import $ from "jquery";
require('select2');

"use strict";

$(document).ready(function(){
	$('.navi-menu-button').on('click', function(e){
		navMenuOpen();
	});
	$('.nav-menu').on('click', function(e){
		if ($(e.target).hasClass('nav-menu')){
			navMenuClose();
		}
	});

	$('nav.menu ul.main-menu>li>a').on('click', function(e){
		var that = $(this);
		if (that.parent().find('ul:first').length) {
			e.preventDefault();
			if (!that.parent().hasClass('active')) {
				$('nav.menu ul.main-menu ul').slideUp('fast',function(){
					$('nav.menu ul.main-menu > li').removeClass('active');
				});
				
				$('nav.menu ul li a span').removeClass('fa-angle-up').addClass('fa-angle-down');

				
				that.parent().find('ul:first').slideDown('fast',function(){
					that.parent().addClass('active');
				});

				that.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
			} else {
				
				that.parent().find('ul:first').slideUp('fast',function(){
					$(this).parent().removeClass('active');
				});
				that.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
			}
		} else {
			$('nav.menu ul.main-menu ul').slideUp('fast');
			$('nav.menu ul.main-menu > li').removeClass('active');
			that.parent().addClass('active');
		}
	});

	$('.tab-item .fix-width .menu-item').css({'width': 100/$('.tab-item .fix-width .menu-item').length+'%'});
	
	if ($('.wizard').length) {
		wizardFixHeight();
		$(window).resize();
	}
	if ($('.animated-text').length) {
		animateText();
	}
});

$(".wrapper-inline").on("scroll", function(e) {
	if (this.scrollTop > 150) {
		$('header.no-background').addClass("set-bg");
	} else {
		$('header.no-background').removeClass("set-bg");
	}
  
});

var navMenuOpen = function(){
	$('.navi-menu-button').addClass('focused');

	$('div.nav-menu').fadeIn(50,function(e){
		$('nav.menu').addClass('opened');
	});
}

var navMenuClose = function(){
	$('.navi-menu-button').removeClass('focused');
	$('nav.menu').removeClass('opened');
	$('div.nav-menu').fadeOut(200);
}

var wizardFixHeight = function(){
	$(window).on('resize', function(e){
		$('.wizard .wizard-item').height($(window).height()-50);
	});
}



/*sweet checkbox scripts **************/
$('.sweet-check :checkbox:checked').each(function(e,i){
	$(this).parent().addClass('checked');
});

$(document).on('click', '.sweet-check', function(){
	if ($(this).hasClass('checked')) {
		$(this).removeClass('checked');
		$(this).find('input').prop('checked', false);
	} else {
		$(this).addClass('checked');
		$(this).find('input').prop('checked', true);
	}

	//console.log($(this).find('input').prop('checked'));
});

$(document).on('click','[data-loader]', function(){
	$('.sweet-loader').show().addClass('show');
});



/*expandable list scrips **************/
$(document).on('click', '.expandable-item .expandable-header', function(){
	if ($(this).parent().hasClass('accordion')) {
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().find('.expandable-content').attr('style','');
		} else {
			var accordionGroup = $(this).parent().attr('data-group');
			$('[data-group="'+accordionGroup+'"]').removeClass('active');
			$('[data-group="'+accordionGroup+'"]').find('.expandable-content').attr('style','');
			$(this).parent().find('.expandable-content').css({'max-height':$(this).parent().find('.expandable-content')[0].scrollHeight});
			$(this).parent().addClass('active');
		}
	} else {
		if ($(this).parent().hasClass('active'))
			$(this).parent().find('.expandable-content').attr('style','');
		else
			$(this).parent().find('.expandable-content').css({'max-height':$(this).parent().find('.expandable-content')[0].scrollHeight});

		$(this).parent().toggleClass('active');
	}
});

$(document).on('click', '.tab-item .menu-item', function(e){
	e.preventDefault();
	var tabContentId = $(this).attr('data-content');

	$(this).parents('.tab-item').find('.menu-item').removeClass('active');
	$(this).addClass('active');

	$(this).parents('.tab-item').find('.content-item').removeClass('active');
	$('#'+tabContentId).addClass('active');
});



/*post item scripts **************/
$(document).on('click', '.post-item .post-share > i', function(e){
	e.preventDefault();
	$(this).parent().find('.social-links').fadeToggle('fast');
});



/*popup actions ******************/
$(document).on('click', '[data-dismiss="true"]', function(){
	$(this).parents('.popup-overlay').fadeOut('fast');
});

$(document).on('click', '[data-popup]', function(){
	var modalId = $(this).attr('data-popup');
	$('#'+modalId).fadeIn('fast');
});

$(document).on('click', '.popup-overlay', function(e){
	if ($(e.target).hasClass('popup-overlay')) {
		$(this).fadeOut('fast');
	}
});



/*search popup actions ************/
var openSearchPopup = function(){
	$('.search-form').fadeIn('fast');
	$('.search-form input').focus();
}

var closeSearchPopup = function(){
	$('.search-form').fadeOut('fast');
}

$(document).on('click', '[data-search="open"]', function(){
	openSearchPopup();
});

$(document).on('click', '[data-search="close"]', function(){
	closeSearchPopup();
});



/*clear field actions ************/
$(document).ready(function(){
	$.fn.clearField = function(options) {
		// default configuration
		var config = $.extend({}, {
			clearText: 'Field is empty',
			focusAfterClear: true,
			widthChange: 0,
			top: 13,
			right: 10
		}, options);
	
		// main function
		function AttachClearButtonEvent(e) {
			if( !e.val() && (e.parent().hasClass('divclearable'))) {
				_removeClearButton(e);
			} else if( e.val() && !(e.parent().hasClass('divclearable'))) {
				_attachClearButton(e);
			}	
		}
		
		function _attachClearButton(e) {			
			//Change width
			if (config.widthChange) {
				_changeWidth(e, config.widthChange);
			}
				
			//Wrap element
			e.wrap('<div class="divclearable"></div>');
			
			//Calculate top
			var currentTop = (config.top == 'auto') ? ((e.outerHeight() - 16) / 2) : config.top;
			
			//Add clear button			
			var nClearLink = '<i class="fa fa-times-circle txt-dark" title="' + config.clearText + '"></i>';
			e.parent().append(
				$(nClearLink).css('top', currentTop).css('right', config.right).click(function() {
					var field = $(this).prev();
					field.val('').change();
					if (!field.attr("readonly") && !field.attr("disabled") && config.focusAfterClear) {
						field.focus();
					}			
				})
			);

			$('img.ui-datepicker-trigger').each(function(){
				if ( $(this).parent('.divclearable').length > 0 ) {
					$(this).parent('.divclearable').after(this);
				}	
			});
		}
		
		function _changeWidth(e, widthChange) {
			if (_isNumber(widthChange)) {
				var widthNow = parseInt(e.css('width').replace('px', ''));
				e.css('width', widthNow + widthChange);
			}
		}
		
		function _isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
		
		function _removeClearButton(e) {
			//Change width
			if (config.widthChange) {
				_changeWidth(e, -config.widthChange);
			}
			//Un-wrap element
			e.unwrap('.divclearable');
			//Remove clear button
			e.siblings('.clearlink').remove();
		}

		// initialize every element
		this.each(function() {
			var e = $(this)
			e.change(function() {
				AttachClearButtonEvent(e)
			});
			AttachClearButtonEvent(e);
		});

		return this;
	};

	// clear input field utility
	$('.field-clear').clearField(); 
});



/*add select2.js functionality ************/
$(document).ready(function() {
	$('select').select2();
});