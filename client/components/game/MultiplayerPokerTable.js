const React = require('react');
const Hand = require('./Hand.js');

class MultiplayerPokerTable extends React.Component {
  render() {
    return <div className="multiplayer-poker-table">
            {this.props.players[0] ?
              <div className="player-one">
                <span>{this.props.players[0].name}</span>
                <Hand cards={this.props.players[0].hand} />
              </div>
            : ''}
            {this.props.players[1] ?
              <div className="player-two">
                <span>{this.props.players[1].name}</span>
                <Hand cards={this.props.players[1].hand} />
              </div>
            : ''}
            {this.props.players[2] ?
              <div className="player-three" >
                <span>{this.props.players[1].name}</span>
                <Hand cards={this.props.players[2].hand} />
              </div>
            : ''}
           </div>;
  }
}

module.exports = MultiplayerPokerTable;
