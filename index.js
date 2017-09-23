var http = require("http")
var ws = require("nodejs-websocket")

var refreshTime = 30000;

var wsPort = **YOURWSPORT**

//Setup the interval on which we will refresh data from LaundryAlert server
var interval = setInterval(fetchData, refreshTime)

//Used to track when we have no clients online and stop polling LaundryAlert servers when that is the case (avoid suspicious use pattern)
var numClients = 0;
var server = ws.createServer(function(conn) {
	console.log("New websocket connection");
	conn.on("text", function(text) {
		//This whole "hello" and "bye" stuff is a bit of a hack that I had to do because of the way I run this on my server; it's probably not necessary for other users.
		//It pretty much serves as a more explicit way to track open connections that represent active users
		if(text == "hello") {
			numClients++
			console.log("connection hello")
		} else if(text == "bye") {
			numClients--
			console.log("Connection bye")

			if(numClients == 0) {
				console.log("Disabling check due to no clients");
				clearInterval(interval)
			}
		}
	});


	
	conn.sendText(lastData)
	
	//If they are the first client to connect in a while, setup the interval so it will update live for the duration of their connection
	if(interval._idleTimeout == -1) {
		console.log("no interval")
		fetchData()
		interval = setInterval(fetchData, refreshTime)
	}
	conn.on("error", function(err) {
		console.log("WS error", err);
	});
}).listen(wsPort);

function broadcast(textToSend) {
	server.connections.forEach(function(conn) {
		conn.sendText(textToSend);
	});
}


var lastData = ""; 
function fetchData() {
	console.log("fetching data")
	var fullData = "";
	//This is the URL to fetch from LaundryAlert's system. Adjust it to any other LaundryAlert url of similar format to use with other campuses/locations covered by LaundryAlert.
	http.get("http://23.23.147.128/homes/mydata/yellowjacket", function(res) {
		res.on("data", function(data) {
			fullData += data;
		});

		res.on("end", function() {
			broadcast(fullData)
			lastData = fullData
		});
	})
}
