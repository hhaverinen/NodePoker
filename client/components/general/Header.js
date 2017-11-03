const React = require('react');
const $ = require('jquery');

class Header extends React.Component {
  render() {
    return <header>
            <div className="menu-button"><span>Show/hide menu</span></div>
            <div className="title">NodePoker</div>
            <div className="chat-button"><span onClick={this.props.handleChatClick}>Show/Hide chat</span></div>
           </header>;
  }
}

module.exports = Header;
