"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var utils = require("../lib/utils");
describe("sockets", function() {

	var Sockets = require("../lib/sockets");
	describe("initialisation", function() {
		describe("should require an http server input",function() {

			it("should reject a null input", function() {
				var Sockets = require("../lib/sockets");
				expect(Sockets.bind(this, null)).to.throw("`port` or a `server` must be provided");
			});

			it("should accept a server input", function() {
        var http = require("http");
        var server = http.createServer(function(data) {console.log(data);});

        //var spy = sinon.spy(server);
        //console.log(spy);
				expect(Sockets.bind(this,server)).to.not.throw();
        //expect(spy).to.have.been.called();


			});

		});
	});

  
});
