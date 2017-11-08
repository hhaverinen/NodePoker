const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')();
const path = require('path');
const port = process.env.PORT || 3000;

require('./server/game/solo-poker-server.js').init(io);
require('./server/game/multiplayer-poker-server.js').init(io);
require('./server/chat/chatserver.js').init(io);

io.listen(server);

// static files
app.use(express.static(path.join(__dirname, 'client')));

// start server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
