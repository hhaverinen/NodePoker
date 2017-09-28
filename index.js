const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const port = process.env.PORT || 3000

// static files
app.use(express.static(path.join(__dirname, 'client')))

io.on('connection', function(socket) {
  console.log('user connected!')
  socket.on('disconnect', function() {
    console.log('user disconnected!')
  })
})

// start server
server.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
