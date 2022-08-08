import React from "react"
import { Row } from "./row";
import "./style.css"

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createBoard(props)
        }
    }

    // update screen every time when i click on closed cell
    componentDidUpdate(prevProps) {
        if (prevProps.openCells > this.props.openCells) {
            this.setState({
                rows: this.createBoard(this.props)
            })
        }
    }

    // generate the information of each cell and identify where is the bombs
    createBoard = props => {
        let board = [];

        for (let i = 0; i < props.rows; i++) {
            board.push([]);
            for (let j = 0; j < props.columns; j++) {
                board[i].push({
                    x: j,
                    y: i,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false,
                })
            }
        }

        for (let i = 0; i < props.mines; i++) {
            let randomRow = Math.floor(Math.random() * props.rows);
            let randomCol = Math.floor(Math.random() * props.columns);

            let cell = board[randomRow][randomCol];

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }

        }

        return board;
    }


    open = cell => {
        if (this.props.status === "ended") {
            return ;
        }

        // find out how many bombs are around me
        let asyncCountMines = new Promise(resolve => {
            let mines = this.findMines(cell);
            resolve(mines);
        })


        asyncCountMines.then(numberOfMines => {

            let rows = this.state.rows;

            let current = rows[cell.y][cell.x];


            if (current.hasMine && this.props.openCells === 0) {
                let newRows = this.createBoard(this.props);
                this.setState({
                    rows: newRows
                }, () => {
                    this.open(cell);
                })
            } else {
                // open the cell if the cell has no flag and the cell is not open
                if (!cell.hasFlag && !current.isOpen) {
                    this.props.openCellClick();

                    current.isOpen = true;
                    current.count = numberOfMines;

                    this.setState({ rows });

                    // continue if it's not the bomb that i clicked
                    if (!current.hasMine && numberOfMines === 0) {
                        this.findAroundCell(cell)
                    }

                    // if it is a bomb that ı clicked end the game
                    if (current.hasMine && this.props.openCells !== 0) {
                        this.props.endGame();
                        for(let row of this.state.rows){
                            for(let cell of row){
                               if(cell.hasMine){
                                cell.isOpen = true
                               }
                            }
                        }
                    }
                }
            }

        })


    }

    // flag the cell or remove it
    flag = cell => {
        if (this.props.status === "ended") {
            return;
        }

        if (!cell.isOpen) {
            cell.hasFlag = !cell.hasFlag;
            this.setState({...this.state, rows:this.state.rows });
            this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
        }

    }

    // find out how many bombs are around me
    findMines = cell => {
        let minesInProximity = 0;
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                    if (cell.y + row < this.state.rows.length && cell.x + col < this.state.rows[0].length) {
                        if (this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
                            minesInProximity++;
                        }
                    }
                }
            }
        }

        return minesInProximity
    }

    // if there are empty cells around me open them
    findAroundCell = cell => {
        let rows = this.state.rows;

        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                    if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
                        if (!rows[cell.y + row][cell.x + col].hasMine && !rows[cell.y + row][cell.x + col].isOpen) {
                            this.open(rows[cell.y + row][cell.x + col]);
                        }
                    }
                }
            }
        }
    }


    render() {
        let rows = this.state.rows.map((row, index) => {
            return (
                <Row
                    key={index}
                    cells={row}
                    open={this.open}
                    flag={this.flag}
                    status={this.props.status}
                    handlePortal={this.props.handlePortal}
                    showPortal={this.props.showPortal}
                    time={this.props.time}
                />
            )
        })
        return (
            <div className="board">{rows}</div>
        )
    }
}