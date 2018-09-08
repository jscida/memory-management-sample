const socketsCount = process.env.SOCKETS_COUNT || 1;

for(let i = 0; i < socketsCount; i++) {
  const socket = require('socket.io-client')('http://localhost:8080');
  socket.on('car_added', (data) => {
    console.log('car_added_event');
    console.log(data);
  });
  socket.emit('request_cars_data');
}
