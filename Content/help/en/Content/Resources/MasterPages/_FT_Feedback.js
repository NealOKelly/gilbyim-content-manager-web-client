//Modified: November 25, 2015
document.write('<div id=\"ft-feedbackDimmedDiv\" style="background-color: #01A982; position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 3; display: none; filter: alpha(opacity = 25); opacity: .25;">&nbsp;</div>');
					
function sendFeedback() {
	
	//call MadCap function to clear search highlights
	//remmed out for HTML5, works fine for WebHelp too
	//FMCClearSearch(window);

	var feedbackVariables = document.getElementById("ft-feedback-variables");
	var companyName = feedbackVariables.getAttribute("companyName");
	var productName = feedbackVariables.getAttribute("productName");
	var fullProductName = companyName + " " + productName;
	var productVersion = feedbackVariables.getAttribute("productVersion");
	var commentsEmailAddress = feedbackVariables.getAttribute("commentsEmailAddress");
	
	//Sivia added the next few lines
	//check for non-Latin characters in topic title
	var string = feedbackVariables.getAttribute("topicTitle");
	result=/[^\u0000-\u00ff]/.test(string);
	if (result)
		var firstheading = '';
	else
		var firstheading = feedbackVariables.getAttribute("topicTitle");
	//end of added lines
	
	var productAcronym = feedbackVariables.getAttribute("productAcronym");


	
	if (productAcronym.length > 0)
		productAcronym = " (" + productAcronym + ")";


	var index = 0;
	var delimiter = "";
	var topicURL = document.URL; 
	var lowercaseTopicURL = topicURL.toLowerCase();

	
	if (lowercaseTopicURL.search(".chm") != -1) {           // chm file? 
		delimiter = "chm::/";
		index = lowercaseTopicURL.indexOf(delimiter);

	} else if (lowercaseTopicURL.search("content") != -1){	// web-based with a Content folder?
		delimiter = "/content/";
		index = lowercaseTopicURL.indexOf(delimiter);

	} else {                                                // web-based with no Content folder?
		delimiter = "/";
		index = lowercaseTopicURL.lastIndexOf(delimiter);
	}
	
	topicURL = topicURL.substring(index + delimiter.length);

	
	line = '_______________________________________________________________%0D%0A';
	
	emailBody = document.getElementById('ft-feedbackBody').innerHTML;
	emailBody = emailBody.replace(/<span id="?ft-feedbackProduct"?><\/span>/i, fullProductName);
	emailBody = emailBody.replace(/<span id="?ft-feedbackVersion"?><\/span>/i, productVersion);
	emailBody = emailBody.replace(/<span id="?ft-feedbackTopic"?><\/span>/i, firstheading);
	emailBody = emailBody.replace(/<span id="?ft-feedbackURL"?><\/span>/i, topicURL);
	emailBody = emailBody.replace(/<span id="?ft-feedbackAcronym"?><\/span>/i, productAcronym);
	//	emailBody = emailBody.replace(//,"");
	
	document.getElementById('ft-feedbackBody').innerHTML = emailBody;
			
	emailBody = emailBody.replace(/<br>/gi, "%0D%0A");
	emailBody = emailBody.replace(/&nbsp;/g, " ");
	
	document.getElementById('ft-feedbackOpen').href = 'mailto:' + commentsEmailAddress + '?subject=Feedback on ' + fullProductName + " " + productVersion + " documentation: " + firstheading + '&body=' + line + emailBody + line; <!-- Localizable -->	
	
	dimDiv = document.getElementById('ft-feedbackDimmedDiv');
	dimDiv.style.display = "block";
	dimDiv.onclick = closeFeedback;
	
	fbDiv = document.getElementById('ft-feedbackDiv');
	fbDiv.className = "ft-feedbackDiv";
	fbDiv.style.position = "fixed";
	fbDiv.style.zIndex = "4";
	fbDiv.style.backgroundColor = "white";
	fbDiv.style.borderWidth = "thin";
	fbDiv.style.borderColor = "black";
	fbDiv.style.borderStyle = "solid";
	fbDiv.style.padding = "10px";
	fbDiv.style.width = "70%";

	fbDiv.style.left = "15%";
	fbDiv.style.top = "15%";
	fbDiv.style.display = "block";	
}

function closeFeedback()
{
	document.getElementById('ft-feedbackDiv').className = "MCTextPopupBody";
	document.getElementById('ft-feedbackDiv').style.display = "none";
	document.getElementById('ft-feedbackDimmedDiv').style.display = "none";	
}