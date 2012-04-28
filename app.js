var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.use(express.static(__dirname + '/content'));

io.sockets.on('connection', function (socket) {

  // Confirm connection
  socket.emit('news', { hello: 'world' });

  // Listen for slides changing; passive
  socket.on('slideChange', function (data) {
    console.log(data);
  });

  // Listen for commands to change all slides
  socket.on('goToSlide', function (data) {
	io.sockets.emit('goToSlide', data);
  });

  socket.on('drawLine', function (data) {
	console.log('drawLine:', data);
	io.sockets.emit('drawLine', data);
  });

  socket.on('clearCanvas', function() {
	console.log('Clear canvas');
	io.sockets.emit('clearCanvas');
  });
});

// var currentSlide = 0,
// 	intervalHandle = setInterval(function() {
// 		if(currentSlide < 10) {
// 			io.sockets.emit('goToSlide', { slide: currentSlide++ });
// 			
// 			return;
// 		}
// 		
// 		clearInterval(intervalHandle);
// 	}, 3000)


app.listen(3000);