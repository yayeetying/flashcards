import React from "react";
import './CardViewer.css';

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
        const { cards, switchMode } = this.props;
        const { currentCardIndex, cardSide } = this.state;
        const currentCard = cards[currentCardIndex];

        if (this.props.cards.length <= 0){
            return (
                <div>
                    <h2>Card Viewer</h2>
                    <h4> Go add some cards first though...</h4>
                    <hr/>
                    <button onClick={switchMode}>Go to Card Editor</button>
                </div>
            );
        }

        return (
            <div>
                <h2>Card Viewer</h2>
                <hr/>
                <div class='prettycenter'>
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
                <button onClick={switchMode}>Go to Card Editor</button>
            </div>
        );
    }
}

export default CardViewer;
