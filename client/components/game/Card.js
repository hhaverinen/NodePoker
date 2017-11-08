const React = require('react');

class Card extends React.Component {
  isSelected() {
    return (this.props.card.selected) ? ' selected' : '';
  }

  render() {
    // TODO: more elegant way to determine correct image (+ jokers doesn't work currently)
    const imgName = this.props.card.suit + (this.props.card.rank >= 10 ? this.props.card.rank : '0' + this.props.card.rank) + '.bmp';
    return <div className={"card " + this.isSelected()} onClick={this.props.handleCardSelect ? () => this.props.handleCardSelect(this.props.card) : null} >
               <div className="card-image">
                  <img className="front" src={`./assets/images/cards/${imgName}`} />
                  <img className="back" src="./assets/images/cards/b1fv.bmp" />
               </div>
             </div>
  }
}

module.exports = Card;
