$(document).ready(function(){

	// console.log(" -- got doc ready");

	const gWheel = $('#g-wheel'),
    gTurbine = $('#g-turbine'),
		gTurbineHub = $('#g-turbine_hub'),
		gCog = $('#g-cogged_gear'),
		gRatchet = $('#ratchet-gear');
		// replayButton = $('#replay');

	TweenLite.set(gWheel, {transformOrigin: 'center center'}); 
	TweenLite.to(gWheel, 5, {rotation: -270, ease: Power3.easeOut });
	gWheel.hover(
		function(event){ 
			TweenLite.to(gWheel, .3, {rotation: '-=45', ease: Power3.easeOut });
		}, function(event){
			TweenLite.to(gWheel, 3, {rotation: '+=270', ease: Power3.easeOut });
		}
	);

	TweenMax.set(gCog, {transformOrigin: 'center center'}); 
	const ctl = new TimelineMax(0);
	ctl.to(gCog, 50, {rotation: 360, ease: Power0.easeNone, repeat:15 });
	// mild speed bump for outer cog
	gCog.hover(
		function(event){ 
			// console.log(" -- over cog");
			ctl.timeScale(6);
		}, function(event){
			ctl.timeScale(1);
		}
	);

	// faster for inner ratchet gear
	gRatchet.hover(
		function(event){ 
			// console.log(" -- over ratchet");
			ctl.timeScale(16);
		}, function(event){
			ctl.timeScale(6);
		}
	);

	TweenLite.set(gTurbine, {transformOrigin: 'center center'}); 
	// TweenLite.to(gTurbine, 5, {rotation: -270, ease: Power3.easeOut });
	const ttl = new TimelineMax(0);
	ttl.to(gTurbine, 5, {rotation: -270, ease: Power4.easeOut });

  // gTurbine.hover(
	gTurbineHub.hover(
		function(event){ 
      // TweenLite.to(gTurbine, 3, {rotation: '+=270', ease: Power3.easeOut });
      TweenMax.to(gTurbine, 2, {rotation: '+=360', repeat:-1, ease: Power0.easeNone });
    }, function(event){
      // ttl.pause();
			TweenLite.to(gTurbine, 2, {rotation: '+=180', ease: Power3.easeOut });
		}
	);

	// slim pops
  $(document).on("click", ".pop_item", function(event){
  // $(".pop_item").on("click touchstart", function(event){
    event.preventDefault();
    // get href
    // use closest -- target may be image in dig deeper gallery
    var chosen_href = $(event.target).closest('a').attr('href');
    console.log(" -- href: " + chosen_href);
    // e.g. /project/impressions
    var href_split = chosen_href.split('/');    
    // href_split[1] = project, about, [2] = impressions, juliet
    var ajaxHref = "/" + href_split[1] + "/ajax/" + href_split[2];
    console.log(" -- ajaxHref: " + ajaxHref);

	// slimPop(chosen_href, slimpopSizeClass);  
	slimPop(ajaxHref, "project");  

 //    // console.log(" -- slim class size: " + slimpopSizeClass);

	// // conditions for full version of pop
 //    // for mobile special and supporting items  then insert "/full" into path
 //    // e.g. /special/footprint/find-footprints/
 //    //     0/   1   /   2     /     3         / 4
 //    if ($('#js-top-navigation-mobile-menu').is(":visible"))  {
 //      if (href_split[1] == "special" || href_split[1] == "supporting"){
 //        var fullHref = "/" + href_split[1] + "/full/" + href_split[2] + "/" + href_split[3] + "/";
 //        // e.g. /special/full/footprint/find-footprints/
 //        // console.log(" -- fullHref: " + fullHref);
 //        window.location.href = fullHref;        
 //      }
 //    } else {
 //      // call ajax for the slim pop. (href, size class)
 //      slimPop(chosen_href, slimpopSizeClass);  
 //    }

  });

}); // end doc ready

/* 
*  used by popBox() and..
*/
function slimPop(theURL, sizeClass) { 
  // append divs if not present
  if (!$('#slimpop-overlay').length > 0) { // overlay html doesn't exist
    //create HTML markup for lightbox window
    var slimpopOverlay = 
    '<div id="slimpop-overlay" class="hidden"></div>' +
    '<div id="slimpop-container" class="hidden"></div>';
    //insert lightbox HTML into page
    $('body').append(slimpopOverlay);
    // assign close click to overlay
    $('#slimpop-overlay').click(function(event){
      hideBox();    
    });
  } else { // clear the container -- otherwise previous content flashes by
    $('#slimpop-overlay').html = " ";
  }
  // unhide overlay
  $('#slimpop-overlay').removeClass().addClass('unhidden');
  // assign contentDiv for further use
  var contentDiv = $('#slimpop-container');
  // contentDiv will be unhidden by specific classes 
  contentDiv.removeClass().addClass("slimpop-basic").addClass(sizeClass); 
  // call Ajax
  getURL(theURL, contentDiv);
}

/* simple hide called by Close link in box, and by hideOverlay, below.
*/
function hideBox() {
  // test for existence of audioPlayer element - see Impressions
  // set var for div
  var contentDiv = $('#slimpop-container');
  // empty content div so it won't briefly show old content on new pop
  contentDiv.html = " ";  
  // hide box.. 
  contentDiv.removeClass().addClass('hidden');
  // ..and darkening overlay
  $('#slimpop-overlay').removeClass().addClass('hidden');

}

// ----------- AJAX ----------

// jQuery Ajax
function getURL(theURL, contentDiv) {
  //contentDiv.load(theURL);
  // using .get instead of .load so that I can catch errors, especially 404
  // requestData,?
  $.get(theURL, function(data) {  
    contentDiv.html(data);
    // console.log("--- attr name: " + contentDiv.attr('id'));
    // make sure we're scrolled to the top
    // in the case of full screen (mobile) the scroll has to operate on 
    // the whole windo
    if (contentDiv.attr('id') == 'fullpop_content_wrapper') {
      $(window).scrollTop( 0 );
    } else {
      contentDiv.animate({ scrollTop: 0 }, 0);    
    }
    // following callback wasn't needed since we're operating on the window.
    // contentDiv.html(data).promise().done(function(){
    //   // console.log(" -- success for html")
    //   // scrollTop works on window, not div
    //   $(window).scrollTop( 0 );
    // });
  }).fail(function(jqXHR) {
    contentDiv.html('<div id="slimpop-wrapper">' + '<p>SlimPop error: ' + 
      jqXHR.status + '</p></div>')
    .append(jqXHR.responseText);
  });
}
