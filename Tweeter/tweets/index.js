var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'BSvYeUXvnvDHtVPrYOc65agGj',
  consumer_secret: 'WngRCFFYUuVaFyWDe7xfvKdWiUMtPJQePu41iqjAQoiTh8rkgD',
  access_token_key: '890157332465844224-BEjodQlLUxICjySSEHoZxPibORoMhjt',
  access_token_secret: 'jo249AD4c0io0n6d45s0AxntAleiHqm75doWfMzj9XTTp'
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// })

var Server = require('simple-websocket/server')

var server = new Server({ port: 3070 }) // see `ws` docs for other options

server.on('connection', function (socket) {


  socket.on('data', function (data) {})
  socket.on('close', function () {})
  socket.on('error', function (err) {})

  var stream = client.stream('statuses/filter', {track: 'football'});

  stream.on('data', function(event) {
      socket.send(JSON.stringify(event));
      console.log(event && event.text);
  });

  stream.on('error', function(error) {
    throw error;
  });

})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tweets', function(req, res) {
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        res.send(tweets);
      }
    });
});

app.get('/stream', function (req, res) {
    var stream = client.stream('statuses/filter', {track: 'javascript'});
    stream.on('data', function(event) {
        res.send(event.text);
      console.log(event && event.text);
    });

    stream.on('error', function(error) {
      throw error;
    });
});

// app.listen(3070, function() {
//     console.log('Example app listening on port 3070')
// })
