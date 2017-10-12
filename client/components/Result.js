const React = require('react');

class Result extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props.result)}</div>;
  }
}

module.exports = Result;
