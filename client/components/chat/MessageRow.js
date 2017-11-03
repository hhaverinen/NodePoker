const React = require('react');

class MessageRow extends React.Component {

  render() {
    return <div className="message-row">
            <span className="sender">{`${this.props.name}: `}</span>
            <span className="message">{this.props.message}</span>
           </div>;
  }
}

module.exports = MessageRow;
