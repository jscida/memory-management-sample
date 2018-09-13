const socketsCount = process.env.SOCKETS_COUNT || 1;

for(let i = 0; i < socketsCount; i++) {
  const socket = require('socket.io-client')('http://localhost:8080');
  socket.on('car_added', (data) => {
    console.log(socket.id + ' car_added_event fired');
    console.log(socket.id + ' data: ' + data);
  });
  socket.emit('request_cars_data');
}
