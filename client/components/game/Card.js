const React = require('react');

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = { selected: false };
  }

  click() {
    this.setState({ selected: !this.state.selected });
  }

  isSelected() {
    return (this.state.selected) ? ' selected' : '';
  }

  render() {
    const json = {suit: this.props.suit, rank: this.props.rank};
    // TODO: more elegant way to determine correct image (+ jokers doesn't work currently)
    const imgName = this.props.suit + (this.props.rank >= 10 ? this.props.rank : '0' + this.props.rank) + '.bmp';
    return <div className={"card " + this.isSelected()} onClick={this.click} data-json={JSON.stringify(json)}>
             <div className="card-image">
                <img className="front" src={`./assets/images/cards/${imgName}`} />
                <img className="back" src="./assets/images/cards/b1fv.bmp" />
             </div>
           </div>;
  }
}

module.exports = Card;
