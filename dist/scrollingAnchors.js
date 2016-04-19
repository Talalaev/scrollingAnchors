"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollingAnchors =
/******/function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(1);

	var ScrollingAnchors = function () {
		function ScrollingAnchors(options) {
			_classCallCheck(this, ScrollingAnchors);

			var self = this,
			    parent = options.parent ? options.parent : window,
			    anchors = options.anchors ? options.anchors.map(function (item) {
				return new (function (_EventEmitter) {
					_inherits(Anchors, _EventEmitter);

					function Anchors() {
						_classCallCheck(this, Anchors);

						var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Anchors).call(this));

						_this.el = item.anchor;
						_this.name = item.name;
						_this.coords = $(item.anchor).offset().top;
						_this.onScreen = null;
						return _this;
					}

					return Anchors;
				}(EventEmitter))();
			}) : [],
			    ranges = options.ranges ? options.ranges.map(function (item) {
				return new (function (_EventEmitter2) {
					_inherits(Ranges, _EventEmitter2);

					function Ranges() {
						_classCallCheck(this, Ranges);

						var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ranges).call(this));

						_this2.el = item.range;
						_this2.name = item.name;
						_this2.coords = {
							top: $(item.range[0]).offset().top,
							bottom: $(item.range[1]).offset().top
						};
						_this2.onScreen = undefined;
						_this2.position = undefined; // top bottom middle cover
						_this2.isMostNotable = undefined;
						_this2.visiblePart = 0;
						return _this2;
					}

					return Ranges;
				}(EventEmitter))();
			}) : [],
			    mostNotableIndex = null,
			    eventListeners = [];
			this.routingTables = {
				anchors: function () {
					var table = {};
					for (var i = anchors.length; i--;) {
						table[anchors[i].name] = i;
					}return table;
				}(),
				ranges: function () {
					var table = {};
					for (var i = ranges.length; i--;) {
						table[ranges[i].name] = i;
					}return table;
				}()
			};
			var currentState = {};

			$(parent).on("scroll", onScrollParent);

			function onScrollParent() {

				if (anchors.length) {
					for (var i = 0; i < anchors.length; i++) {

						// ANCHORS
						if (ScrollingAnchors.coordsOnScreen(parent, anchors[i].coords)) {
							if (!anchors[i].onScreen) anchors[i].emit("onTheScreen", [anchors[i]]);
							anchors[i].onScreen = true;
						} else {
							if (anchors[i].onScreen) anchors[i].emit("notOnTheScreen", [anchors[i]]);
							anchors[i].onScreen = false;
						}
						// ANCHORS
					}
				}

				if (ranges.length) {
					// RANGES
					mostNotableIndex = 0;
					var saveSize = 0;

					for (var i = 0; i < ranges.length; i++) {
						currentState.onScreen = ranges[i].onScreen;
						currentState.position = ranges[i].position;

						ranges[i].onScreen = false;

						if (ranges[i].coords.top > $(parent).scrollTop() + $(parent).height()) {
							ranges[i].position = "bottom";
						}
						if (ranges[i].coords.bottom < $(parent).scrollTop()) {
							ranges[i].position = "top";
						}
						if (ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.bottom) && !ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.top)) {
							ranges[i].position = "top";
							ranges[i].onScreen = true;
							ranges[i].visiblePart = ranges[i].coords.bottom - $(parent).scrollTop();
						}
						if (ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.bottom) && ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.top)) {
							ranges[i].position = "middle";
							ranges[i].onScreen = true;
							ranges[i].visiblePart = ranges[i].coords.bottom - ranges[i].coords.top;
						}
						if (ScrollingAnchors.rangeLargerThanScreen(parent, ranges[i].coords)) {
							ranges[i].position = "cover";
							ranges[i].onScreen = true;
							ranges[i].visiblePart = $(parent).height();
						}
						if (!ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.bottom) && ScrollingAnchors.coordsOnScreen(parent, ranges[i].coords.top)) {
							ranges[i].position = "bottom";
							ranges[i].onScreen = true;
							ranges[i].visiblePart = $(parent).scrollTop() + $(parent).height() - ranges[i].coords.top;
						}

						// emit events
						if (currentState.onScreen === undefined) {
							if (ranges[i].onScreen) {
								ranges[i].emit("onTheScreen", [ranges[i]]);
							} else {
								ranges[i].emit("notOnTheScreen", [ranges[i]]);
							}
						} else if (currentState.onScreen !== ranges[i].onScreen) {
							if (ranges[i].onScreen) {
								ranges[i].emit("onTheScreen", [ranges[i]]);
							} else {
								ranges[i].emit("notOnTheScreen", [ranges[i]]);
							}
						}

						if (currentState.position === undefined) {
							ranges[i].emit(ranges[i].position, [ranges[i]]);
						} else if (currentState.position !== ranges[i].position) {
							ranges[i].emit(ranges[i].position, [ranges[i]]);
						}
					}

					for (var i = 0; i < ranges.length; i++) {
						if (saveSize < ranges[i].visiblePart) {
							saveSize = ranges[i].visiblePart;
							mostNotableIndex = i;
						}
					}
					for (var i = 0; i < ranges.length; i++) {
						if (i == mostNotableIndex) continue;
						ranges[i].isMostNotablePrev = ranges[i].isMostNotable;
						ranges[i].isMostNotable = false;
					}

					ranges[mostNotableIndex].isMostNotablePrev = ranges[mostNotableIndex].isMostNotable;
					ranges[mostNotableIndex].isMostNotable = true;

					for (var i = 0; i < ranges.length; i++) {
						// emit event
						if (ranges[i].isMostNotablePrev === undefined) {
							if (ranges[i].isMostNotable) {
								ranges[i].emit("mostNotable", [ranges[i]]);
							} else {
								ranges[i].emit("notMostNotable", [ranges[i]]);
							}
						} else if (ranges[i].isMostNotablePrev !== ranges[i].isMostNotable) {
							if (ranges[i].isMostNotable) {
								ranges[i].emit("mostNotable", [ranges[i]]);
							} else {
								ranges[i].emit("notMostNotable", [ranges[i]]);
							}
						}
					}

					// RANGES
				}

				if (!eventListeners.length) return;

				for (var i = 0; i < eventListeners.length; i++) {
					eventListeners[i]({
						anchors: anchors,
						ranges: ranges,
						mostNotableIndex: mostNotableIndex
					});
				}
			}

			self.addListeners = function (func) {
				eventListeners.push(func);
				onScrollParent();
			};

			self.get = function (what) {
				if (what === "anchors") return anchors;
				if (what === "ranges") return ranges;
			};
		}

		_createClass(ScrollingAnchors, [{
			key: "on",
			value: function on(event, handler) {
				try {
					var parse = event.split(":"),
					    event = parse[0],
					    label = parse[1],
					    // label type. anchors or ranges
					which = parse[2]; // index or name

					if (isNumeric(which)) {
						this.get(label)[which].on(event, handler);
					} else {
						this.get(label)[this.routingTables[label][which]].on(event, handler);
					}

					return true;
				} catch (e) {
					console.log(event);
					console.log(label);
					console.log(which);
					console.log(e);
					console.log("parse error. maybe incorrectly stated the name");
				}

				function isNumeric(n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				}
			}
		}], [{
			key: "coordsOnScreen",
			value: function coordsOnScreen(screen, coords) {
				var top = $(screen).scrollTop(),
				    bottom = $(screen).scrollTop() + $(screen).height();
				return top <= coords && bottom >= coords;
			}
		}, {
			key: "rangeLargerThanScreen",
			value: function rangeLargerThanScreen(screen, rangeCoords) {
				var top = $(screen).scrollTop(),
				    bottom = $(screen).scrollTop() + $(screen).height();
				if (rangeCoords.top < top && rangeCoords.bottom > bottom) return true;
				return false;
			}
		}]);

		return ScrollingAnchors;
	}();

	module.exports = ScrollingAnchors;

	/***/
},
/* 1 */
/***/function (module, exports) {
	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);

			this.repository = {};
		}

		_createClass(EventEmitter, [{
			key: "on",
			value: function on(event, func) {
				var handlers = this.repository[event];
				if (handlers) {
					handlers.push(func);
				} else {
					this.repository[event] = [func];
				}
				return this;
			}
		}, {
			key: "off",
			value: function off(event, func) {
				var handlers = this.repository[event];
				if (handlers) {
					handlers.splice(handlers.indexOf(func));
				}
				return this;
			}
		}, {
			key: "emit",
			value: function emit(event, args, context) {
				context = context ? context : this;
				args = args ? args : [];
				var handlers = this.repository[event];
				if (handlers) {
					for (var i = 0, length = handlers.length; i < length; i++) {
						handlers[i].apply(context, args);
					}
				}
				return this;
			}
		}, {
			key: "allEvents",
			get: function get() {
				var allEvents = [];
				for (var key in this.repository) {
					allEvents.push(key);
				}
				return allEvents;
			}
		}]);

		return EventEmitter;
	}();

	module.exports = EventEmitter;
	/*
 var emiter = new EventEmitter();
 emiter.on("isLoad", function(data) {
 	alert("Отправить данные на сервер! Данные " + data);
 });
 
 
 setTimeout(function() {
 	emiter.emit("isLoad", ["Мои данные!!!!"])
 }, 2000);
 */

	/***/
}
/******/]);
