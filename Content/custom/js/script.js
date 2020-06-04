/// CODE STRUCTURE ///
// 1: CONSTANTS
// 2. FUNCTIONS
// 3. MUTATION OBSERVERS
// 4. EVENT HANDLERS (Initial load)
// 5. EVENT HANDLERS (User-driven events)
/// END CODE STRUCTURE ///




/// CONSTANTS ///

// Options for the observers (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// END CONSTANTS //

/// FUNCTIONS ///
function addObserverIfDesiredNodeAvailable(desiredNode, observerName) {
	if(!desiredNode) {
		//The node we need does not exist yet.
		//Wait 500ms and try again
		window.setTimeout(addObserverIfDesiredNodeAvailable,500);
		return;
	}
	observerName.observe(desiredNode, config);
}

function logAnyErrorToConsole() {
	//console.log("$('#HPRecordsManagerError').length = " + $('#HPRecordsManagerError').length)
	if(!$('#HPRecordsManagerError').length) {
		//The node we need does not exist yet.
		//Wait 500ms and try again
		window.setTimeout(logAnyErrorToConsole,500);
		return;
	}
	console.log("There is an error.  Its name is Fred.");
}

// This function takes the content of the RM4ED Universal Search box and populated the hidden global-search-input box
function updateGlobalSearchInput(){
	var str = $("#rm4ed-global-search-input").val();
	if(str == ""){
		$("#global-search-input").val(strSearchQuery);	
	}
	
	var strSearchQuery = 'content:"'+str+'" Or anyWord:'+str;
	$("#global-search-input").val(strSearchQuery);

	// Simulate a keydown event in the global-search-input box.  This tricks knockoutjs into updating the view model.
	var e = jQuery.Event("keydown");
	e.which = 50; // # Some key code value
	e.keyCode = 50
	$("#global-search-input").trigger(e);
}
/// END FUNCTIONS ///


