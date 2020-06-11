/// CODE STRUCTURE ///
// 1: CONSTANTS
// 2. FUNCTIONS
// 3. MUTATION OBSERVERS
// 4. EVENT HANDLERS (Initial load)
// 5. EVENT HANDLERS (User-driven events)
/// END CODE STRUCTURE ///




/// CONSTANTS & GLOBAL VARIABLES ///

// Options for the observers (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

var browseViaClassificationIsDefaultedToFavorites = false;


// These variables are used to determine the conditions under which the News Panel is loaded/re-loaded.
var newRecordButtonClicked = false;
var favoriteSavedSearchesLinkClicked = false;
var favoriteRecordsLinkClicked = false;
var searchButtonClicked = false;
var homeButtonClicked = false;


// News Panel variables.  These are global because they are called by multiple event handlers.
var gilbyIMNewsPanelHeaderHTML = '<div class="hpebox-title dashboard-container-header"><div class="hpebox-draghandle drag-handle ui-sortable-handle"></div><div class="listPadding listPaddingRight"><span class="h4 capitalize" data-bind="text: headerCaption, click: viewAll">GILBYIM NEWS</span><span><img src="Content/custom/html/img/gilbyim-logo.png"  style="height:25px; float: right;"><span></div></div>'
var gilbyIMNewsPanelStyles ="<style>iframe{margin: 0; padding: 0; border: none; width: 100%; height: auto;}</style>"
var gilbyIMNewsPanelScript = ""
var gilbyIMNewsPanelHTML = gilbyIMNewsPanelHeaderHTML + gilbyIMNewsPanelStyles + "<div id='iframe-container'><iframe id='gilbyim-news-iframe' src='Content/custom/html/news.html'></div>"



// END CONSTANTS & GLOBAL VARIABLES //

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
function updateGlobalSearchInput(value, source){
	
	//var str = $("#rm4ed-global-search-input").val();
	var str = value;
	var strSearchQuery = ""
	
	if(source=="input"){

		if(str == ""){
			$("#global-search-input").val(strSearchQuery);	
		}
		else{
			strSearchQuery = 'content:"'+str+'" Or anyWord:'+str;	
		}
	}
	else{
		strSearchQuery = value;
	}
	$("#global-search-input").val(strSearchQuery);
	$("#global-search-input").change(); // This tricks knockout.js into updating the view model.
}

// Returns the User Type
function getUserType(){
	return $("#globalSearch [data-bind='text:profileUserType']").text()
}

