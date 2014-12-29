var WebSocketServer = require("ws").Server;


module.exports = function(server) {



	var module = {};

	var Game = require('./game.js');
	module.game = Game();

	module.wss = new WebSocketServer({server: server});


	//console.log(module);


	module.game.create_room('default');

	module.wss.on("connection", function(ws) {

		console.log("websocket connection open");

		ws.on("close", function() {
			console.log("websocket connection close");

		});

		ws.on('message', function(data, flags) {
			// flags.binary will be set if a binary data is received.
			// flags.masked will be set if the data was masked.
			data = JSON.parse(data);
			console.log(data.type);
			switch (data.type) {
				// adds player to game if game if game is not active
				case "new_player":
					var room_name = data.body.room;
					// check to see if msg is valid
					if ( room_name && room_name in module.game.rooms && module.game.rooms[room_name].active === false) {
						// add player to room
						module.game.add_player(module.htmlEntities(data.player),module.htmlEntities(data.body.room), ws);
						console.log("added player '" + data.player + "' to room #" + data.body.room  );
						// Informs everybody (including new player) about new player
						module.game.announce_player(module.htmlEntities(data.player),module.htmlEntities(data.body.room));
						console.log(module.game.rooms[room_name]);
						break;
					}
				default:
					console.log("message: "+ JSON.stringify(data, null, 4));
			}

		});

	});



	// Source: http://css-tricks.com/snippets/javascript/htmlentities-for-javascript
	module.htmlEntities = function(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

	return module;
};
