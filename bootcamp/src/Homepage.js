import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from "redux";

class Homepage extends React.Component {
    render() {
        const { urls, decks } = this.props;

        if (!isLoaded(decks)) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2> Homepage to Flashcards </h2>
                <hr /> <br />
                <Link to='/editor'>Create a new card deck!</Link>
                <br />
                <h3> Flashcards </h3>
                <ul>
                    {urls.map((deckID) => (
                        <li key={deckID}>
                            <Link to={`/viewer/${deckID}`}>
                                {decks[deckID].name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStatetoProp = (state) => {
    // All of the Objects of homepage
    const decks = state.firebase.data.homepage || {};
    // Just the urls of those Objects
    const urls = Object.keys(decks);
    return { urls, decks };
};

export default compose(
    withRouter,
    firebaseConnect(() => {
        return [{ path: '/homepage/' }]; // Get the information from Firebase /homepage
    }),
    connect(mapStatetoProp)
)(Homepage);
