const React = require('react');

class MultiplayerPokerTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="multiplayer-poker-table">
            <div className="player-one" />
            <div className="player-two" />
            <div className="player-three" />
           </div>;
  }
}

module.exports = MultiplayerPokerTable;
 />
