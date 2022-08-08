import { useState, useEffect } from "react"
import { Portal } from "../portal/portal"
import blue from "../../assets/sounds/blue.mp3"
import yellow from "../../assets/sounds/yellow.mp3"
import green from "../../assets/sounds/green.mp3"
import red from "../../assets/sounds/red.mp3"
import wrong from "../../assets/sounds/wrong.mp3"
import "./style.css"

// main colors
const colorList = ["green", "red", "yellow", "blue"];

// game's initial state
const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: []
}

export function Simon() {
    // start game
    const [start, setStart] = useState(false);
    // game's state
    const [play, setPlay] = useState(initPlay);
    //which color is showing now
    const [flash, setFlash] = useState(""); //green, red, blue, yellow
    // game is over?
    const [gameover, setGameover] = useState(false);
    //show portal
    let [showPortal, setShowPortal] = useState(true);

    // start to display when the game starts 
    useEffect(() => {
        if (start) {
            setPlay(prev => ({ ...prev, isDisplay: true }));
        }
    }, [start]);

    // select randomly which color is gonna show
    useEffect(
        () => {
            if (start && play.isDisplay) {
                let newColor = colorList[Math.floor(Math.random() * 4)];
                setPlay(prev => ({ ...prev, colors: [...prev.colors, newColor] }));
            }

        }, [start, play.isDisplay]);

    //show random color
    useEffect(() => {
        if (start && play.isDisplay && play.colors.length) {
            displayColors()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, play.isDisplay, play.colors.length]);

    // show randomly selected color and play sound
    async function displayColors() {
        // wait for a moment
        await new Promise((resolve) => setTimeout(resolve, 500));
        const lastColorOfPlay = play.colors[play.colors.length - 1];
        setFlash(lastColorOfPlay);

        // which sound is gonna play
        if (lastColorOfPlay === "blue") {
            playSound(blue);
        } else if (lastColorOfPlay === "yellow") {
            playSound(yellow);
        } else if (lastColorOfPlay === "red") {
            playSound(red);
        } else if (lastColorOfPlay === "green") {
            playSound(green);
        }

        // wait for a moment
        await setTimeout(() => {
            setFlash("");
        }, 200);

        setPlay(prev => ({
            ...prev,
            isDisplay: false,
            userPlay: true,
            userColors: [...prev.colors].reverse()
        })
        );
    }

    // when I click on the button check for if I am wrong
    // if I am wrong, finish the game
    // otherwise, go to new level
    async function cardClickHandle(value) {

        if (!play.isDisplay && play.userPlay) {
            const copyUserColors = [...play.userColors];
            const lastColor = copyUserColors.pop();
            setFlash(value);

            if (value === lastColor) {
                if (copyUserColors.length) {
                    setPlay({ ...play, userColors: copyUserColors })
                } else {
                    // wait for a moment
                    await new Promise((resolve) => setTimeout(resolve, 200));
                    setPlay({
                        ...play,
                        isDisplay: true,
                        userPlay: false,
                        score: play.colors.length,
                        userColors: []
                    })
                }

            } else {
                // wait for a moment
                await new Promise((resolve) => setTimeout(resolve, 200));
                setGameover(true);
                playSound(wrong);
                setStart(false);
                setShowPortal(true);
            }
            // wait for a moment
            await setTimeout(() => {
                setFlash("");
            }, 100);
        }
    }

    const handleStart = () => {
        setPlay({ ...initPlay });
        setStart(true);
        setGameover(false);

    }

    // play sound function
    function playSound(name) {
        let audio = new Audio(name);
        audio.play();
    }

    // change portal stuation
    const handlePortal = () => {
        setShowPortal(false);
    }


    return (
        <>
            <div className={`container simon ${gameover ? "game-over" : ""}`}>
                {
                    start && (play.isDisplay || play.userPlay) &&
                    (<h3 className="simon-h3">score: {play.score}</h3>)
                }

                {/* render the button */}
                <div className="row">
                    <button
                        className={`press-button green ${flash === "green" ? "pressed" : ""}`}
                        onClick={() => { cardClickHandle("green"); playSound(green) }}
                    />
                    <button
                        className={`press-button red ${flash === "red" ? "pressed" : ""}`}
                        onClick={() => { cardClickHandle("red"); playSound(red) }}
                    />
                </div>

                {/* render the button */}
                <div className="row">
                    <button
                        className={`press-button yellow ${flash === "yellow" ? "pressed" : ""}`}
                        onClick={() => { cardClickHandle("yellow"); playSound(yellow) }}
                    />
                    <button
                        className={`press-button blue ${flash === "blue" ? "pressed" : ""}`}
                        onClick={() => { cardClickHandle("blue"); playSound(blue) }}
                    />
                </div>

                {
                    !start &&
                    (<button className="select-btn" onClick={() => { handleStart() }}>
                        Start
                    </button>)
                }
                {
                    gameover && showPortal ?
                        <Portal
                            handlePortal={handlePortal}
                        >
                            <p>Game Over</p>
                            {<p>Your Score: {play.score}</p>}
                        </Portal> :
                        null
                }
            </div>
        </>
    )
}
