const React = require('react');
const HandArea = require('./HandArea.js');
const MultiplayerPokerTable = require('./MultiplayerPokerTable');
const socket = require('socket.io-client');

class MultiplayerPoker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.socket = socket.connect('/game');
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }
  
  render() {
    return <div className="multiplayer-poker-area">
            <MultiplayerPokerTable />
            <HandArea socket={this.socket} />
           </div>;
  }
}

module.exports = MultiplayerPoker;
