const React = require('react');

class RegisterPopup extends React.Component {
  componentDidMount() {
    document.getElementById("name-field").focus();
  }

  render() {
    return <div className="popup-overlay">
            <form onSubmit={this.props.handleSubmit} className="name-form">
             <div>Welcome to NodePoker site! Please fill your name below and you are ready to play! (Max length 10 characters)</div>
             <input id="name-field" type="text" placeholder="Donald Duck" value={this.props.name} onChange={this.props.handleChange}></input>
             <input type="submit" value="Start playing!" />
            </form>
           </div>;
  }
}

module.exports = RegisterPopup;
