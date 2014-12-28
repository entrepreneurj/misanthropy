var expect = require("chai").expect;
var utils = require("../lib/utils");
describe("sockets", function() {

	it("should require a server parameter",function() {


		var Sockets = require("../lib/sockets");
		expect(Sockets.bind(this, null)).to.throw("`port` or a `server` must be provided");



	});
});
