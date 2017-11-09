const React = require('react');
const Header = require('./components/general/Header.js');
const RegisterPopup = require('./components/general/RegisterPopup.js');
const ChatArea = require('./components/chat/ChatArea.js');
const MenuArea = require('./components/menu/MenuArea.js');
const SoloPoker = require('./components/game/SoloPoker.js');
const MultiplayerPoker = require('./components/game/MultiplayerPoker.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handlePopupNameChange = this.handlePopupNameChange.bind(this);
    this.handlePopupNameSubmit = this.handlePopupNameSubmit.bind(this);
    this.state = { registered: true, name: '', chatOpen: false, menuOpen: false, game: 2 };
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

  handlePopupNameChange(event) {
    if(event.target.value.length <= 10) {
      this.setState({name : event.target.value});
    }
  }

  handlePopupNameSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.setState({registered: true});
    }
  }

  render() {
    let game;
    switch (this.state.game) {
      case 1: game = <SoloPoker />; break;
      case 2: game = <MultiplayerPoker name={this.state.name}/>; break;
      default: game = <SoloPoker />; break;
    }

    return <div><Header handleMenuClick={this.handleMenuClick} handleChatClick={this.handleChatClick}
                  menuOpen={this.state.menuOpen} chatOpen={this.state.chatOpen}/>
            {this.state.registered ?
              <div className="content-container">
                <MenuArea menuOpen={this.state.menuOpen} handleMenuItemClick={this.handleMenuItemClick}/>
                <div className="main-content">{game}</div>
                <ChatArea name={this.state.name} chatOpen={this.state.chatOpen}/>
              </div> :
              <RegisterPopup name={this.state.name} handleSubmit={this.handlePopupNameSubmit} handleChange={this.handlePopupNameChange} />
            }
           </div>;
  }
}

module.exports = App;
