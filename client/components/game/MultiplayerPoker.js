const React = require('react');
const Hand = require('./Hand.js');
const MultiplayerPokerTable = require('./MultiplayerPokerTable');
const socket = require('socket.io-client');

class MultiplayerPoker extends React.Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);
    this.change = this.change.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
    let mockCards =  [{ suit: 'c', rank: 3 },{ suit: 'h', rank: 10 },{ suit: 'd', rank: 5 },{ suit: 'h', rank: 5 },{ suit: 'c', rank: 8 }];
    this.state = {
      dealDisabled: false,
      changeDisabled : true,
      cards: [],
      otherPlayers: [],
      waiting: ''
    };
  }

  componentWillMount() {
    this.socket = socket.connect('/multiplayer-poker-game');
  }

  componentDidMount() {
    this.socket.on('deal', (hand) => {
      this.setState({cards: hand, changeDisabled: false, waiting: '', playerOneCards: [], playerTwoCards: [], playerThreeCards: []});
    });

    this.socket.on('change', (hand) => {
      this.setState({cards: hand});
    });

    this.socket.on('result', () => {
      this.setState({dealDisabled: false, waiting: ''});
    });

    this.socket.on('updateplayers', players => {
      this.setState({otherPlayers: players});
    });

    this.socket.on('waiting', msg => {
      this.setState({waiting: msg})
    })
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
    return <div className="multiplayer-poker-area">
            <MultiplayerPokerTable players={this.state.otherPlayers} />
            <div>{this.state.waiting}</div>
            <Hand cards={this.state.cards} handleCardSelect={this.handleCardSelect}/>
            <button onClick={this.deal} type="button" disabled={this.state.dealDisabled}>Ready!</button>
            <button onClick={this.change} type="button" disabled={this.state.changeDisabled}>Change cards!</button>
           </div>;
  }
}

module.exports = MultiplayerPoker;
