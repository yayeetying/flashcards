import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'},
        {front: 'front2', back: 'back2'}
      ],
      editor: true,
    };
  }

  addCard = card => {
    // Copy old cards, concat new cards, reset cards variable with new set of cards
    const cards = this.state.cards.slice().concat(card);
    this.setState({cards});
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    // Remove 1 card at index; mutates cards in-place
    cards.splice(index, 1);
    this.setState({cards});
  }

  switchMode = () => this.setState({editor: !this.state.editor});

  render() {
    if (this.state.editor) {
      return (
        // addCard (the function) and cards are props sent to CardEditor
        <CardEditor 
          addCard={this.addCard} 
          deleteCard={this.deleteCard}
          cards={this.state.cards}
          switchMode={this.switchMode}
        />
      );
    }
    else {
      return (
        <CardViewer 
          switchMode={this.switchMode}
        />
      )
    }
  }
}

export default App;
