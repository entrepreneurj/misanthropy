var utils = require('./utils');

module.exports = function () {

	var module = {};

	module.rooms = {};

	module.create_room = function(room_name) {
		var room = {'players':{}, 'active': false};

		module.rooms[room_name] = room;
	};

	module.add_player = function(player,room_name, connection) {
		// Sends list of existing players to new player
		connection.send(utils.create_response(room_name, "players", Object.keys(module.rooms[room_name].players)));

			// Adds new player
			module.rooms[room_name].players[player] = connection;

			// Informs everybody (including new player) about new player
			module.announce_player(player,room_name);
	};

	module.announce_player = function(new_player, room_name) {
		var room = module.rooms[room_name];
		Object.keys(room.players).forEach(function (player) {

			console.log("Sending "+ player +" announcement about "+new_player);
			room.players[player].send(JSON.stringify(new_player+ " has joined the game"));
		});
	};


 return module;
};