/// MUTATION OBSERVERS ///
// Mutation Observer for #bodyContent //
// Callback function to execute when mutations to #bodyContent are observed
const bodyContentObserverCallback = function(mutationsList, bodyContentObserver) {

	for(var i=0; i<mutationsList.length; i++) {
		var mutation = mutationsList[i];
		if (mutation.type === 'childList') {

			// Create GilbyIM footer panel //
			if($("div[id*='MainPanel']").length){
				if(!$("#gilbyim-bottom-panel").length){
					$("div[id*='MainPanel']").append("<div id='gilbyim-bottom-panel'><div id='gilbyim-bottom-panel-left'><img src='Content/custom/images/micro-focus-gold-partner.png'></div><div id='gilbyim-bottom-panel-center'><p>&copy; Records Transformation Ltd (2020)</p></div><div id='gilbyim-bottom-panel-right'><img src='Content/custom/images/cyber-essentials-badge.png'></div></div>");		
				}
			}

			// Fade out Splash Screen and Loader.
			if($('.as-spa-dash-main').length){
				$("#custom-loader").fadeOut(1500);
				$("#splash-screen").fadeOut(3000);
			}

			// Rename Save Search button.
			if($("button[title='Save']").length){
				if($("#show-saved-searches>span").html()=="Save"){
					$("#show-saved-searches").attr("title", "Save Search");
					$("#show-saved-searches>span").html("Save Search");	
					$("#show-saved-searches>span").attr("title", "Save Search");
					$("#show-saved-searches>span").attr("aria-label", "Save Search");
				}
			}

			// Creat custom "NEW RECORD" button.
			if(!$("#custom-new-record-button").length){
				$(".Searchbar-logo-toggle").append('<div id="custom-new-record-button" class="custom-new-record-button navbar-text"><a><img style="margin-left:-22px; padding:5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAT0lEQVQ4y+2RSw4AMAQFadz/yrqSCNX0se3sNIxPiYawD1RVnwuZOQluRHkSVN0tMebY+0K6e5mx0BWiRJCDnZDu8eAVKr6gKfA/MZ5gzAYUNRwmN05++wAAAABJRU5ErkJggg=="><span tabindex="0" title="New Record" style="font-weight:bold" aria-label="New Record">NEW RECORD</span></a></div>');
			}

			// Hide the object_selector button and replace with phantom div.
			if(!$("#rm4ed-phantom-object-selector").length){
				$("button.object_selector").css("display", "none");
				$("button.object_selector").after("<div id='rm4ed-phantom-object-selector' style='width: 96px; height: 32px; padding-left: 10px; padding-right: 10px;'></div>");
			}

			// If the search context has changed, set the object_selector back to "Record".
			if($("button.object_selector").length){
				if($("button.object_selector").prop("title")!="Record"){
					$("button.object_selector").parent().find("a[title='Record']").trigger("click");
				}
			}

			// Hide unwanted items from the option_selector.
			if(!$("#searchBuilder").css("display")=="none"){
				$("#searchBuilder").css("display", "none");
				$("a[title='Filter']").parent().css("display", "none"); // this is different because there is a duplicate id.
				$("#options").css("display", "none");
			}

			// Create the rm4ed universal search input box and  hide the standard Web Client search query box.
			if(!$("#rm4ed-global-search-input").length){
				$("#global-search-input").after('<input title="Enter Search Query >" class="clearable x" id="rm4ed-global-search-input" aria-label="< Enter Search Query >" type="search" placeholder="Enter your search" autocomplete="off">');
				$("#global-search-input").css("display", "none");
			}


			// Update the global standard search box with the contents of the rm4ed univeral search
			// This is required because otherwise users may click on the search button and resurn results that do not reflect what was in the search box
			// THIS CODE IS NOT PARTICULARLY PERFORMANT.  POTENTIALLY I COULD SET UP A LOWER LEVEL MUTATION OBSERVER.
			if($(".HPRM-search-list-header").length){
					updateGlobalSearchInput();	
					var str = $(".HPRM-search-list-header>span").html()
					if((str == "Query: 'favorite'") || (str == "Saved Searches - public") || (str == "Query: 'owner:[default:Me]'") || (str == "Query: 'myDocuments'"))
						{
				//		$(".HPRM-search-list-header>span").addClass("globalSearchInputUpdated");
				//		if($(".HPRM-search-list-header>span.globalSearchInputUpdated").length){
				//			updateGlobalSearchInput();										
				//		}
					}
				}

			// Style error messages.
			if($(".field-error-display").length){
				$(".field-error-display").css("color", "#33cccc !important");
				}
			// Style record properties link.
			if($(".btn-properties").length){
				$(".btn-properties").css("color", "#33cccc");
			}
			
			// Control when the "Save Search" button is visible
			if($(".command-panel-header-title").length){
				
				console.log("The command panel is displayed")
				// Hide the "Save Search" button when in the "Saved Searches" context.
				
				if($(".command-panel-header-title")[0].innerHTML == "Saved Searches"){
					$("#show-saved-searches").css("display", "none");
				}


				
				if($(".command-panel-header-title")[0].innerHTML == "Records"){

					// If a menu item is selected
					if($(".HPRM-Record-Action-Item-Selected").length>0){

						$("#show-saved-searches").css("display", "none");

					}
					else{
						console.log($("#global-search-input").val())
					//	if($("#global-search-input").val() != 'content:"" Or anyWord:'){
						
							$("#show-saved-searches").css("display", "inline");
							
					//	   }
						
						
					}
					

					console.log($(".HPRM-Record-Action-Item-Selected").length)
			//		if(!$(".HPRM-Record-Action-Item-Selected").length){
				//		$("#show-saved-searches").css("display", "inline");
				//	}
				}
			}
			else{
				$("#show-saved-searches").css("display", "none");
			}
			

		}
		else if (mutation.type === 'attributes') {
		//	console.log('The ' + mutation.attributeName + ' attribute was modified.');
		}
	}

};

// Create an observer instance linked to the callback function
const bodyContentObserver = new MutationObserver(bodyContentObserverCallback);
// Start observing the target node for configured mutations
addObserverIfDesiredNodeAvailable(document.getElementById('bodyContent'), bodyContentObserver);

//bodyContentObserver.disconnect();

// END Mutation Observer for #bodyContent //


// Mutation Observer for #hprmDynamicModal //
// Callback function to execute when mutations are observed
const hprmDynamicModalObserverCallback = function(mutationsList, hprmDynamicModalObserver) {
	for(var i=0; i<mutationsList.length; i++) {
		var mutation = mutationsList[i];
		if (mutation.type === 'childList') {
			//console.log('A child node has been added or removed.');

			// hide "Filter" tab from search form.
			if($("a[href='#formSearchFilter']").length){
				$("a[href='#formSearchFilter']").parent().css("display", "none");
			}

			// placeholder for customising the saved search form
			if($("div[id*='overlay_SavedSearchForm']").length){
				//$("div[id*='overlay_SavedSearchForm']").find("input[type='checkbox']").css("background-color", "lime");
			}
		}
		else if (mutation.type === 'attributes') {
			//console.log('The ' + mutation.attributeName + ' attribute was modified.');
		}
	}
};

// Create an observer instance linked to the callback function
const hprmDynamicModalObserver = new MutationObserver(hprmDynamicModalObserverCallback);
// Start observing the target node for configured mutations
addObserverIfDesiredNodeAvailable(document.getElementById('hprm-dynamic-modal'), hprmDynamicModalObserver);

// END Mutation Observer for #hprmDynamicModal //
/// MUTATION OBSERVERS ///

