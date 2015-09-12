import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import {windowWidth} from 'interactions'; 

export default function menuToggle () {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.bind('click', function (e) {
				if (!$('#menu').hasClass('toggled')) {
					$('#content').addClass('menued');
					element.addClass('toggled');
					element.find('.fa-bars').removeClass('fa-bars').addClass('fa-times');
					$('#menu').addClass('toggled');
					if (windowWidth()) {
						$('#create-list').focus();
					}
				} else {
					$('#content').removeClass('menued');
					element.removeClass('toggled');
					element.find('.fa-times').removeClass('fa-times').addClass('fa-bars');
					$('#menu').removeClass('toggled');
					if (windowWidth()) {
						$('#create-todo').focus();
					}
				}
			});
		}
	}
}