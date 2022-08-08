import { useEffect, useState } from "react"
import { Portal } from "../portal/portal"
import cardback from "../../assets/images/card.png"
import heart from "../../assets/images/heart.png"
import clubs from "../../assets/images/clubs.png"
import diamond from "../../assets/images/diamond.png"
import cherry from "../../assets/images/cherry.png"
import square from "../../assets/images/square.png"
import spades from "../../assets/images/spades.png"
import "./style.css"

// this array is holding game's images
const cardImages = [
    { "src": heart, matched: false },
    { "src": clubs, matched: false },
    { "src": diamond, matched: false },
    { "src": cherry, matched: false },
    { "src": square, matched: false },
    { "src": spades, matched: false }
];

// game's initial state
const initialState = {
    // this is card array
    cards: [],
    // how many cards did we turn
    turns: 0,
    // we choose two cards to compare
    choiceOne: null,
    choiceTwo: null,
    // do not select more than two cards at once
    disabled: false,
    //how many correct
    correct: 0
}

export function Memorygame() {
    const [state, setState] = useState({ ...initialState });

    const { cards, turns, choiceOne, choiceTwo, disabled, correct } = state;
    //show portal
    let [showPortal, setShowPortal] = useState(true);

    // when we click on the reset button cards changes their place
    useEffect(() => {
        shuffleCards();
    }, []);

    // if we select two similar card, they will not turn back, otherwise they will turn back 
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setState(prev => ({ ...prev, disabled: true }));
            if (choiceOne.src === choiceTwo.src) {
                choiceOne.matched = true;
                choiceTwo.matched = true;
                setState(prev => ({
                    ...prev,
                    cards: [...prev.cards],
                    correct: prev.correct + 1
                }), resetTurn())
            } else {
                setTimeout(() => { resetTurn() }, 1000);
            }
        }

    }, [choiceOne, choiceTwo])

    // this function changes place of the card when we click on the reset button
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - .5)
            .map((card) => ({ ...card, id: Math.random() }));

        setState({ ...initialState, cards: shuffleCards });
    }

    // to pick the first or second card
    const handleClick = (card) => {
        if (!disabled) {
            choiceOne ? setState(prev => ({ ...prev, choiceTwo: card }))
                : setState(prev => ({ ...prev, choiceOne: card }));
        }
    }

    // this function updates the turn number
    const resetTurn = () => {
        setState(prev =>
        ({
            ...prev,
            choiceOne: null,
            choiceTwo: null,
            turns: prev.turns + 1,
            disabled: false,
        }));
        setShowPortal(true);

    }

    // change portal stuation
    const handlePortal = () => {
        setShowPortal(false);
    }

    return (
        <div className="container memory">
            <p>Match the Cards</p>
            <div className="card-grid">
                {
                    // render the cards
                    cards.map((card) => (
                        <div
                            className="cards"
                            key={card.id}
                        >
                            <div
                                className={
                                    card === choiceOne || card === choiceTwo || card.matched ?
                                        "flipped" :
                                        ""
                                }
                            >
                                <img
                                    className="front"
                                    src={card.src}
                                    alt="card front"
                                />
                                
                                <img
                                    className="back"
                                    src={cardback} alt="card back"
                                    onClick={() => handleClick(card)}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
            <p>Turns: {turns}</p>
            <button className="select-btn" onClick={shuffleCards}> Reset</button>

            {
                correct === 6 && showPortal ?
                    <Portal
                        handlePortal={handlePortal}
                    >
                        <p>Congratulations</p>
                        {<p>Your Score: {turns}</p>}
                    </Portal> :
                    null
            }
        </div>
    )
}