const React = require('react');
const $ = require('jquery');
const ReactDOM = require('react-dom');
const Hand = require('./Hand.js');
const Result = require('./Result.js')
const socket = require('socket.io-client')();

class HandArea extends React.Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);
    this.change = this.change.bind(this);
  }

  deal() {
    socket.emit('deal');
    ReactDOM.render(<Result />, document.getElementById('result'));
  }

  change() {
    let cards = [];
    let elements = $('.card.selected');
    // add binding to last element: when transition is completed, emit the 'change' event to server
    elements.last().one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
        socket.emit('change', cards);
    });

    elements.each(function(i) {
      cards.push($(this).data('json'));
      $(this).children('.card-image').addClass('flipped');
    });
  }

  render() {
    return <div className="hand-area">
            <div id="result"></div>
            <div id="hand-placeholder"></div>
            <button onClick={this.deal} type="button">Uusi peli!</button>
            <button onClick={this.change} type="button">Vaihda valitut kortit!</button>
           </div>;
  }
}

socket.on('deal', function(hand) {
  ReactDOM.render(<Hand cards={hand} />, document.getElementById('hand-placeholder'));
});

socket.on('result', function(result) {
  ReactDOM.render(<Result result={result} />, document.getElementById('result'));
})

module.exports = HandArea;
