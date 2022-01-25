const status = require('./status');

module.exports = (io) => {
  io.on('connection', (socket) => {
    status(io, socket);
  });
};
