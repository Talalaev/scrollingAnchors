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

myModule.on("onTheScreen:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges on Screen!");
	$(".Equipment-Characteristics.on-screen").html("true");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});

myModule.on("notOnTheScreen:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges NOT on Screen!");
	$(".Equipment-Characteristics.on-screen").html("false");
	$(".visiblePart.Equipment-Characteristics").html("0");
});



myModule.on("top:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("top");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});

myModule.on("middle:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("middle");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});

myModule.on("cover:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("cover");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});

myModule.on("bottom:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges Top!");
	$(".Equipment-Characteristics.position").html("bottom");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});


myModule.on("mostNotable:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges is most Notable!");
	$(".Equipment-Characteristics.most-notable").html("true");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});
myModule.on("notMostNotable:ranges:Equipment-Characteristics", function( data ) {
	console.log("Equipment-Characteristics Ranges is most Notable!");
	$(".Equipment-Characteristics.most-notable").html("false");
	$(".visiblePart.Equipment-Characteristics").html(data.visiblePart);
});


// ________________________________________________________________

myModule.on("onTheScreen:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges on Screen!");
	$(".Home-Main_functions.on-screen").html("true");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});

myModule.on("notOnTheScreen:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges NOT on Screen!");
	$(".Home-Main_functions.on-screen").html("false");
	$(".visiblePart.Home-Main_functions").html("0");
});



myModule.on("top:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("top");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});

myModule.on("middle:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("middle");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});

myModule.on("cover:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("cover");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});

myModule.on("bottom:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges Top!");
	$(".Home-Main_functions.position").html("bottom");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});


myModule.on("mostNotable:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges is most Notable!");
	$(".Home-Main_functions.most-notable").html("true");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});
myModule.on("notMostNotable:ranges:Home-Main_functions", function( data ) {
	console.log("Home-Main_functions Ranges is most Notable!");
	$(".Home-Main_functions.most-notable").html("false");
	$(".visiblePart.Home-Main_functions").html(data.visiblePart);
});

//____________________________________________________


myModule.on("onTheScreen:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges on Screen!");
	$(".Features-Reviews.on-screen").html("true");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});

myModule.on("notOnTheScreen:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges NOT on Screen!");
	$(".Features-Reviews.on-screen").html("false");
	$(".visiblePart.Features-Reviews").html("0");
});



myModule.on("top:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("top");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});

myModule.on("middle:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("middle");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});

myModule.on("cover:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("cover");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});

myModule.on("bottom:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges Top!");
	$(".Features-Reviews.position").html("bottom");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});


myModule.on("mostNotable:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges is most Notable!");
	$(".Features-Reviews.most-notable").html("true");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});
myModule.on("notMostNotable:ranges:Features-Reviews", function( data ) {
	console.log("Features-Reviews Ranges is most Notable!");
	$(".Features-Reviews.most-notable").html("false");
	$(".visiblePart.Features-Reviews").html(data.visiblePart);
});

//____________________________________________________




myModule.addListeners(function( data ) {
	console.log( data );
});


