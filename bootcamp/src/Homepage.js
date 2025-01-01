import React from 'react';
import {Link} from 'react-router-dom';

class Homepage extends React.Component {
    render() {
        return (
            <div>
                <h2> Homepage to Flashcards </h2>
                <hr/> <br />
                <Link to='/editor'>Create a new card deck!</Link>
                <br/> 
                <h3> Flashcards </h3>
                <Link to='/viewer'>Go to Card Viewer</Link>
            </div>
        );
    }
}

export default Homepage;