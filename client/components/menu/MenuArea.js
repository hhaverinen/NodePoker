const React = require('react');
const MenuRow = require('./MenuRow.js');

class MenuArea extends React.Component {
  isOpen() {
    return (this.props.menuOpen) ? 'menu-open' : 'menu-closed';
  }

  render() {
    return <div className={`menu-area ${this.isOpen()}`}>
            <MenuRow name="Solo poker" value={1} handleClick={this.props.handleMenuItemClick} />
            <MenuRow name="Multiplayer poker" value={2} handleClick={this.props.handleMenuItemClick} />
           </div>;
  }
}

module.exports = MenuArea;
