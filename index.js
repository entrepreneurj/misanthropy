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
})

function create_room(room_name) {
  var room = {'players':[]};

  rooms[room_name] = room;
}

function add_player(player,room_name) {
    rooms[room_name].players.push(player)
}
