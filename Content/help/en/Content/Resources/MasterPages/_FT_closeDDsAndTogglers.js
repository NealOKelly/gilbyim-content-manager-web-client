$(document).ready(function () {

	// For each dropdown...
	$(".dropDownBody").each(function () {

	// If styled for Close link or if on mobile, add the dropDownClose class
	if ( ($(this).hasClass("dropDownBodyCloseLink")) ||
		( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
			$(this).append("<a href='javascript:void(0);' class='dropDownClose'></a>");
		}
	});

	// When Close link clicked, click the dropdown link
	$(".dropDownClose").click(function () {
		$(this).parent().prev(".dropDownHead").children(".dropDownHotspot").click();
	});

	// For each toggler...
	$("[data-mc-target-name]").each(function () {

	// Get the previous sibling
	var togSibling=$(this).prev("p");

	// If the sibling's first child <a> is styled for Close link or if on mobile ...
	if ( togSibling.children(":first").hasClass("togglerCloseLink") ||
		( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {

		// For each toggler target, find the target name (togglerTarget)
		var togglerTarget = $(this).attr("data-mc-target-name");

		// For each toggler target, add a close link (a.togglerClose)
		var closeTarget = $("<a href='javascript:void(0);' class='togglerClose'></a>");
		$(this).append(closeTarget);

		// Create a selector for the toggler link (closeToggler), which is linked to this target.
		// Look for open togglers, which include the togglerTarget name.
		var closeToggler = 'a.toggler[data-mc-state="open"][data-mc-targets*="' + togglerTarget + '"]';

		// When the closeTarget link is clicked, clik the toggler link (closeToggler)
		$(closeTarget).click(function () {
			$(closeToggler).click();
            });
		}
	});

});