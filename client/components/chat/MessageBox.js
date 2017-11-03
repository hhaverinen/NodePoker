const React = require('react');

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { message: '' };
  }

  handleChange(event) {
    this.setState({message : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message) {
      this.props.onMessageSubmit(this.state.message);
      this.setState({message: ''});
    }
  }

  render() {
    return <form className="messagebox" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Type your message here..." value={this.state.message} onChange={this.handleChange} />
            <input type="submit" value="Send!" />
           </form>;
  }
}

module.exports = MessageBox;
