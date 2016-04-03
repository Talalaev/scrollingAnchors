function ScrollingAnchors(options) {
	var self 				= this,
	parent 					= options.parent ? options.parent : window,
	anchors					= options.anchors ? options.anchors.map(function(el) {
		return {
			el:				$(el),
			coords: 		$(el).offset().top,
			onScreen:		null
		};
	}) : [],
	ranges					= options.ranges ? options.ranges.map(function(el) {
		return {
			el:				el,
			coords: {
				top:		$(el[0]).offset().top,
				bottom:		$(el[1]).offset().top
			},
			onScreen:		null,
			position:		null, // top bottom middle cover
			isMostNotable: 	false,
			visiblePart: 	0
		}
	}) : [],
	mostNotableIndex 		= null,
	eventListeners			= [];
	
	
	$(parent)
	.on("scroll", onScrollParent);
	
	
	function onScrollParent() {
		
		if (anchors.length) {
			for(var i = 0; i < anchors.length; i++) {
			
				// ANCHORS
				(self.coordsOnScreen(parent, anchors[i].coords)) 
					? anchors[i].onScreen = true
					: anchors[i].onScreen = false;
				// ANCHORS
			
			}
		}
		
		if (ranges.length) {
			// RANGES
			mostNotableIndex 		= 0;
			var saveSize 			= 0;
			
			for(var i = 0; i < ranges.length; i++) {
				ranges[i].onScreen = false;
				
				if ( ranges[i].coords.top > ($(parent).scrollTop() + $(parent).height()) )
					ranges[i].position = "bottom";
				if ( ranges[i].coords.bottom < $(parent).scrollTop() )
					ranges[i].position = "top";
				if( self.coordsOnScreen(parent, ranges[i].coords.bottom) && !self.coordsOnScreen(parent, ranges[i].coords.top) ) {
					ranges[i].position = "top";
					ranges[i].onScreen = true;
					ranges[i].visiblePart = ranges[i].coords.bottom - $(parent).scrollTop();
				}
				if( self.coordsOnScreen(parent, ranges[i].coords.bottom) && self.coordsOnScreen(parent, ranges[i].coords.top) ) {
					ranges[i].position = "middle";
					ranges[i].onScreen = true;
					ranges[i].visiblePart = ranges[i].coords.top + ranges[i].coords.bottom;
				}
				if( self.rangeLargerThanScreen(parent, ranges[i].coords) ) {
					ranges[i].position = "cover";
					ranges[i].onScreen = true;
					ranges[i].visiblePart = $(parent).height();
				}
				if ( !self.coordsOnScreen(parent, ranges[i].coords.bottom) && self.coordsOnScreen(parent, ranges[i].coords.top) ) {
					ranges[i].position = "bottom";
					ranges[i].onScreen = true;
					ranges[i].visiblePart = ($(parent).scrollTop() + $(parent).height()) - ranges[i].coords.top;
				}
				
			}
			
			for ( var i = 0; i < ranges.length; i++ ) {
				ranges[i].isMostNotable = false;
				
				if(saveSize < ranges[i].visiblePart) {
					saveSize = ranges[i].visiblePart;
					mostNotableIndex = i;
				}
			}
			ranges[mostNotableIndex].isMostNotable = true;
			
			// RANGES
		}
		
		if(!eventListeners.length) return;
		
		for (var i = 0; i < eventListeners.length; i++) {
			eventListeners[i]({
				anchors: 			anchors,
				ranges: 			ranges,
				mostNotableIndex: 	mostNotableIndex
			});
		}
		
	}
	
	this.coordsOnScreen = function (screen, coords) {
		var top 		= $(screen).scrollTop(),
		bottom 			= $(screen).scrollTop() + $(screen).height();
		return (top <= coords && bottom >= coords);
	}
	
	this.rangeLargerThanScreen = function (screen, rangeCoords) {
		var top 		= $(screen).scrollTop(),
		bottom 			= $(screen).scrollTop() + $(screen).height();
		if(rangeCoords.top < top && rangeCoords.bottom > bottom)
			return true;
		return false;
	}
	
	this.addListeners = function(func) {
		eventListeners.push(func);
		onScrollParent();
	}
	
}

/*
var anchors = [
		$("#Home"),
		$("#Main_functions"),
		$("#Equipment"),
		$("#Characteristics"),
		$("#Features"),
		$("#Reviews"),
		$("#EndDoc")
	];
var ranges = [
		[$("#Home"),$("#Main_functions")],
		[$("#Main_functions"),$("#Equipment")],
		[$("#Equipment"),$("#Characteristics")],
		[$("#Characteristics"),$("#Features")],
		[$("#Features"),$("#Reviews")],
		[$("#Reviews"),$("#EndDoc")],
	];
	
	var s = new ScrollingAnchors({
	  anchors: [$("#Home"), $("#Main_functions")]
	});

	s.addListeners(function(data) {
	  console.log( data.anchors[1].onScreen );
	  if(data.anchors[1].onScreen) {
		$(".paralacs h1").css({"text-indent": "0"});
	  } else {
		$(".paralacs h1").css({"text-indent": "-500px"});
	  }
	});
*/