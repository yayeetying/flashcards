import React from "react";
import './CardViewer.css';
import { Link, withRouter } from 'react-router-dom';

import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from "redux";

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCardIndex: 0,
            cardSide: true // true for front card, false for back
        };
    }

    flipCard = () => {
        this.setState({cardSide: !this.state.cardSide});
    };

    handlePreviousCard = () => {
        this.setState((prevState) => {
            const nextIndex = prevState.currentCardIndex - 1
            if (nextIndex < 0) {
                return { currentCardIndex:prevState.currentCardIndex, cardSide:true } // Return same index
            }
            return { currentCardIndex: nextIndex, cardSide:true }; // Return index - 1
        });
    };

    handleNextCard = () => {
        this.setState((prevState) => {
            const nextIndex = prevState.currentCardIndex + 1
            if (nextIndex >= this.props.cards.length) {
                return { currentCardIndex:prevState.currentCardIndex, cardSide:true } // Return same index
            }
            return { currentCardIndex:nextIndex, cardSide:true }; // Return index + 1
        });
    };

    render() {
        if (!isLoaded(this.props.cards)){
            return <div>Loading...</div>
        }

        if (isEmpty(this.props.cards)){
            return <div>Page Not Found</div>
        }

        const { cards, name } = this.props;
        const { currentCardIndex, cardSide } = this.state;
        const currentCard = cards[currentCardIndex];

        return (
            <div>
                <h2>{name}</h2>
                <hr/>
                <div className='prettycenter'>
                    <h4>Progress</h4>
                    Card {currentCardIndex+1} / {cards.length}
                </div> <br/>
                <div id='cardInViewer' onClick={this.flipCard}>
                    {cardSide ? currentCard.front : currentCard.back}
                </div>
                <br/>
                <button onClick={this.handlePreviousCard}>Previous</button>
                <button onClick={this.handleNextCard}>Next</button>
                <br/><br/>
                <Link to='/'>Homepage</Link>
            </div>
        );
    }
}

const mapStatetoProp = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckID];
    // Short-circuiting in boolean expressions
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return {name: name, cards: cards};
}

// firebaseConnect: connects Firebase database with Redux global state
// connect: connects a React component with with the Redux store
export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckID = props.match.params.deckID;
        return [{path:`/flashcards/${deckID}`, storeAs: deckID}];
    }),
    connect(mapStatetoProp)
)(CardViewer);