/// EVENT HANDLERS FOR INITIAL LOAD ///
$(document).ready(function(){
	
	logAnyErrorToConsole;

	// add splsh screen
	$("body").prepend("<div id='splash-screen'><div id='custom-loader' class='loader'></div></div>");
	
	// add custom stylesheets AFTER the in-built custom.css
	$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='Content/custom/css/custom.css' type='text/css' media='screen'>");
	$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='Content/custom/css/role-specific-styles.css' type='text/css' media='screen'>");
	
	// Add custom-header.html
	jQuery.get(window.location.pathname+"Content/custom/html/custom-header.html").then(function(text, status, xhr){
		$("#splash-screen").after(text);

		}).then(function(){
				// we really only need to do this once - consider rewriting
	//			var headHeight = $("#custom-header").outerHeight(true); //this is the height of the header
	//			var menuHeight = 56; //this is set by other CSS - it doesn't change
	//			var topHeight = headHeight + menuHeight + 1; //they currently move it by 57, so 56+1, so we add 1 here
	//			$("head").append("<style>#BodyPanel_10 {top:"+topHeight+"px;} .as-spa-header {top:"+headHeight+"px;}div.as-spa-dash-main-secondary{height:auto;}"); 
			})
	
		// Add footer
		$("#bodyContent").css("height", "95%");
		jQuery.get(window.location.pathname+"Content/custom/html/custom-footer.html").then(function(text, status, xhr){
			$("#bodyContent").after(text);
		})
	});
/// END EVENT HANDLERS FOR INITIAL LOAD ///


/// EVENT HANDLERS FOR USER-DRIVEN EVENTS ///
$(document).ready(function(){

	// "click" event for logo (got to home)
	$(document).on('click', ".navbar-logofix", function (){
		//updateGlobalSearchInput();
		console.log("Clickety-click")
		$("#show-saved-searches").css("display", "none");
		$("div.tabbable").find("a[title='Home']").trigger("click");

	})


	// "click" event for Advanced Search button - Open Search
	$(document).on('click', "#rm4ed-advanced-search", function (){
		$("a[title='Record']").trigger("click");
		//$('#SearchForm_1 > a')[0].click();
		$('#DefaultSearchForm > a')[0].click();
	})

	// "click" event for New Record button
	$(document).on('click', "#custom-new-record-button", function (){
		$("a[title='New Record']").trigger("click");
	})

	// Populate the #global-search-input from the custom rm4ed search box
	$(document).on('change', "#rm4ed-global-search-input", function (){
		if(!$("#rm4ed-global-search-input").val().length){
			//	alert("The input box is empty.");
				$("#global-search-input").val("");
			//	alert($("#rm4ed-global-search-input").val());
			}
		updateGlobalSearchInput()

	});

	// Submit a search when user presses the enter key inside the search box
	$(document).on("keyup", "#rm4ed-global-search-input", function(e){
		$("#rm4ed-global-search-input").trigger("change");	
		updateGlobalSearchInput();
		if(e.which == 13){
			var x = $("#rm4ed-global-search-input").val().length;
			if(x>0){
				$( ".global-search-btn" ).trigger( "click" );
			}
		}

	// THIS STILL DOESN'T WORK AS INTENDED
	// The issue is that there is a second event hndler (in knoutjs that will proceed with the click.  The answer would be to enclose the button in a new div by amending GlobalSearchPanel.tmpl.html
	// We could then use this kind of idea to trap the venet at the div level.  https://www.bennadel.com/blog/1751-jquery-live-method-and-event-bubbling.htm
	// this handles the scenarion where the user has added search information and subsequently deleted it from the search box.

	  //$(".global-search-btn").click(function(e){
		//alert('clicked!');
		//if($("#global-search-input").val()=='content:"" Or anyWord:'){
			//alert('Query is crud, do not search.');
		//	$("#global-search-input").val(null);
		//	alert($("#global-search-input").val());
		//	e.preventDefault();
		//	e.stopPropagation();
		//	}
	  //});

		//#rm4ed-intercept-global-search-button-click-narrow
	$(document).on('click', "#rm4ed-intercept-global-search-button-click-narrow", function (e){
		$("#rm4ed-global-search-input").trigger("change");

		console.log("THe search button has been clicked.")
		//alert($("#global-search-input").val());
		//if($("#global-search-input").val()=='content:"" Or anyWord:'){
		//alert('Query is crud, do not search.');
		//$("#global-search-input").val(null);
		//alert("Clickety-click-click");
		//}
		});
		
	$(document).on('mousedown', ".global-search-btn", function (e){

		$("#global-search-input").val("");

		});
	});
});
/// END EVENT HANDLERS FOR USER-DRIVEN EVENTS ///