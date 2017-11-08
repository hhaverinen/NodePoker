const React = require('react');
const ResultTable = require('./ResultTable.js');
const Hand = require('./Hand.js');
const socket = require('socket.io-client');

class SoloPoker extends React.Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);
    this.change = this.change.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.state = {changeDisabled : true, dealDisabled: false, cards: [], winninghand: -1};
  }

  componentWillMount() {
    this.socket = socket.connect('/solo-poker-game');
  }

  componentDidMount() {
    this.socket.on('deal', (hand) => {
      this.setState({winninghand: -1, cards: hand, changeDisabled: false});
    });

    this.socket.on('change', (hand) => {
      this.setState({cards: hand});
    })

    this.socket.on('result', (result) => {
      this.setState({winninghand: result.value, dealDisabled: false});
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  deal() {
    this.socket.emit('deal');
    this.setState({dealDisabled: true});
  }

  change() {
    let cards = this.state.cards.filter(card => card.selected);
    this.socket.emit('change', cards);
    this.setState({changeDisabled : true});
  }

  handleCardSelect(card) {
    let cards = this.state.cards;
    let ind = cards.findIndex(el => el.rank === card.rank && el.suit === card.suit);
    cards[ind].selected = (cards[ind].selected) ? false : true;
    this.setState({cards: cards});
  }

  render() {
    return <div className="solo-poker-area">
            <ResultTable winninghand={this.state.winninghand} />
            <Hand cards={this.state.cards} handleCardSelect={this.handleCardSelect}/>
            <button onClick={this.deal} type="button" disabled={this.state.dealDisabled}>New game!</button>
            <button onClick={this.change} type="button" disabled={this.state.changeDisabled}>Change cards!</button>
           </div>;
  }
}

module.exports = SoloPoker;
