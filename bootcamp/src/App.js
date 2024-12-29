import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import {Switch, Route} from 'react-router-dom';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cards: [] // Empty set of cards for now
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

  render() {
    return(
      <Switch>
        <Route exact path='/'>
          <Homepage/>
        </Route>
        <Route exact path='/editor'>
          <CardEditor 
            addCard={this.addCard} 
            deleteCard={this.deleteCard}
            cards={this.state.cards}
          />
        </Route>
        <Route exact path='/viewer'>
          <CardViewer 
            cards={this.state.cards}
          />
        </Route>
      </Switch>
    )
  }
}

export default App;
