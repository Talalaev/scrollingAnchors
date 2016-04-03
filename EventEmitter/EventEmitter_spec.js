
describe("Testing Event Emiter", function() {
	var emiter = new FDP.EventEmitter();
	
	it("expectation type of variable is object", function() {
		expect(typeof new FDP.EventEmitter()).toBe("object");
	});
	
	it("to be defined property 'on'", function() {
		expect(emiter.on).toBeDefined();
	});
	
	it("to be defined property 'off'", function() {
		expect(emiter.off).toBeDefined();
	});
	
	it("to be defined property 'emit'", function() {
		expect(emiter.emit).toBeDefined();
	});
	
	it("to be defined property 'allEvents'", function() {
		expect(emiter.allEvents).toBeDefined();
	});
	
	describe("testing methods -> .on", function() {
		var emiter = new FDP.EventEmitter();
		var callback = function(data) {};
		
		emiter.on("isLoad", callback);
		
		it("expect repository contain event 'isLoad'", function() {
			expect(emiter.repository.isLoad).toContain(callback);
		});
		
	});
	
	describe("testing methods -> .off", function() {
		var a = 0
		var emiter = new FDP.EventEmitter();
		var callback = function(data) {
			a++
		};
		
		emiter.on("isLoad", callback);
		emiter.off("isLoad", callback);
		
		it("expect repository don't contain event 'isLoad'", function() {
			expect(emiter.repository.isLoad).not.toContain(callback);
		});
		
	});
	
	describe("testing methods -> .emit", function() {
		var a = 0
		var emiter = new FDP.EventEmitter();
		var callback = function(data) {
			a++
		};
		
		emiter.on("isLoad", callback);
		emiter.emit("isLoad");
		
		it("expect value 'a'=1", function() {
			expect(a).toEqual(1);
		});
		
	});
	
	describe("testing methods -> .allEvents", function() {
		var emiter_1 = new FDP.EventEmitter();
		var emiter_2 = new FDP.EventEmitter();
		var callback = function(data) {};
		emiter_2.on("isLoad", function(data) {});
		
		it("expect 0 events in repository", function() {
			expect(emiter_1.allEvents.length).toBe(0);
		});
		
		it("expect 1 events in repository", function() {
			expect(emiter_2.allEvents.length).toBe(1);
		});
	  
	});
	  
});



