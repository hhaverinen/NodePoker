const React = require('react');

class MenuRow extends React.Component {
  render() {
    return <div className="menu-row" onClick={this.props.handleClick}>{this.props.name}</div>;
  }
}

module.exports = MenuRow;
