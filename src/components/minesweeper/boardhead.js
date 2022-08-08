import React from "react";


export function BoardHead(props) {

    // edit the display of the time
    let minutes = Math.floor(props.time/60);
    let seconds = props.time - minutes*60 || 0;

    let formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    let time = `${minutes}:${formatedSeconds}`;
    
    return(
        <div className="board-head">
            <div className="flag-count">🚩:{props.flagCount}</div>
            <button className="reset" onClick={props.reset}>Reset</button>
            <div className="timer">{time}</div> 
        </div>
    )

}