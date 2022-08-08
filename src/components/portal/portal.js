import React from "react";
import { createPortal } from "react-dom";
import "./style.css"


export function Portal({handlePortal, children}) {
 
    return createPortal(
        <div className="portal">
           {children}
           <button className="select-btn" onClick={() => {handlePortal()}}>close</button>
        </div>,
        document.getElementById("portal-root")
    )
}