var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

app.use('/static', express.static(__dirname + '/public'));
app.use('/library', express.static(__dirname + '/public/sculpt'));


var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

// Set up room logic
var rooms = {};
create_room('default');
console.log(rooms);
var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })

  ws.on('message', function(data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    data = JSON.parse(data);
    console.log(data.type);
    switch (data["type"]) {
      // adds player to game if game if game is not active
      case "new_player":
        var room_name = data['body']['room'];
        // check to see if msg is valid
        if ( room_name && room_name in rooms && rooms[room_name].active == false) {
          // add player to room
          add_player(data["player"],data['body']['room'], ws);
          console.log("added player '" + data["player"] + "' to room #" + data['body']['room']  );
          console.log(rooms[room_name])
          break;
        }
      default:
        console.log("message: "+ JSON.stringify(data, null, 4));
    }

  })

})



function create_room(room_name) {
  var room = {'players':{}, 'active': false};

  rooms[room_name] = room;
}

function add_player(player,room_name, connection) {
    rooms[room_name].players[player] = connection
    announce_player(player,room_name)
}

function announce_player(new_player, room_name) {
  Object.keys(rooms[room_name].players).forEach(function (player) {
      console.log(rooms[room_name].players[player]);
  });
}
