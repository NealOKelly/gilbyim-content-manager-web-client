			
			// ENTER FALLBACK PRODUCT NAME FOR LOCAL HELP ACCESS //
			
			/* Localizable */
			FALLBACK_PRODUCT_NAME = " ";
			MARGIN_TOP = 0.5;
			FONT_SIZE = 2;
			

			/*
			Leave FALLBACK_PRODUCT_NAME blank to retain default behavior (no product name in IE11 and Chrome with local access) 
			To use two product names, enter "productname1 </br> productname2"
			Example: FALLBACK_PRODUCT_NAME = "NNMi </br> Ultimate"
			If you use two product names, change MARGIN_TOP to 0.8 and FONT_SIZE to 1.2
			*/
			// DO NOT EDIT BELOW THIS LINE //
			// *************************** //

		// CSS contains styles to reposition search box on narrow screens. Need CSS added at this level. // 
		$('head').append('<link rel="stylesheet" href="Content/Resources/Stylesheets/_FT_Responsive_SearchBar.css" type="text/css" />'); 
		
		$(document).ready(function () {
 

			var $myfloat = "left" 

			if ($('html.right-layout').length > 0) { 
			var $myfloat = "right" 
			}


			//get the contents of the second header line and assign to variable//
			var $div = $('<div>');
			$div.load('Content/Resources/MasterPages/_FT_HTML5_bannerTitle.htm #header-title2', function () {

			//remove all spaces and returns from the result//
			test = $(this).text()
			test = test.replace(/\s+/g, '');
			test = test.replace(/[\n\r]/g, '');

			//set the base format for the header text//
			$("#header-content").css({
			"visibility": "visible",
			"float": "left",
			"left": "20px",
			"padding-left": "0.5em",
			"font-family": "FT-MetricLocal, Arial, Tahoma, 'Lucida Sans Unicode', sans-serif;",
			//"font-weight": "bold",//
			"float" : $myfloat
			});

			if (test != "") { //if the second header variable is null, set formats for a one-line banner//
			// add styles for header text //
			$("#header-content").css({
			"margin-top": "0.8em",
			"font-size": "1.2em"
			});

			} else { //if the second header variable is not null, set formats for a two-line banner//
			// add styles for header text //
			$("#header-content").css({
			"margin-top": "0.5em",
			"font-size": "2em"
			});
			}
			});
   
			// add divs for header text and for logo //
			$("#header>a").after('<div id="header-content"></div>');
			$("#header>a").after('<div id="header-logo"></div>');

			// load the contents of the #header-content from Content/Resources/MasterPages/_FT_HTML5_bannerTitle.htm file into #header-content //
			$("#header-content").load("Content/Resources/MasterPages/_FT_HTML5_bannerTitle.htm #header-content", function(response, status) {
				//provides handling for failed XMLHTTP request during local file access//
				if ( status == "error" ) {
					//resets style attributes of containing <div> element (for IE 11, but applies to all failed requests) //
					$("#header-content").html(FALLBACK_PRODUCT_NAME); 
					$("#header-content").css({
					"margin-top": MARGIN_TOP + "em",  
					"font-size": FONT_SIZE + "em",	
					"visibility": "visible", 
					"float": "left", 
					"left": "20px", 
					"padding-left": "1em",
					"float" : $myfloat
					});
				}
			});
			
			//write the link to the standard logo file//
			$("#header-logo").html("<img src='Content/Resources/MasterPages/_FTb_banner_graphic.png' />"); //write the call to the bannar graphic and format the div.


			// add styles to position the logo //
			$("#header-logo").css({
			"visibility": "visible",
			"float" : $myfloat,
			"left": "20px",
			"padding-left": "1em",
			"margin-top": "1em",
			"margin-bottom": ".5em"
			});


			$("span.tabs-nav-text").css({"cursor": "default"});
			$("#body").css({
			"top":"65px"
			}); 

			$("#contentBodyInner").css({
			"border-left-color":"white",
			"border-right-color":"white",
			"margin-top":"0.5em",
			  }); 

 			$("#contentBody").css({"margin-left": "1.5em"});


			$("div.search-filter-content").css({"border":"1px solid #E5E8E8"});

 			//Get the name of the helpset's default file name
			var url = window.location.pathname;
			var defaultFile = url.substring(url.lastIndexOf('/')+1);

			if (defaultFile  != "Default.htm") {//If the default filename is not Default.htm, reset the link using the correct default file name
				var link = document.getElementById("searchLink");
				var path= "./" + defaultFile + "#Resources/MasterPages/_FT_aboutSearch.htm";
				link.setAttribute("href", path);
			}

		});


	$('<link>')
		.appendTo($('head'))
		.attr({type: 'text/css', rel: 'stylesheet'})
		.attr('href', 'Content/Resources/Stylesheets/_FT_Fonts.css');

		