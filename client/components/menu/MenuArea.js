const React = require('react');
const MenuRow = require('./MenuRow.js');

class MenuArea extends React.Component {
  constructor(props) {
    super(props);
  }

  isOpen() {
    return (this.props.menuOpen) ? 'menu-open' : 'menu-closed';
  }

  render() {
    return <div className={`menu-area ${this.isOpen()}`}>
            <MenuRow name="Solo poker" handleClick={null} />
            <MenuRow name="Multiplayer poker" handleClick={null} />
           </div>;
  }
}

module.exports = MenuArea;
