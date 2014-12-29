"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var http = require("http");
var utils = require("../lib/utils");
var WebSocket = require("ws");

describe("sockets", function() {

	var Sockets = require("../lib/sockets");
	describe("initialisation", function() {
		describe("should require an http server input",function() {

			it("should reject a null input", function() {

				expect(Sockets.bind(this, null)).to.throw("`port` or a `server` must be provided");

			});

			it("should accept a server input", function() {
        var server = http.createServer(function(data) {console.log(data);});

        //var spy = sinon.spy(server);
        //console.log(spy);
				expect(Sockets.bind(this,server)).to.not.throw();
        //expect(spy).to.have.been.called();


			});

		});
	});

	describe("websockets", function() {

		// Uses Sinon to spy on console.log
		before(function() {sinon.spy(console,"log");});
		after(function() {console.log.restore();});

		// Create server
		var server = http.createServer(function(data){});
		server.listen(9999);

		// Create web-socket server
		var sockets = Sockets(server);


		it("should log to console when a websocket is opened", function() {

		var ws = new WebSocket("ws://localhost:9999");
		ws.on('open', function() {

			expect(console.log.getCall(1).args[0]).to.eql("websocket connection open");



		});




		});

		it("should log to console when a websococket is closed", function() {

			var ws = new WebSocket("ws://localhost:9999");
			ws.on('close', function() {

			expect(console.log.getCall(2).args[0]).to.eql("websocket connection close");

			});

		});
	});


});