function loadGilbyIMNewsPanel(){
	
	console.log("GilbyIM News Panel loaded...")
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


			// When search results are displayed, write the query string back to the #global-search-input box.  This allow users to save searches conducted using the Advanced Search form.
			if($(".HPRM-search-list-header").length){
				var str = $(".HPRM-search-list-header>span").html().slice(8, $(".HPRM-search-list-header>span").html().length-1)
				updateGlobalSearchInput(str, "other")
				console.log("global-search-input="+ $("#global-search-input").val() )
				}

			// Style error messages.
			if($(".field-error-display").length){
				$(".field-error-display").css("color", "#33cccc !important");
				}
			// Style record properties link.
			if($(".btn-properties").length){
				$(".btn-properties").css("color", "#33cccc");
			}

			
			// Replace third panel with New iFrame.
			if(homeButtonClicked==true){
				if($("div[id^='DashMainPanel_']").length){
					if($("div[id^='DashMainPanel_']").children().eq(2).children().html() != gilbyIMNewsPanelHTML){
						bodyContentObserver.disconnect(); // The iframe causes the mutation observer to go into an infinite loop.  This temporaily disconnect the observer while the frame is loaded.
						$("div[id^='DashMainPanel_']").children().eq(2).children().empty()
						$("div[id^='DashMainPanel_']").children().eq(2).children().append(gilbyIMNewsPanelHTML)
						bodyContentObserver.observe(document.getElementById('bodyContent'), config);

					}
				}	
				homeButtonClicked = false;
			}			

			if(newRecordButtonClicked==false && favoriteRecordsLinkClicked == false && favoriteSavedSearchesLinkClicked == false && searchButtonClicked == false){
				
				// the above line is to prevent this code being fired when except for on initial load.
				if($("div[id^='DashMainPanel_']").length){
					if($("div[id^='DashMainPanel_']").children().eq(2).children().html() != gilbyIMNewsPanelHTML){
						bodyContentObserver.disconnect(); // The iframe causes the mutation observer to go into an infinite loop.  This temporaily disconnect the observer while the frame is loaded.
						$("div[id^='DashMainPanel_']").children().eq(2).children().empty()
						$("div[id^='DashMainPanel_']").children().eq(2).children().append(gilbyIMNewsPanelHTML)
						bodyContentObserver.observe(document.getElementById('bodyContent'), config);

					}
				}				
			}

			
			// Control when the "Save Search" button is visible
			if($(".command-panel-header-title").length){

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
						$("#show-saved-searches").css("display", "inline");
					}

				}
			}
			else{
				$("#show-saved-searches").css("display", "none");
			}
		
		// Automatically select Favorites when viewing Browse via Classification
		if($(".command-panel").length){ // IE11 version	
				if(browseViaClassificationIsDefaultedToFavorites==false){
					if($("button[data-bind='click:selectFavorite, text: HP.HPTRIM.Messages.web_favorites, attr:{class: favoriteButtonClass}']").length){
						
						// This setTimout is ineligant.  It is required because the otherwise the click event fires before Web Client has finished buiding the DOM for "ALL".
						setTimeout(function(){
							$("button[data-bind='click:selectFavorite, text: HP.HPTRIM.Messages.web_favorites, attr:{class: favoriteButtonClass}']").trigger("click"); 
							}, 400);
						
						browseViaClassificationIsDefaultedToFavorites=true;
					}
				}
			}

			if(getUserType() != "Administrator"){
				
				// In New Record context, hide Record Type that include "folder" within the title.
				if($("div[id^='item-picker-container-spa-item-picker']").length){

					$("div[id^='spa-item-picker']>div>div>ul>li:not('.loadMore')").each( function( i, el ) {
					var elem = $( el );
					var str = elem.find('.itempicker-text').html().toLowerCase();

					if(str.includes("folder")){

						elem.css("display", "none");
					}
				});

				}
				
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

			// Customising the New Saved Search form
			if($("div[id^='overlay_SavedSearchForm']").length){
				
				// Hide Query field
				$("div[id^='overlay_SavedSearchForm']").children().eq(1).children().eq(0).css("display", "none")
				
				// Remove the suggested description
				$("#searchDescriptionInputLabel").val("")
				$("#searchDescriptionInputLabel").change(); //This update the kockout.js view model
								
				// Hide Filter and Sort fields
				$("div[id^='overlay_SavedSearchForm']").children().eq(1).children().eq(2).css("display", "none")
				
				// Default the Add to Favorites checkbox to checked.
				if($("div[id*='overlay_SavedSearchForm']").find("input[type='checkbox']").prop("checked")==false){
					$("div[id*='overlay_SavedSearchForm']").find("input[type='checkbox']").trigger("click");	
				}
			}
			
			
			if(getUserType() != "Administrator"){
				// Remove dashboard and locale options if the user is not an Administrator
				var managedByAdministratorsHTML = "<div>These settings are managed by the GilbyIM Administrators.</div>"


				if($("#dashboardConfigTab").length){
					if($("#dashboardConfigTab").html() != managedByAdministratorsHTML){

					$("#dashboardConfigTab").empty()
					$("#dashboardConfigTab").append(managedByAdministratorsHTML)					

					}
				}

				if($("#localeTab").length){
					if($("#localeTab").html() != "<div> &nbsp;</div>" + managedByAdministratorsHTML){

					$("#localeTab").empty()
					$("#localeTab").append("<div> &nbsp;</div>" + managedByAdministratorsHTML)					

					}
				}

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

		if($("div[id^='DashMainPanel_']").length){
			if($("div[id^='DashMainPanel_']").children().eq(2).children().html() != gilbyIMNewsPanelHTML){
				bodyContentObserver.disconnect(); // The iframe causes the mutation observer to go into an infinite loop.  This temporaily disconnect the observer while the frame is loaded.
				$("div[id^='DashMainPanel_']").children().eq(2).children().empty()
				$("div[id^='DashMainPanel_']").children().eq(2).children().append(gilbyIMNewsPanelHTML)
				bodyContentObserver.observe(document.getElementById('bodyContent'), config);

			}
		}
		// Hide Save Search button
		$("#show-saved-searches").css("display", "none");
		homeButtonClicked = true;
		$("div.tabbable").find("a[title='Home']").trigger("click");
		
	})

	
	// click event for Favorite Records link
	$(document).on('click', ".as-spa-dash-main-secondary>div>div>div>span:contains(Favorite records)", function (){
		favoriteRecordsLinkClicked = true;
	})
	
	// click event for Favorite Save Searches link
	$(document).on('click', ".as-spa-dash-main-secondary>div>div>div>span:contains(Favorite saved searches)", function (){
		favoriteSavedSearchesLinkClicked = true;
		})
	
	
	$(document).on('click', ".global-search-btn", function (){
		searchButtonClicked = true;
	   })
	
	
	// "click" event for New Record button
	$(document).on('click', "#custom-new-record-button", function (){
		newRecordButtonClicked = true;
		$("a[title='New Record']").trigger("click");
	})

	// "click" event for Advanced Search button - Open Search
	$(document).on('click', "#rm4ed-advanced-search", function (){
		$("a[title='Record']").trigger("click");
		//$('#SearchForm_1 > a')[0].click();
		$('#DefaultSearchForm > a')[0].click();
	})



	// Submit a search when user presses the enter key inside the search box
	$(document).on("keyup", "#rm4ed-global-search-input", function(e){
		if(e.which == 13){
			$( ".global-search-btn" ).trigger( "click" )
		}
	});
	
	$(document).on("click", ".global-search-btn", function(){
		updateGlobalSearchInput($("#rm4ed-global-search-input").val(), "input")		   
	})
	
	
	// We use the mousedown event to update the #global-search-input BEFORE the click event is fired.
	$(document).on("mousedown", "#rm4ed-intercept-global-search-button-click-narrow", function(){
		updateGlobalSearchInput($("#rm4ed-global-search-input").val(), "input")		   
	})

	// Clear search input box when executing and advanced search
	$(document).on("click", "button[title='Initiate your search']", function(){
		console.log("The button is clicked.")		
		$("#rm4ed-global-search-input").val("")
	})
	
});
/// END EVENT HANDLERS FOR USER-DRIVEN EVENTS ///


window.addEventListener('message', function(e) {
	var scroll_height = e.data;
	document.getElementById('iframe-container').style.height = scroll_height + 'px'; 
	document.getElementById('gilbyim-news-iframe').style.height = scroll_height + 'px'; 
} , false);


