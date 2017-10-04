const React = require('react');
const Header = require('./components/Header.js');
const HandArea = require('./components/HandArea.js');

class App extends React.Component {
  render() {
    return <div><Header /><HandArea /></div>;
  }
}

module.exports = App;
