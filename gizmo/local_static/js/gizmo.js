$(document).ready(function(){

	// console.log(" -- got doc ready");

	const gWheel = $('#g-wheel'),
		gTurbine = $('#g-turbine'),
		gCog = $('#g-cogged_gear');
		// gRatchet = $('#g-ratchet-gear');
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
			ctl.timeScale(10);
		}, function(event){
			ctl.timeScale(1);
		}
	);
	// // faster for inner ratchet gear
	// gRatchet.hover(
	// 	function(event){ 
	// 		console.log(" -- over ratchet");
	// 		ctl.timeScale(30);
	// 	}, function(event){
	// 		ctl.timeScale(10);
	// 	}
	// );

	TweenLite.set(gTurbine, {transformOrigin: 'center center'}); 
	// TweenLite.to(gTurbine, 5, {rotation: -270, ease: Power3.easeOut });
	const ttl = new TimelineMax(0);
	ttl.to(gTurbine, 5, {rotation: -270, ease: Power4.easeOut });
	gTurbine.hover(
		function(event){ 
			TweenLite.to(gTurbine, 3, {rotation: '+=270', ease: Power3.easeOut });
		}, function(event){
			// ttl.pause();
		}
	);
}); // end doc ready
