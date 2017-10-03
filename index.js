const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const port = process.env.PORT || 3000;
const gameserver = require('./server/gameserver.js').listen(server);

// static files
app.use(express.static(path.join(__dirname, 'client')));

// start server
server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
