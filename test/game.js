var expect = require("chai").expect;
var Game = require("../lib/game");
var utils = require("../lib/utils");
describe("game", function() {

  describe("#create_room", function() {
    var game = Game();
    it("should be constructed with 0 rooms", function() {


      expect(game.rooms).to.eql({});



    });

    it("should add a room with name of input", function() {

      game.create_room('room1');
      expect(game.rooms.room1).to.not.be.undefined();

    });

  });

  describe("#add_player", function(){

    var game = Game();
    game.create_room('default');
    default_room = game.rooms['default'];

    // Simulates websocket client connection
    // Adds connection inputs to result array
    var dummy_connection = {send: function(data) {this.result.push(JSON.parse(data));}, result:[]};

    it("should add a player to room default", function(){


    game.add_player("Tom","default", dummy_connection);
    expect(default_room.players.Tom).to.not.be.undefined();
    });

    it("should have sent the player an array of empty players", function(){
    // First object sent to connection was player data
    expect(dummy_connection.result[0]).to.eql(JSON.parse(utils.create_response("default","players", [])));
  });
    it("should have sent the player a message about themselves joining the room", function() {
    // Second connection to be sent to conn was new_player data
    expect(dummy_connection.result[1]).to.eql('Tom has joined the game');
  });

  });


});
