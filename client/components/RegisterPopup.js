const React = require('react');

class RegisterPopup extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name : '' };
  }

  handleChange(event) {
    this.setState({name : event.target.value})
  }

  submit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.socket.emit('register', this.state.name)
    }
  }

  render() {
    return <div className="popup-overlay">
            <form onSubmit={this.submit} className="name-form">
             <div>Welcome to NodePoker site! Please fill your name below and you are ready to play!</div>
             <input type="text" placeholder="Donald Duck" value={this.state.name} onChange={this.handleChange}></input>
             <input type="submit" value="Start playing!" />
            </form>
           </div>;
  }
}

module.exports = RegisterPopup;
