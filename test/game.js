var expect = require("chai").expect;
var Game = require("../lib/game");

describe("game", function() {

  describe("#create_room", function() {
    var game = Game();
    it("should be constructed with 0 rooms", function() {


      expect(game.rooms).to.eql({});



    });

    it("should add a room with name of input", function() {

      game.create_room('room1');
      expect(game.rooms['room1']).to.not.be.undefined();

    });

  });

  describe("#add_player", function(){

    var game = Game();
    game.create_room('default');
    default_room = game.rooms['default'];

    it("should add a player to room default", function(){

    // Simulates websocket client connection
    var dummy_connection = {send: function(data) {console.log(data);}};
    game.add_player("Tom","default", dummy_connection);
    expect(default_room.players.Tom).to.not.be.undefined();
  });

  });


});
