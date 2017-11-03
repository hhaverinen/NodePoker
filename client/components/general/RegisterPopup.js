const React = require('react');

class RegisterPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name : '' };
  }

  handleChange(event) {
    this.setState({name : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.socket.emit('register', this.state.name);
    }
  }

  componentDidMount() {
    document.getElementById("name-field").focus();
  }

  render() {
    return <div className="popup-overlay">
            <form onSubmit={this.handleSubmit} className="name-form">
             <div>Welcome to NodePoker site! Please fill your name below and you are ready to play!</div>
             <input id="name-field" type="text" placeholder="Donald Duck" value={this.state.name} onChange={this.handleChange}></input>
             <input type="submit" value="Start playing!" />
            </form>
           </div>;
  }
}

module.exports = RegisterPopup;
