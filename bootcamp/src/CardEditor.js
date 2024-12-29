import React from 'react';
import './CardEditor.css';
import {Link} from 'react-router-dom';

class CardEditor extends React.Component {
    // Define state to be passed to Parent cards Component in App.js
    constructor(props) {
        super(props);
        this.state = {front: '', back: ''};
    }

    addCard = () => {
        if (this.state.front.trim() === '' || this.state.back.trim() === '') {
            alert("Yahoo!! Make sure the front and back of the card is filled out!")
        }
        else {
            this.props.addCard(this.state);
        }
        this.setState({front: '', back: ''}); // Reset input boxes
    }
    
    deleteCard = index => {
        this.props.deleteCard(index);
    }

    // Change this.state's front or back value in real-time as user types
    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    render() {
        const cards = this.props.cards.map((card, index) => {
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
                <Link to='/viewer'>Go to Card Viewer</Link>
            </div>
        );
    }
}

export default CardEditor;