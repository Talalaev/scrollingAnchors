const EventEmitter = require('./EventEmitter');

class ScrollingAnchors {
    constructor( options ) {
		
		var self 				= this,
		parent 					= options.parent ? options.parent : window,
		anchors					= options.anchors ? options.anchors.map(function(item) {
			return new (class Anchors extends EventEmitter {
				constructor () {
					super();
					
					this.el = item.anchor;
					this.name = item.name;
					this.coords = $(item.anchor).offset().top;
					this.onScreen = null;
				}
			});
		}) : [],
		ranges					= options.ranges ? options.ranges.map(function(item) {
			return new (class Ranges extends EventEmitter {
				constructor () {
					super();
					
					this.el = item.range;
					this.name = item.name;
					this.coords = {
						top:		$(item.range[0]).offset().top,
						bottom:		$(item.range[1]).offset().top
					};
					this.onScreen = null;
					this.position = null; // top bottom middle cover
					this.isMostNotable = false;
					this.visiblePart = 0;
				}
			});
		}) : [],
		mostNotableIndex 		= null,
		eventListeners			= [];
		this.routingTables 		= {
			anchors: (function() {
				var table = {};
				for ( let i = anchors.length; i--; )
					table[anchors[i].name] = i;
				return table;
			})(),
			ranges: (function() {
				var table = {};
				for ( let i = ranges.length; i--; )
					table[ranges[i].name] = i;
				return table;
			})()
		};
		
		
		$(parent)
		.on("scroll", onScrollParent);
		
		
		function onScrollParent() {
			
			if (anchors.length) {
				for(var i = 0; i < anchors.length; i++) {
				
					// ANCHORS
					if (ScrollingAnchors.coordsOnScreen(parent, anchors[i].coords)) {
						if ( !anchors[i].onScreen )
							anchors[i].emit("onTheScreen");
						anchors[i].onScreen = true;
						
					} else {
						if ( anchors[i].onScreen )
							anchors[i].emit("notOnTheScreen");
						anchors[i].onScreen = false;
						
					}
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
					if( ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.bottom) && !ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.top) ) {
						ranges[i].position = "top";
						ranges[i].onScreen = true;
						ranges[i].visiblePart = ranges[i].coords.bottom - $(parent).scrollTop();
					}
					if( ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.bottom) && ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.top) ) {
						ranges[i].position = "middle";
						ranges[i].onScreen = true;
						ranges[i].visiblePart = ranges[i].coords.top + ranges[i].coords.bottom;
					}
					if( ScrollingAnchors.rangeLargerThanScreen(parent, ranges[i].coords) ) {
						ranges[i].position = "cover";
						ranges[i].onScreen = true;
						ranges[i].visiblePart = $(parent).height();
					}
					if ( !ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.bottom) && ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.top) ) {
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
		
		self.addListeners = function (func) {
			eventListeners.push(func);
			onScrollParent();
		}
		
		self.get = function(what) {
			if ( what === "anchors" ) return anchors;
			if ( what === "ranges" ) return ranges;
		}

		
    }
	
	
	on(event, handler) {
		try {
			var parse = event.split(":"),
			event = parse[0],
			label = parse[1], // label type. anchors or ranges 
			which = parse[2]; // index or name
			
			if ( isNumeric(which) ) {
				this.get(label)[which].on(event, handler);
			} else {
				this.get(label)[this.routingTables[label][which]].on(event, handler);
			}
			
			return true;
		} catch(e) {
			console.log(e);
			console.log("parse error. maybe incorrectly stated the name");
		}

		function isNumeric(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		}
	}
	
	
	static coordsOnScreen (screen, coords) {
		var top 		= $(screen).scrollTop(),
		bottom 			= $(screen).scrollTop() + $(screen).height();
		return (top <= coords && bottom >= coords);
	}
	
	static rangeLargerThanScreen (screen, rangeCoords) {
		var top 		= $(screen).scrollTop(),
		bottom 			= $(screen).scrollTop() + $(screen).height();
		if(rangeCoords.top < top && rangeCoords.bottom > bottom)
			return true;
		return false;
	}
}


module.exports = ScrollingAnchors;
