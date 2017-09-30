const io = require('socket.io-client');
const $ = require('jquery');

var socket = io();

$('#deal').on('click', function() {
  socket.emit('deal');
  console.log("deal clicked!");
});

socket.on('deal', function(hand) {
  $.each(hand, function(index, value) {
    $('#hand-placeholder').append($('<li>').text(value.suit + ':' + value.rank));
  });
});
