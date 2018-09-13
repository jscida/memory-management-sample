const heapdump = require('heapdump');
const io = require('socket.io')(8080);
const FbConnection = require('./fb-connection');
const fbConnection = FbConnection.getInstance();

let counter = 0;

console.log('Socket server listening on port 8080');

setInterval(() => {
  console.log(counter + ' sockets connected');
  const fileName = './dumps/' + Date.now() + '-' + counter + 'sockets.heapsnapshot';
  heapdump.writeSnapshot(fileName, (err, fileName) => {
    console.log(fileName + ' created.');
  })
}, 30000);

io.on('connection', (socket) => {
  counter++;
  console.log(socket.id + ' connected');
  handleSocket(socket);
});

const handleSocket = (socket) => {
  socket.on('request_cars_data', () => {
    const query = fbConnection.dbRef.child('cars');
    query.on('child_added', (data) => {
      socket.emit('car_added', data);
    });
  });

  socket.on('disconnect', () => {
    counter--;
    console.log(socket.id + ' disconnected');
  })
}

