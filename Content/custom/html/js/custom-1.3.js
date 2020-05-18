$(document).ready(function () {
    $('#homeCarousel').carousel({
        interval: 8000,
        cycle: true
    });

    // Add Chevron icons to accordions //
    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);
    // accordion 2 //
    $('#accordion2').on('hidden.bs.collapse', toggleChevron);
    $('#accordion2').on('shown.bs.collapse', toggleChevron);
    // accordion 3 //
    $('#accordion3').on('hidden.bs.collapse', toggleChevron);
    $('#accordion3').on('shown.bs.collapse', toggleChevron);

    // SocialShareKit //
    SocialShareKit.init({
        selector: '.custom-parent .ssk',
        url: 'http://my-url',
        text: 'Share text default',
        twitter: {
            url: 'http://url-for-twitter',
            text: 'Share text for twitter',
            via: 'twitter-screen-name',
            countCallback: function (shareUrl, onCountReady) {
                // Get count somewhere manually and call onCountReady() whenever you got the count.
                var count = 5;
                return onCountReady(count);
            }
        }
    });



    // ReadingZone live countdown one

    /* A note on Date - the JavaScript Date constructor expects the year, month, and day as parameters. 
    However, the month ranges from 0 to 11. To make explicit what date is intended (does a month of 3 mean March or April?) 
    I specify the month from 1 to 12 and manually subtract the 1. Thus the following denotes 25 December, 2014.
    $(selector).countdown({since: new Date(2014, 12-1, 25)}); */

    $(function () {
        $('#defaultCountdown').countdown({ until: new Date(2019, 6 - 1, 12, 14, 25), onExpiry: buttonActive, alwaysExpire: true });  // Set the date and time the live event will start (2016, 10month - 1, 11day, 10hour, 23minute)
        function buttonActive() {
            $('#liveButton').addClass('buttonActive');
            $('#liveButton > a').text("The event is not yet live");
            $('#buttonNotLive').addClass('counterHidden');
            $('#liveButtonMobile').addClass('buttonActive');

            setTimeout(function () {
                $('#liveButton').removeClass('buttonActive');
                $('#liveButtonImg').addClass('counterHidden');
                $('#liveButtonMobile').removeClass('buttonActive');
            }, 3600000);  // Set the time in milliseconds  to remove the watch live button and image (1 minute = 60000, 1hour = 3600000, 1 hr 30 min= 5400000, 2h=7200000)

        }
    });

    // ReadingZone live countdown two

    /* A note on Date - the JavaScript Date constructor expects the year, month, and day as parameters. 
    However, the month ranges from 0 to 11. To make explicit what date is intended (does a month of 3 mean March or April?) 
    I specify the month from 1 to 12 and manually subtract the 1. Thus the following denotes 25 December, 2014.
    $(selector).countdown({since: new Date(2014, 12-1, 25)}); */

    $(function () {
        $('#secondCountdown').countdown({ until: new Date(2018, 10 - 1, 19, 14, 25), onExpiry: buttonActive, alwaysExpire: true });  // Set the date and time the live event will start (2016, 10month - 1, 19day, 14hour, 30minute)
        function buttonActive() {
            $('#liveButtonTwo').addClass('buttonActive');
            $('#liveButtonTwo > a').text("The event is not yet live");
            $('#buttonNotLiveTwo').addClass('counterHidden');
            $('#liveButtonMobileTwo').addClass('buttonActive');

            setTimeout(function () {
                $('#liveButtonTwo').removeClass('buttonActive');
                $('#liveButtonImgTwo').addClass('counterHidden');
                $('#liveButtonMobileTwo').removeClass('buttonActive');
            }, 3600000);  // Set the time in milliseconds  to remove the watch live button and image (1 minute = 60000, 1hour = 3600000, 1 hr 30 min= 5400000, 2h=7200000)

        }
    });

    // feedback form //

    // run test on initial page load
    checkSize();

    // run test on resize of the window
    $(window).resize(checkSize);

    //Function to test if browser window has resized to desktop with the form open to add scroll bars back to main page under the open form
    function checkSize() {
        if ($('.media-query-test').css('float') == 'none') {
            $('body').removeClass('modal-open');
            $('#feedback-open').removeClass('scrollable');
        }
    }

    /* feedback form components */
    var fbSubmitBtn = $('#feedback-submit-btn'); // feedback submit button
    var fbOpenClose = $('#feedback-open-close'); // feedback close button when form is open
    var fbLike = $('#feedback-like'); // feedback like selection button
    var fbDislike = $('#feedback-dislike'); // feedback dislike selection button
    var fbIconBtn = $('#feedback-icon-btn'); // feedback icon button to open the feedback form
    var fbSpeech = $('.feedback-speech-bubble'); // feedback speech bubble, activated on hover over icon button
    var fbMinimisedLabel = $('.feedback-minimised-label'); // feedback icon button and speech bubble container, hidden when form is open
    var fbEmotionDislikeContinueBtn = $('#emotion-dislike-continue'); // feedback dislike step 2 continue button

    /* steps 1 - 4 panel containers */
    var fbOpenState = $('#feedback-open'); // form wrapper contains all 4 panels
    var fbemotion = $('#emotion'); // step 1 emotion like and dislike panel
    var fbEmotionDislike = $('#emotion-dislike');  // step 2 dislike panel
    var fbsubmit = $('#feedback-submit'); // step 3 submit form panel
    var fbThankyou = $('#feedback-thankyou'); // step 4 thank you panel
    var closeAllFbPanels = $('#feedback-open, #emotion, #emotion-dislike, #feedback-submit, #feedback-thankyou'); // all step panels

    var feedbackType = ""; // positive/negative
    var negativeClarification = ""; // csv of selected checkboxes
    var firstNegativeClarification = false;
    var feedbackPage = window.location.pathname;

    /* feedback form interaction */

    // show feedback message when hovering over feedback button
    fbMinimisedLabel.hover(function () {
        fbSpeech.toggleClass("hidden");
    });

    // open feedback form when feedback button is clicked
    fbMinimisedLabel.click(function () {
        fbOpenState.removeClass('hidden');
        fbemotion.removeClass('hidden');
        fbIconBtn.addClass('hidden');

        // run test on initial page load
        checkSize();

        // run test on resize of the window
        $(window).resize(checkSize);

        //Function to the to check if form is open on mobile or tablet, if true removes scroll bars
        function checkSize() {
            if ($('.media-query-test').css('float') == 'left') {
                $('body').addClass('modal-open');
                $('#feedback-open').addClass('scrollable');
            }
        }
    });

    // feedback close button, hide all paths of form and show feedback form button
    fbOpenClose.click(function () {
        closeAllFbPanels.addClass('hidden');
        fbIconBtn.removeClass('hidden');

        // run test on initial page load
        checkSize();

        // run test on resize of the window
        $(window).resize(checkSize);

        //Function to the to check if form is open on mobile or tablet, if false adds scroll bar to main page
        function checkSize() {
            if ($('.media-query-test').css('float') == 'left') {
                $('body').removeClass('modal-open');
                $('#feedback-open').removeClass('scrollable');
            }
        }
    });

    // Like path chosen, continue to next screen
    fbLike.click(function () {
        feedbackType = 'positive';
        fbsubmit.removeClass('hidden');
        fbemotion.addClass('hidden');
    });

    // dislike path chosen, continue to dislike path 2 screen
    fbDislike.click(function () {
        feedbackType = 'negative';
        fbEmotionDislike.removeClass('hidden');
        fbemotion.addClass('hidden');
    });

    // dislike path 2 complete (why) continue to submit screen
    fbEmotionDislikeContinueBtn.click(function () {
        negativeClarification = "";
        firstNegativeClarification = true;
        $('#feedbackWhyDislike').children().each(function (index, chkLbl) {
            var chk = $(chkLbl).children('input[type=checkbox]:first-child');
            if (chk.is(':checked')) {
                if (firstNegativeClarification) {
                    firstNegativeClarification = false;
                }
                else {
                    negativeClarification += ",";
                }
                negativeClarification += $(chk).val();
            }
        });
        fbsubmit.removeClass('hidden');
        fbEmotionDislike.addClass('hidden');
    });

    // submit form and show thank you message
    fbSubmitBtn.click(function () {

        console.log('--- START ---');
        console.log('Feedback Type: ' + feedbackType);
        console.log('Feedback Reason: ' + negativeClarification);
        console.log('Feedback Ideas: ' + $('#feedbackIdeas').val());
        console.log('Feedback Name: ' + $('#feedbackName').val());
        console.log('Feedback Email: ' + $('#feedbackEmail').val());
        console.log('Feedback Page: ' + feedbackPage);
        console.log('--- READY TO SEND ---');

        $(function () {
            var feedbackMessage = {
                Type: feedbackType,
                Reason: negativeClarification,
                Ideas: $('#feedbackIdeas').val(),
                RespondantName: $('#feedbackName').val(),
                RespondantEmail: $('#feedbackEmail').val(),
                RespondantPage: feedbackPage
            };
            $.ajax({
                type: "POST",
                data: JSON.stringify(feedbackMessage),
                url: "/api/WebsiteFeedback/Send",
                contentType: "application/json",
                success: function (data, status, xhr) {
                    console.log('--- SENT ---');
                    fbThankyou.removeClass('hidden');
                    fbsubmit.addClass('hidden');
                },
                error: function (xhr, status, error) {
                    alert('Update Error occurred - ' + error + '\n' + xhr.responseJSON);
                    console.dir(xhr.responseJSON);
                }
            });
        });
    });

    // end of feedback form module


    // Show character count for text fields in forms
    $(function () {

        $('input[data-showCharCount]').keyup(function () {
            var hintId = $(this).attr('data-showCharCount');
            $('#' + hintId).text($(this).val().length);
        });

    });
    //This line means that if you add #collapseTwo to the end of a summary page URL, it will scroll to the licence tab AND open the accordion. Change Two to One or Three etc to open another accordion on any page in the site.
    location.hash && $(location.hash + '.collapse').collapse('show');

    //end


    /* widgit navigation menu Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    $(function () {
        $(".menu-icon").click(function () {
            var x = document.getElementById("myTopnav");
            if (x.className === "widgit-nav") {
                x.className += " responsive";
            } else {
                x.className = "widgit-nav";
            }
        });
    });

});

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;



}









function onKonamiCode(cb) {
    var input = '';

    var key = '38384040373937396665';
    document.addEventListener('keydown', function (e) {
        input += ("" + e.keyCode);
        if (input === key) {
            return cb();
        }
        if (!key.indexOf(input)) return;
        input = ("" + e.keyCode);
    });
}

onKonamiCode(function () { window.location.href = '/Konami.html'; })