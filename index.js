var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

// User defined modules


app.use(express.static(__dirname + "/"))

app.use('/static', express.static(__dirname + '/public'));
app.use('/library', express.static(__dirname + '/public/sculpt'));


var server = http.createServer(app)
server.listen(port)
console.log("http server listening on %d", port)

// Inpspired by: http://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module
var sockets = require('./lib/sockets.js')(server)

console.log("websocket server created")
