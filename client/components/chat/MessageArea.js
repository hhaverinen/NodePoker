const React = require('react');
const MessageRow = require('./MessageRow.js');

class MessageArea extends React.Component {
  render() {
    return <div className="message-area">
            {
              this.props.messages.map((item) => (
                <MessageRow name={item.name} message={item.message} key={item.id} />
              ))
            }
           </div>;
  }
}

module.exports = MessageArea;
