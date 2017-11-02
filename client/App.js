const React = require('react');
const Header = require('./components/Header.js');
const HandArea = require('./components/HandArea.js');
const RegisterPopup = require('./components/RegisterPopup.js');
const socket = require('socket.io-client')();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registered: false, name: name };
  }

  componentDidMount() {
    socket.on('registered', (name) => {
      this.setState({registered: true, name: name});
    });
  }

  render() {
    return <div><Header />{this.state.registered ? <HandArea socket={socket} /> : <RegisterPopup socket={socket} />} </div>;
  }
}

module.exports = App;
