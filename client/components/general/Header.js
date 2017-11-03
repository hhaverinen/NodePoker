const React = require('react');

class Header extends React.Component {
  isMenuOpen() {
    return (this.props.menuOpen) ? 'menu-open' : 'menu-closed';
  }

  isChatOpen() {
    return (this.props.chatOpen) ? 'chat-open' : 'chat-closed';
  }

  render() {
    return <header>
            <div className="menu-button-wrapper">
              <div className={`menu-button ${this.isMenuOpen()}`} onClick={this.props.handleMenuClick}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </div>
            <div className="title">NodePoker</div>
            <div className="chat-button-wrapper">
              <div className={`chat-button ${this.isChatOpen()}`} onClick={this.props.handleChatClick}>
                <div className="chat-icon">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
           </header>;
  }
}

module.exports = Header;
