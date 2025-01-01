import React from 'react';
import './CardEditor.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class CardEditor extends React.Component {
    // Define state to be passed to Parent cards Component in App.js
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            // For controlled inputs
            front: '',
            back: '',
            name: '',
        };
    }

    addCard = () => {
        if (this.state.front.trim() === '' || this.state.back.trim() === '') {
            alert("Yahoo!! Make sure the front and back of the card is filled out!")
            return;
        }
        // Copy old cards, concat new cards, reset cards variable with new set of cards
        const newCard = {front: this.state.front, back: this.state.back};
        const cards = this.state.cards.slice().concat(newCard);
        this.setState({cards, front: '', back: ''}); // Update state.cards, Reset input boxes
    }

    deleteCard = index => {
        const cards = this.state.cards.slice();
        // Remove 1 card at index; mutates cards in-place
        cards.splice(index, 1);
        this.setState({cards});
    }

    // Change this.state's front or back value in real-time as user types
    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    createDeck = () => {
        const deckID = this.props.firebase.push('/flashcards').key;
        const newDeck = {cards: this.state.cards, name: this.state.name};
        const onComplete = () => {
            console.log('database updated!');
            // Redirect user after database is updated
            this.props.history.push(`/viewer/${deckID}`)
        };
        // Simulataneously perform all of these updates
        const updates = {};
        // These paths are the paths of Firebase's database
        updates[`/flashcards/${deckID}`] = newDeck;
        updates[`/homepage/${deckID}`] = {name: this.state.name};
        // Update to Real Time Firebase Database!!
        // Parameters: route, object or dictionary, callback function
        this.props.firebase.update('/', updates, onComplete);
        this.setState({cards: [], front: '', back: '', name: ''});
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return(
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick={() => this.deleteCard(index)}> Delete Card</button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Card Editor</h2>
                <div>
                    Deck Name: 
                    <input 
                        name='name'
                        placeholder='Name of Deck' 
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div> 
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards}
                    </tbody>
                </table>

                <br/>
                <input 
                    name='front'
                    placeholder='Front of Card' 
                    value={this.state.front}
                    onChange={this.handleChange}
                />
                <input 
                    name='back'
                    placeholder='Back of Card' 
                    value={this.state.back}
                    onChange={this.handleChange}
                />
                <button onClick={this.addCard}>Add Card</button>
                <hr/>
                <div>
                    <button
                        disabled={!this.state.name.trim || this.state.cards.length === 0}
                        onClick={this.createDeck}
                    >
                        Create Deck 
                    </button>
                </div>
                <br />
                <Link to='/'>Homepage</Link>
            </div>
        );
    }
}

export default compose(firebaseConnect(), withRouter)(CardEditor);