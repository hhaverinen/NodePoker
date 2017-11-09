const React = require('react');
const MessageArea = require('./MessageArea.js');
const MessageBox = require('./MessageBox.js');
const socket = require('socket.io-client');

class ChatArea extends React.Component {
  constructor(props) {
    super(props);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.state = { messages: [] };
  }

  componentWillMount() {
    this.socket = socket.connect('/chat');
  }

  componentDidMount() {
    this.socket.on('message', (message) => {
      this.changeMessageState(message);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onMessageSubmit(message) {
    let data = {name: this.props.name, message: message}
    this.changeMessageState(data);
    this.socket.emit('message', data);
  }

  changeMessageState(message) {
    message['id'] = this.state.messages.length; // add id based on amount of messages
    this.setState({ messages: [...this.state.messages, message]});
  }

  isOpen() {
    return (this.props.chatOpen) ? 'chat-open' : 'chat-closed';
  }

  render() {
    return <div className={`chat-area ${this.isOpen()}`} >
            <MessageArea messages={this.state.messages} />
            <MessageBox onMessageSubmit={this.onMessageSubmit}/>
           </div>;
  }
}

module.exports = ChatArea;
