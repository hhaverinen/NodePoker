const React = require('react');
const Header = require('./components/general/Header.js');
const RegisterPopup = require('./components/general/RegisterPopup.js');
const ChatArea = require('./components/chat/ChatArea.js');
const MenuArea = require('./components/menu/MenuArea.js');
const SoloPoker = require('./components/game/SoloPoker.js');
const MultiplayerPoker = require('./components/game/MultiplayerPoker.js');
const chatSocket = require('socket.io-client').connect('/chat');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.state = { registered: true, name: '', chatOpen: false, menuOpen: false, game: 1 };
  }

  componentDidMount() {
    /*gameSocket.on('registered', (name) => {
      this.setState({registered: true, name: name});
    });*/
  }

  handleMenuClick() {
    this.setState({menuOpen: !this.state.menuOpen });
  }

  handleChatClick() {
    this.setState({chatOpen: !this.state.chatOpen });
  }

  handleMenuItemClick(gameId) {
    this.setState({game: gameId});
  }

  render() {
    let game;
    switch (this.state.game) {
      case 1: game = <SoloPoker />; break;
      case 2: game = <MultiplayerPoker />; break;
      default: game = <SoloPoker />; break;
    }

    return <div><Header handleMenuClick={this.handleMenuClick} handleChatClick={this.handleChatClick}
                  menuOpen={this.state.menuOpen} chatOpen={this.state.chatOpen}/>
            {this.state.registered ?
              <div>
                <MenuArea menuOpen={this.state.menuOpen} handleMenuItemClick={this.handleMenuItemClick}/>
                {game}
                <ChatArea socket={chatSocket} name={this.state.name} chatOpen={this.state.chatOpen}/>
              </div> :
              <RegisterPopup />
            }
           </div>;
  }
}

module.exports = App;
