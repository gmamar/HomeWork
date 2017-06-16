let http = require('http');
let counter = 0;
const port = 3000;

var server = http.createServer();

server.listen(port, function (error) {
	if (error) {
		console.log(error);
	} else {
		console.log(error);
		console.log('api listening on port', port);
	}
});
//console.log("test");
server.on('request', function (request, response) {
	console.log (request.url);
	switch(request.url){
		case "/add":
			response.write("<h1>Add rquest counter is approved</h1>" + ++counter);
			break;
		case "/dec":
			response.write("<h1>Decrease rquest counter is approved</h1>" + --counter);
			break;
		case "/res":
			counter = 0;
			response.write("<h1>Rest counter</h1>" + counter);
			break;
		default :
			response.write("<h1>pleasssssss enter your request</h1>" + counter);
					  }
	response.end();
});
