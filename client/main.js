const io = require('socket.io-client');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');

const Hand = require('./components/Hand.js');

const socket = io();

$('#deal').on('click', function() {
  socket.emit('deal');
});

$('#change').on('click', function() {
  let cards = [];
  $('.selected').each(function(i) {
    cards.push($(this).data('json'));
  });
  socket.emit('change', cards);
});

socket.on('deal', function(hand) {
  ReactDOM.render(<Hand cards={hand} />, document.getElementById('hand-placeholder'));
});
