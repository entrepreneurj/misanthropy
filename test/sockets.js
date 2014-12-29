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
		var spy;
		beforeEach(function() {spy = sinon.spy(console,"log");console.log('before every test');});
		afterEach(function() {console.log.restore(); spy=null;console.log('after every test')});

		// Create server
		var server = http.createServer(function(data){});
		server.listen(9999);

		// Create web-socket server
		var sockets = Sockets(server);


		it("should log to console when a websocket is opened", function(done) {

			// open new websocket
			var ws = new WebSocket("ws://localhost:9999");
			ws.on('open', function() {
				done();
				expect(spy.getCall(1).args[0]).to.contain("websocket connection open");


			});


		});

		it("should log to console when a websococket is closed", function() {

			var ws = new WebSocket("ws://localhost:9999");
			ws.on('close', function() {

				expect(spy.getCall(2).args[0]).to.contain("websocket connection close");

			});

		});
	});
	describe('client messages', function() {

		var spy=null;
		// Uses Sinon to spy on console.log
		beforeEach(function(done) {
		 	spy = sinon.spy(console,"log");
			done();

		});
		afterEach(function(done) {
			//console.log(spy);
			console.log.restore();
			 spy=null;
			console.log('after every test');
			done();
		});

		// Create server
		var server = http.createServer(function(data){});
		server.listen(9999);

		// Create web-socket server
		var sockets = Sockets(server);


		it('should log a message when a new player is added', function(done) {
			var ws = new WebSocket("ws://localhost:9999");
			this.timeout(5000);
			ws.on('open', function() {
			//	console.log("sending data to server");
			ws.on('message',function(data, flags){

				console.log("client websocket gets message");


				//console.log(spy);
				//console.log(spy.getCall(2));


				// done();
				var parsed_data = JSON.stringify(data);
				console.log(parsed_data);
				if (parsed_data.indexOf("joined the game") > -1){
					expect(spy.getCall(1).args[0]).to.contain("new_player");
					//console.log(data, flags, done);
					ws.close();
				}

			});
				ws.send(
					JSON.stringify(
						{'player': "Tom", 'type': "new_player", 'body': {"room":'default'} }
						)
				       );
			//console.log(spy);
			// onsole.log('open');
			//
			});
			//ws.close(1000,"Test purposes", true);
			ws.on('close', function() {

				done();

			});


			//console.log(console.log.getCall(1));




		});
	});




});
