const FbConnection = require('../../../common/fb-connection');
const fbConnection = FbConnection.getInstance();

module.exports = (socket) => {
  socket.on('request_cars_data', () => {
    const query = fbConnection.dbRef.child('cars');
    query.on('child_added', (data) => {
      socket.emit('car_added', data);
    });
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected');
  })
}