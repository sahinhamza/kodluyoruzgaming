import { useNavigate } from "react-router-dom";
import tictactoe from "../../assets/images/tictactoe.png"
import simon from "../../assets/images/simon.png"
import memory from "../../assets/images/memory.png"
import mine from "../../assets/images/mine.png"
import "./style.css"

let games = [
    { src: tictactoe, name: "Tic-Tac-Toe", navigate: "tictactoe" },
    { src: simon, name: "Simon-Says", navigate: "simon" },
    { src: memory, name: "Memory-Game", navigate: "memorygame" },
    { src: mine, name: "Mine-Sweeper", navigate: "minesweeper" },

];

export function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div className="Main">

                {games.map((game, index) => (
                    <div key={index} className="card col-sm-12 col-md-4 " >
                        <img src={game.src} alt="tictactoe" />
                        <div className="card-body">
                            <h5 className="card-title">{game.name}</h5>
                            <button
                                className="select-btn"
                                onClick={() => navigate(game.navigate)}
                            >
                                Select
                            </button>
                        </div>
                    </div>))
                }

            </div>
        </>
    )
}