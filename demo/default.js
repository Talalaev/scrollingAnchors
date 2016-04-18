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
	$(".Equipment-Characteristics.on-screen").html("true");
});

myModule.on("notOnTheScreen:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges NOT on Screen!");
	$(".Equipment-Characteristics.on-screen").html("false");
});



myModule.on("top:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("top");
});

myModule.on("middle:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("middle");
});

myModule.on("cover:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("cover");
});

myModule.on("bottom:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("bottom");
});


myModule.on("mostNotable:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges is most Notable!");
	$(".Equipment-Characteristics.most-notable").html("true");
});
myModule.on("notMostNotable:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges is most Notable!");
	$(".Equipment-Characteristics.most-notable").html("false");
});


// ________________________________________________________________

myModule.on("onTheScreen:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges on Screen!");
	$(".Home-Main_functions.on-screen").html("true");
});

myModule.on("notOnTheScreen:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges NOT on Screen!");
	$(".Home-Main_functions.on-screen").html("false");
});



myModule.on("top:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("top");
});

myModule.on("middle:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("middle");
});

myModule.on("cover:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("cover");
});

myModule.on("bottom:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("bottom");
});


myModule.on("mostNotable:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges is most Notable!");
	$(".Home-Main_functions.most-notable").html("true");
});
myModule.on("notMostNotable:ranges:Home-Main_functions", function() {
	console.log("Home-Main_functions Ranges is most Notable!");
	$(".Home-Main_functions.most-notable").html("false");
});

//____________________________________________________


myModule.on("onTheScreen:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges on Screen!");
	$(".Features-Reviews.on-screen").html("true");
});

myModule.on("notOnTheScreen:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges NOT on Screen!");
	$(".Features-Reviews.on-screen").html("false");
});



myModule.on("top:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("top");
});

myModule.on("middle:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("middle");
});

myModule.on("cover:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("cover");
});

myModule.on("bottom:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("bottom");
});


myModule.on("mostNotable:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges is most Notable!");
	$(".Features-Reviews.most-notable").html("true");
});
myModule.on("notMostNotable:ranges:Features-Reviews", function() {
	console.log("Features-Reviews Ranges is most Notable!");
	$(".Features-Reviews.most-notable").html("false");
});

//____________________________________________________




myModule.addListeners(function( data ) {
	console.log( data );
});


