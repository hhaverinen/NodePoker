const React = require('react');
const $ = require('jquery');
const ReactDOM = require('react-dom');
const Hand = require('./Hand.js');
const socket = require('socket.io-client')();

class HandArea extends React.Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);
    this.change = this.change.bind(this);
  }

  deal() {
    socket.emit('deal');
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
            <div id="hand-placeholder"></div>
            <button onClick={this.deal} type="button">Uusi peli!</button>
            <button onClick={this.change} type="button">Vaihda valitut kortit!</button>
           </div>;
  }
}

socket.on('deal', function(hand) {
  ReactDOM.render(<Hand cards={hand} />, document.getElementById('hand-placeholder'));
});

module.exports = HandArea;
