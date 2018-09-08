const heapdump = require('heapdump');
const io = require('socket.io')(8080);
const FbConnection = require('../../../common/fb-connection');
const fbConnection = FbConnection.getInstance();

let counter = 0;

console.log('Socket server listening on port 8080');

setInterval(() => {
  console.log(counter + ' sockets connected');
  const fileName = './dumps/' + Date.now() + '-' + counter + 'sockets.heapsnapshot';
  heapdump.writeSnapshot(fileName, (_err, fileName) => {
    console.log(fileName + ' created.');
  })
}, 30000);

io.on('connection', (socket) => {
  counter++;
  console.log(socket.id + ' connected');
  handleSocket(socket);
});

const handleSocket = (socket) => {
  let eventRef;
  socket.on('request_cars_data', () => {
    eventRef = fbConnection.on('cars', 'child_added', (data) => {
      socket.emit('car_added', data);
    });
  });

  socket.on('disconnect', () => {
    counter--;
    console.log(socket.id + ' disconnected');
    fbConnection.off(eventRef);
  })
}

