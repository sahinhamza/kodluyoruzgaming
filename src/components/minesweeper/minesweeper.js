import React from "react"
import { Board } from "./board"
import { BoardHead } from "./boardhead"
import "./style.css"

// game's initial state
let initialState = {
    status: "waiting", //waiting, running, ended, winner
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time: 0,
    openCells: 0,
    showPortal: true
}

export class MineSweeper extends React.Component {
    constructor() {
        super()

        this.state = {
            ...initialState
        };

    }

    //check if I won or not
    componentDidUpdate(prevProps, prevState) {
        if (this.state.status === "running") {
            this.checkForWinner();

        } else {
            clearInterval(this.interval);
        }
    }

    //clear unnecessary memory
    componentWillUnmount() {
        clearInterval(this.interval)
    }


    //this function ends the game
    endGame = () => {
        this.setState(prev => ({
            ...prev,
            status: "ended"
        })
        );
    }

    //this function checks for win
    checkForWinner = () => {
        if (this.state.columns * this.state.rows - this.state.openCells === this.state.mines) {
            this.setState(prev => ({
                ...prev,
                status: "winner"
            })
            );
        }
    }

    //this function resets the game
    reset = () => {
        this.setState({
            ...initialState,
            status: "waiting"
        });
    }

    // time update
    tick = () => {
        this.setState(prev => ({
            ...prev,
            time: prev.time + 1
        }));
    }

    // change opencells number when i click on cell
    // when i click on a cell for the first time change game status and start the time
    handleCellClick = () => {
        if (this.state.openCells === 0 && this.state.status !== "running") {
            this.setState(prev => ({
                ...prev,
                status: "running"
            }),
                () => {
                    this.interval = setInterval(this.tick, 1000)
                }
            );
        }

        this.setState(prev => ({
            ...prev,
            openCells: prev.openCells + 1
        })
        );
    }

    // change flagamount when i put or remove the flag on the cell
    changeFlagAmount = (amount) => {
        this.setState(prev => ({
            ...prev,
            flags: prev.flags + amount
        })
        )
    }

    // change portal stuation
    handlePortal = () => {
        this.setState(prev => ({
            ...prev,
            showPortal: false
        })
        );
    }


    render() {
        let { status, rows, columns, flags, mines, time, openCells, showPortal } = this.state
        return (
            <div className="container mine">
                <div className="minesweeper ">
                    <BoardHead
                        time={time}
                        flagCount={flags}
                        reset={this.reset}
                    />
                    <Board
                        changeFlagAmount={this.changeFlagAmount}
                        openCellClick={this.handleCellClick}
                        endGame={this.endGame}
                        handlePortal={this.handlePortal}
                        rows={rows}
                        columns={columns}
                        mines={mines}
                        openCells={openCells}
                        status={status}
                        showPortal={showPortal}
                        time={time}
                    />
                </div>
            </div>
        )
    }
}