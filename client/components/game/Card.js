const React = require('react');

class Card extends React.Component {
  isSelected() {
    return (this.props.card.selected) ? ' selected' : '';
  }

  isFlipped() {
    return (this.props.card.flipped) ? ' flipped' : '';
  }

  render() {
    // TODO: more elegant way to determine correct image (+ jokers doesn't work currently)
    // TODO: when rank == 0, then blank card should be shown. Flipped-class should be used instead for showing back of the card.
    // when it's time to show everyone's card, then data is changed and flipped class removed so we get nice flip animation which is already implemented
    const imgName = (this.props.card.rank === 0) ? 'b1fv.bmp': this.props.card.suit + (this.props.card.rank >= 10 ? this.props.card.rank : '0' + this.props.card.rank) + '.bmp';

    return <div className={`card ${this.isSelected()} ${this.isFlipped()}`} onClick={this.props.handleCardSelect ? () => this.props.handleCardSelect(this.props.card) : null} >
               <div className="card-image">
                  <img className="front" src={`./assets/images/cards/${imgName}`} />
                  <img className="back" src="./assets/images/cards/b1fv.bmp" />
               </div>
             </div>
  }
}

module.exports = Card;
