const React = require('react');
const ResultTable = require('./ResultTable.js');
const HandArea = require('./HandArea.js');
const socket = require('socket.io-client');

class SoloPoker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {winninghand: -1};
  }

  componentWillMount() {
    this.socket = socket.connect('/game');
  }

  componentDidMount() {
    this.socket.on('deal', (hand) => {
      this.setState({winninghand: -1});
    });

    this.socket.on('result', (result) => {
      this.setState({winninghand: result.value});
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return <div className="solo-poker-area">
            <ResultTable winninghand={this.state.winninghand} />
            <HandArea socket={this.socket} />
           </div>;
  }
}

module.exports = SoloPoker;
