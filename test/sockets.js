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
		afterEach(function() {
			console.log.restore();
			spy=null;
			console.log('after every test');
		});

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
	describe('First player joins empty default room', function() {



		// creates ws_responses array to log messages received by client
		var ws_responses = [];

		beforeEach(function(done) {
			// Uses Sinon to spy on console.log
			this.spy = sinon.spy(console,"log");
			this.server = http.createServer(function(data){});
			this.server.listen(10000);

			// Create web-socket server
			this.sockets = Sockets(this.server);

			// Create webSocket client
			this.ws = new WebSocket("ws://localhost:10000");

			// Triggered when client connection opens
			this.ws.on('open', function() {
				this.send(
					JSON.stringify(
						{'player': "Tom", 'type': "new_player", 'body': {"room":'default'} }
						)
					);


			});

			// Triggered when ws client receives a message.
			this.ws.on('message', function(data){

				// Add messages received by client to ws_responses array
				ws_responses.push(JSON.parse(data));

				// We need to close the client after we receive the messages
				// we're interested in, otherwise the connection stays
				// open and the test times out...
				//  - Tests for phrase in message data.
				if (JSON.stringify(data).indexOf("joined the game")> -1)
				{
					this.close();
				}
			});

			// Signals that the beforeEach function is done after the
			// ws client has closed.
			this.ws.on('close', function() {done();});

		});
		afterEach(function(done) {

			// Returns functionality to console
			console.log.restore();

			this.spy=null;

			// Closes simple web server instance
			this.server.close();
			// Closes sockets webSockets server as well
			this.sockets.wss.close();
			done();
		});

		it("should return empty player list to the client", function() {
			// After giving a name, the first thing the client should receive
			// is a list of current players in the game.
			// Since the client is the first player in the game, the list
			// should be empty.
			expect(ws_responses).to.contain(
			{ room: 'default', type: 'players', body: [] }
			);

		});

		it("should have sent the player a message about themselves joining the room", function() {
				//console.log(ws_responses);
				//After sending the new player a message about all 0 players
				// in the room, the server should tell every player in the
				// room that the new player has joined. This includes
				// the new player as well.

				expect(ws_responses).to.contain("Tom has joined the game");
		});


		it("should console.log 'new player'", function() {


			expect(this.spy.getCall(1).args[0]).to.contain("new_player");


		});


	});


});
