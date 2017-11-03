const React = require('react');
const HandArea = require('./HandArea.js');
const MultiplayerPokerTable = require('./MultiplayerPokerTable');

class MultiplayerPoker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="multiplayer-area">
            <MultiplayerPokerTable />
            <HandArea socket={this.props.socket} />
           </div>;
  }
}

module.exports = MultiplayerPoker;
