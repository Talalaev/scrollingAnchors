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
	anchors
});

myModule.on("onTheScreen:anchors:Equipment", function() {
	console.log("Last Anchor on Screen!");
});

myModule.addListeners( ( data ) => {
	console.log( data.anchors );
});

exports.myModule = myModule;
/*
describe("Test MyNewModule", () => {

    it("first test", () => {
        expect(true).toBe(true);
    });

});
*/