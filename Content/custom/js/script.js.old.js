
// add custom stylesheets AFTER the in-built custom.css

$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='/ContentManager/Content/custom/css/custom.css' type='text/css' media='screen'>");
$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='/ContentManager/Content/custom/css/role-specific-styles.css' type='text/css' media='screen'>");



// Create div for splash screen.

$(document).ready(function(){
$("body").prepend("<div id='splash-screen'><div id='custom-loader' class='loader'></div></div>");
});



// pre-load custom-header HTML
var customHeaderString;
jQuery.get(window.location.pathname+"/Content/custom/html/custom-header.html").then(function(text, status, xhr){
	$(document).ready(function(){
		customHeaderString=text;
	});
})

// pre-load custom-footer HTML
var customFooterString;
jQuery.get(window.location.pathname+"/Content/custom/html/custom-footer.html").then(function(text, status, xhr){
	$(document).ready(function(){
		customFooterString=text;
	});
})


//$(document).ready(function(){
	$("body").on("DOMSubtreeModified", function() {
		var currentlyAddingHeader;
		if(currentlyAddingHeader!=false){	// prevents multiple instances of this code running at the same time
			currentlyAddingHeader=true;
			if (!$("#custom-header").length) {
				$("#splash-screen").after(customHeaderString);
				headerReady = true;
			}
		currentlyAddingHeader=false;
		}

		///We now need to move everything around by the height of the header.
		$("#custom-header").ready(function(){
			var headHeight = $("#custom-header").outerHeight(true); //this is the height of the header
			var menuHeight = 56; //this is set by other CSS - it doesn't change
			var topHeight = headHeight + menuHeight + 1; //they currently move it by 57, so 56+1, so we add 1 here
			$("head").append("<style>#BodyPanel_12 {top:"+topHeight+"px;} .as-spa-header {top:"+headHeight+"px;}div.as-spa-dash-main-secondary{height:auto;}"); 
			//above adds the style ready for the page to finish loading - it also removes the height 100% from the wide screen version of the secondaries, so the footer is visible.
		});
		
		var currentlyAddingFooter;
		if(currentlyAddingFooter!=false){	// prevents multiple instances of this code running at the same time
			currentlyAddingFooter=true;
			if (!$("#custom-footer").length) {
				$("#bodyContent").after(customFooterString);  
			}
			currentlyAddingFooter=false;
		}
		
		// Ressize bodyContent to enable #custom-footer to be visible
		//$("#bodyContent").css("height", "65%");
		//$("#DashboardPanel_23").css("height", "auto");
	
		
		if(document.getElementById("globalSearchPanel") !== null){
			$("#custom-loader").fadeOut(3000);
			$("#splash-screen").fadeOut(5000);
		}
		
		// remove footer when dashboard panel is not present
		if(document.getElementById("MainObjectPanel_118") !== null){
			$("#custom-footer").css("display", "none");
		}
		
		
	});

//});





// override !important on inline styles.  Because only a wanker would put an !important on an inline style.


// Remove unwanted left border for option_selector button.
$(document).ready(function(){
	$("body").on("DOMSubtreeModified", function() {
		$(".option_selector").css("border-left", "none");
		$(".option_selector").css("top", "-1px");
	});

});

$(document).ready(function(){
		$("#BodyPanel_12").children(":first").css("background-color", "green");
});

