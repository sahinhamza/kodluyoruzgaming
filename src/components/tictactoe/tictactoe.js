import { useState } from "react";
import { Portal } from "../portal/portal";
import "./style.css"

export function Tictactoe() {
    // whose turn it is
    let [turn, setTurn] = useState("X");
    //initial empty cells
    let [cells, setCells] = useState(Array(9).fill(""));
    //who did win
    let [winner, setWinner] = useState();
    //show portal
    let [showPortal, setShowPortal] = useState(true);

    // winner situation and check who wins
    let checkForWinner = (squarre) => {
        let combos = {
            across:
                [[0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]],
            down:
                [[0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]],
            diagno:
                [[0, 4, 8],
                [2, 4, 6]]
        }

        for (let combo in combos) {
            combos[combo].forEach(pattern => {
                if (
                    squarre[pattern[0]] === "" ||
                    squarre[pattern[1]] === "" ||
                    squarre[pattern[2]] === ""
                ) {
                    //do nothings
                } else if (
                    squarre[pattern[0]] === squarre[pattern[1]] &&
                    squarre[pattern[1]] === squarre[pattern[2]]
                ) {
                    setWinner(squarre[pattern[0]]);
                }

            });
        }
    }

    // when I click on the cell  write "X" or "O"
    let handleClick = (num) => {
        if (cells[num] !== "") {
            return;
        }

        let squarre = [...cells];

        if (turn === "X") {
            squarre[num] = "X";
            setTurn("O");
        } else {
            squarre[num] = "O";
            setTurn("X");
        }

        checkForWinner(squarre);
        setCells(squarre);

    }

    // restart the game
    let handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(""));
        setShowPortal(true);
    }

    // game's cells
    let Cell = ({ num }) => {
        return (<td onClick={() => handleClick(num)}>{cells[num]}</td>);
    }

    // change portal stuation
    const handlePortal = () => {
        setShowPortal(false);
    }

    return (
        <div className="container tictactoe">
            {<p>Turn: {turn}</p>}
            <table>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            <div>
                {<button className="select-btn" onClick={() => { handleRestart() }}>Reset</button>}
            </div>
            {
                winner && showPortal ?
                    <Portal
                        handlePortal={handlePortal}
                    >
                        <p>Game Over</p>
                        {<p>{winner} is the winner</p>}
                    </Portal> :
                    null
            }
        </div>
    )
}