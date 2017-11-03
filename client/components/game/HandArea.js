const React = require('react');
const $ = require('jquery');
const ReactDOM = require('react-dom');
const Hand = require('./Hand.js');
const ResultTable = require('./ResultTable.js')

class HandArea extends React.Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);
    this.change = this.change.bind(this);
    this.state = {changeDisabled : true, dealDisabled: false};
  }

  componentDidMount() {
    this.props.socket.on('deal', (hand) => {
      ReactDOM.render(<Hand cards={hand} />, document.getElementById('hand-placeholder'));
    });
  }

  deal() {
    this.props.socket.emit('deal');
    this.setState({changeDisabled : false, dealDisabled: true});
  }

  change() {
    let cards = [];
    let elements = $('.card.selected');

    // if no cards selected, emit the 'change' event immediately
    if (elements.length === 0) {
      this.props.socket.emit('change', cards);
    } else {
      // add binding to last element: when transition is completed, emit the 'change' event to server
      elements.last().one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", () => {
          this.props.socket.emit('change', cards);
      });

      elements.each(function(i) {
        cards.push($(this).data('json'));
        $(this).children('.card-image').addClass('flipped');
      });
    }

    this.setState({changeDisabled : true, dealDisabled: false});
  }

  render() {
    return <div className="hand-area">
            <div id="result-area"><ResultTable socket={this.props.socket}/></div>
            <div id="hand-placeholder"></div>
            <button onClick={this.deal} type="button" disabled={this.state.dealDisabled}>New game!</button>
            <button onClick={this.change} type="button" disabled={this.state.changeDisabled}>Change cards!</button>
           </div>;
  }
}

module.exports = HandArea;
