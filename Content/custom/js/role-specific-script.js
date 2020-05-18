function addUserClass(){
	$("body").addClass($("#globalSearch [data-bind='text:profileUserType']").text().replace(" ", ""));
}
$(document).ready(function(){
	$("body").bind("DOMSubtreeModified", function() {
		addUserClass();
	});
});