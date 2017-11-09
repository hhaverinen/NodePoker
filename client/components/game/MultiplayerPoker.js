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
    this.state = {
      dealDisabled: false,
      changeDisabled : true,
      cards: [],
      otherPlayers: [],
      message: '',
      winner: ''
    };
  }

  componentWillMount() {
    this.socket = socket.connect('/multiplayer-poker-game', {query: `name=${this.props.name}`});
  }

  componentDidMount() {
    this.socket.on('start', (hand) => {
      this.setState({
        cards: hand,
        changeDisabled: false,
        dealDisabled: true,
        message: '',
        winner: ''
      });
    });

    this.socket.on('change', (hand) => {
      this.setState({cards: hand});
    });

    this.socket.on('result', (winner) => {
      this.setState({dealDisabled: false, changeDisabled: true, message: '', winner: winner});
    });

    this.socket.on('updateplayers', players => {
      this.setState({otherPlayers: players});
    });

    this.socket.on('message', msg => {
      this.setState({message: msg})
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  deal() {
    this.socket.emit('start');
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
            {this.state.winner && <div>{`Winner is ${this.state.winner.name} with ${this.state.winner.ranking.name}!`}</div>}
            {this.state.message && <div>{this.state.message} <img src="./assets/images/ajax-loader.gif"/></div>}
            <div className="own-hand-area">
              <Hand cards={this.state.cards} handleCardSelect={this.handleCardSelect}/>
              <button onClick={this.deal} type="button" disabled={this.state.dealDisabled}>Ready!</button>
              <button onClick={this.change} type="button" disabled={this.state.changeDisabled}>Change cards!</button>
              <div className="player-name">{`Your name: ${this.props.name}`}</div>
            </div>
           </div>;
  }
}

module.exports = MultiplayerPoker;
