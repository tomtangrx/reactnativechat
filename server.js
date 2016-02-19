var http = require('http');
var express = require('express');
var path = require('path');
var app = new express();
// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'dist')));
var messages = [
  {
    id: 'm_1',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() - 99999
  }
  ,
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Seems like a pretty cool conference.',
    timestamp: Date.now() - 89999
  },
  {
    id: 'm_3',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Jing',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999
  },
  {
    id: 'm_4',
    threadID: 't_2',
    threadName: 'tang and Bill',
    authorName: 'Bill',
    text: '测试消息',
    timestamp: Date.now() - 88888
  }

];

var threadNameMap = (function () {
  var map = {};
  messages.forEach(function(){
  	 map[this.threadID] = this.threadName;
  });
 // messages.forEach(({threadID, threadName}) => {

 // });
  return map;
})();

/**
 * start Primus
 */
var server = http.createServer(app);
//var rtg = require('url').parse(process.env.REDISTOGO_URL || 'redis://localhost:6379');
//var redis = require('redis').createClient(rtg.port, rtg.hostname);

var io = require('socket.io')(server);
//var redis = require('socket.io-redis');
//io.adapter(redis({ host: rtg.hostname, port: rtg.port }));
var socketIdList = [];
io.on('connection', function(socket){
  socket.join('woot');
  io.clients(function(error, clients){
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  });
  socket.on('getAll', function(){
    io.emit('allMsg', messages);
  });

  socket.on('sendMsg', function(message){
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID;
    var createdMessage = {
      id,
      threadID,
      threadName: threadNameMap[threadID],
      authorName: message.authorName,
      text: message.text,
      timestamp
    };

    messages.push(createdMessage);
    //socket.to('/#fYZ0trfH2wvLBFpaAAAA').emit('allMsg', messages); // id
    io.to('woot').emit('allMsg', messages); // room
    //socket.emit('allMsg', messages); // 广播
  });

});

// start the server
server.listen(app.get('port'), function(error){
  if (error) {
    console.error(error)
  } else {
    console.log('Express server listening on port ' + app.get('port'));
  }
});
