const React = require('react');
const Header = require('./components/general/Header.js');
const HandArea = require('./components/game/HandArea.js');
const RegisterPopup = require('./components/general/RegisterPopup.js');
const ChatArea = require('./components/chat/ChatArea.js');
const MenuArea = require('./components/menu/MenuArea.js');
const gameSocket = require('socket.io-client').connect('/game');
const chatSocket = require('socket.io-client').connect('/chat');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = { registered: false, name: name, chatOpen: false, menuOpen: false };
  }

  componentDidMount() {
    gameSocket.on('registered', (name) => {
      this.setState({registered: true, name: name});
    });
  }

  handleMenuClick() {
    this.setState({menuOpen: !this.state.menuOpen });
  }

  handleChatClick() {
    this.setState({chatOpen: !this.state.chatOpen });
  }

  render() {
    return <div><Header handleMenuClick={this.handleMenuClick} handleChatClick={this.handleChatClick}
                  menuOpen={this.state.menuOpen} chatOpen={this.state.chatOpen}/>
            {this.state.registered ?
              <div>
                <MenuArea menuOpen={this.state.menuOpen}/>
                <HandArea socket={gameSocket} />
                <ChatArea socket={chatSocket} name={this.state.name} chatOpen={this.state.chatOpen}/>
              </div> :
              <RegisterPopup socket={gameSocket} />
            }
           </div>;
  }
}

module.exports = App;
