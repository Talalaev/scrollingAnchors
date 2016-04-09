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

	
const MyNewModule = require('./index.js');
const myModule = new MyNewModule({
	ranges
});

/*
myModule.on("onTheScreen:anchors:Equipment", function() {
	console.log("Last Anchor on Screen!");
});
*/

myModule.on("onTheScreen:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges on Screen!");
});

myModule.on("notOnTheScreen:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges NOT on Screen!");
});

myModule.on("top:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges Top!");
});

myModule.on("mostNotable:ranges:Equipment-Characteristics", function() {
	console.log("Equipment-Characteristics Ranges is most Notable!");
});

myModule.addListeners( ( data ) => {
	console.log( data.mostNotableIndex );
});

exports.myModule = myModule;
/*
describe("Test MyNewModule", () => {

    it("first test", () => {
        expect(true).toBe(true);
    });

});
*/