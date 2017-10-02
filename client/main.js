const io = require('socket.io-client');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');

const Hand = require('./components/Hand.js');

const socket = io();

$('#deal').on('click', function() {
  socket.emit('deal');
});

socket.on('deal', function(hand) {
  ReactDOM.render(<Hand cards={hand} />, document.getElementById('hand-placeholder'));
});
