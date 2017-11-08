const React = require('react');
const Card = require('./Card.js');

class MultiplayerPokerTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="multiplayer-poker-table">
            <div className="player-one">
              <Card card={{suit: 'd', rank: 1}}/>
              <Card card={{suit: 'd', rank: 1}}/>
              <Card card={{suit: 'd', rank: 1}}/>
              <Card card={{suit: 'd', rank: 1}}/>
              <Card card={{suit: 'd', rank: 1}}/>
            </div>
            <div className="player-two">
              <Card card={{suit: 'd', rank: 2}}/>
              <Card card={{suit: 'd', rank: 2}}/>
              <Card card={{suit: 'd', rank: 2}}/>
              <Card card={{suit: 'd', rank: 2}}/>
              <Card card={{suit: 'd', rank: 2}}/>
            </div>
            <div className="player-three" >
              <Card card={{suit: 'd', rank: 3}}/>
              <Card card={{suit: 'd', rank: 3}}/>
              <Card card={{suit: 'd', rank: 3}}/>
              <Card card={{suit: 'd', rank: 3}}/>
              <Card card={{suit: 'd', rank: 3}}/>
            </div>
           </div>;
  }
}

module.exports = MultiplayerPokerTable;
