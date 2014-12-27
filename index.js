var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5001

// User defined modules


app.use(express.static(__dirname + "/"))

app.use('/static', express.static(__dirname + '/public'));
app.use('/library', express.static(__dirname + '/public/sculpt'));


var server = http.createServer(app)
server.listen(port)
var sockets = require('./lib/sockets.js')(server)

console.log("http server listening on %d", port)
// Set up room logic
console.log("websocket server created")

