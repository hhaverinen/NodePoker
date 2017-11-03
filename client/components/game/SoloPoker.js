const React = require('react');
const ResultTable = require('./ResultTable.js');
const HandArea = require('./HandArea.js');

class SoloPoker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {winninghand: -1};
  }

  componentDidMount() {
    this.props.socket.on('deal', (hand) => {
      this.setState({winninghand: -1});
    });

    this.props.socket.on('result', (result) => {
      this.setState({winninghand: result.value});
    });
  }

  render() {
    return <div className="solopoker-area">
            <ResultTable winninghand={this.state.winninghand} />
            <HandArea socket={this.props.socket} />
           </div>;
  }
}

module.exports = SoloPoker;
