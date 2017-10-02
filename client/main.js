const io = require('socket.io-client');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');

const Card = require('./components/Card.js');

const socket = io();

$('#deal').on('click', function() {
  socket.emit('deal');
  console.log("deal clicked!");
});

socket.on('deal', function(hand) {
  $.each(hand, function(index, value) {
    $('#hand-placeholder').append($('<li>').text(value.suit + ':' + value.rank));
  });
});

ReactDOM.render(<Card name="Henri"/>, document.getElementById('test'));
