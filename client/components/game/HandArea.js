const React = require('react');
const Hand = require('./Hand.js');
const ResultTable = require('./ResultTable.js')

class HandArea extends React.Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);
    this.change = this.change.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.state = {changeDisabled : true, dealDisabled: false, cards: []};
  }

  componentDidMount() {
    this.props.socket.on('deal', this.onDeal = (hand) => {
      this.setState({cards: hand});
    });
  }

  componentWillUnmount() {
    this.props.socket.removeListener('deal', this.ondeal);
  }

  deal() {
    this.props.socket.emit('deal');
    this.setState({changeDisabled : false, dealDisabled: true});
  }

  change() {
    let cards = this.state.cards.filter(card => card.selected);
    this.props.socket.emit('change', cards);

/*
    let elements = $('.card.selected');

    // if no cards selected, emit the 'change' event immediately
    if (elements.length === 0) {
      this.props.socket.emit('change', cards);
    } else {
      // add binding to last element: when transition is completed, emit the 'change' event to server
      elements.last().one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", () => {

      });

      elements.each(function(i) {
        $(this).children('.card-image').addClass('flipped');
      });
    }
*/
    this.setState({changeDisabled : true, dealDisabled: false});
  }

  handleCardSelect(card) {
    let cards = this.state.cards;
    let ind = cards.findIndex(el => el.rank === card.rank && el.suit === card.suit);
    cards[ind].selected = (cards[ind].selected) ? false : true;
    this.setState({cards: cards});
  }

  render() {
    return <div className="hand-area">
            <Hand cards={this.state.cards} handleCardSelect={this.handleCardSelect}/>
            <button onClick={this.deal} type="button" disabled={this.state.dealDisabled}>New game!</button>
            <button onClick={this.change} type="button" disabled={this.state.changeDisabled}>Change cards!</button>
           </div>;
  }
}

module.exports = HandArea;
