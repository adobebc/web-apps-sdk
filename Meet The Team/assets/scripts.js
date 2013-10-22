// "Meet The Team" Web App Scripts

$(function() {

	// Loop through each social item
	$('.team-social ul li').each(function() {

		// If there is no social link, hide the icon
		if ($(this).find('a').attr('href') == '') {
			$(this).hide();
		}

	});

});