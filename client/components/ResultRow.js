const React = require('react');

class ResultRow extends React.Component {
  render() {
    return <div className={"result-row " + this.props.class}>
            <span>{this.props.name}</span>
           </div>;
  }
}

module.exports = ResultRow;
