var anchors = [
		{
			name: "Home",
			anchor: $("#Home")
		},
		{
			name: "Main_functions",
			anchor: $("#Main_functions")
		},
		{
			name: "Equipment",
			anchor: $("#Equipment")
		},
		{
			name: "Characteristics",
			anchor: $("#Characteristics")
		},
		{
			name: "Features",
			anchor: $("#Features")
		},
		{
			name: "Reviews",
			anchor: $("#Reviews")
		},
		{
			name: "EndDoc",
			anchor: $("#EndDoc")
		}
	];
var ranges = [
		{
			name: "Home-Main_functions",
			range: [$("#Home"),$("#Main_functions")]
		},
		{
			name: "Main_functions-Equipment",
			range: [$("#Main_functions"),$("#Equipment")]
		},
		{
			name: "Equipment-Characteristics",
			range: [$("#Equipment"),$("#Characteristics")]
		},
		{
			name: "Characteristics-Features",
			range: [$("#Characteristics"),$("#Features")]
		},
		{
			name: "Features-Reviews",
			range: [$("#Features"),$("#Reviews")]
		},
		{
			name: "Reviews-EndDoc",
			range: [$("#Reviews"),$("#EndDoc")]
		}
	];

var myModule = new ScrollingAnchors({
	ranges
});

/*
myModule.on("onTheScreen:anchors:Equipment", function() {
	console.log("Last Anchor on Screen!");
});
*/

myModule.on("onTheScreen:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges on Screen!");
	$(".on-screen").html("true");
});

myModule.on("notOnTheScreen:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges NOT on Screen!");
	$(".on-screen").html("false");
});



myModule.on("top:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".position").html("top");
});

myModule.on("middle:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".position").html("middle");
});

myModule.on("cover:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".position").html("cover");
});

myModule.on("bottom:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".position").html("bottom");
});


myModule.on("mostNotable:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges is most Notable!");
	$(".most-notable").html("true");
});
myModule.on("notMostNotable:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges is most Notable!");
	$(".most-notable").html("false");
});


myModule.addListeners(function( data ) {
	console.log( data.mostNotableIndex );
});


