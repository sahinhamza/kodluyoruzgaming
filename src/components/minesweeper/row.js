import React from "react";
import { Cell } from "./cell";

export function Row(props) {

    let {open,flag,status,handlePortal,showPortal,time} = props
    
    let cells = props.cells.map((data, index) => {
        return(     
           <Cell 
           key={index} 
           data={data}
           open={open}
           flag={flag}
           status={status}
           handlePortal={handlePortal}
           showPortal={showPortal}
           time={time}
           />
        )
    })
    return(
        <div className="rows">
            {cells}
        </div>
    )

}