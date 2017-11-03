const React = require('react');
const ResultRow = require('./ResultRow.js');

class ResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.hands = [
      {name: "Five of a kind", value: 9},
      {name: "Straight flush", value: 8},
      {name: "Four of a kind", value: 7},
      {name: "Full house", value: 6},
      {name: "Flush", value: 5},
      {name: "Straight", value: 4},
      {name: "Three of a kind", value: 3},
      {name: "Two pair", value: 2},
      {name: "One pair", value: 1}
    ];
  }

  render() {
    const resultRows = [];
    this.hands.forEach((obj) => {
      resultRows.push(<ResultRow name={obj.name} value={obj.value} class={(obj.value === this.props.winninghand) ? 'winninghand' : '' }
        key={obj.value} />);
    });
    return <div className="result-table">{resultRows}</div>;
  }
}

module.exports = ResultTable;
