import React from "react";
import { Portal } from "../portal/portal";

export function Cell(props) {


    let renderCell = () => {
        if (props.data.isOpen) {
            if (props.data.hasMine) {
                return (
                    <div className="cell" onContextMenu={e => {
                        e.preventDefault();
                    }}>💣</div>
                )
            } else {
                return (
                    props.data.count === 0 ?
                        <div className="cell open"
                            onContextMenu={e => { e.preventDefault(); }} /> :

                        <div className="cell open"
                            onContextMenu={e => {
                                e.preventDefault();
                                props.flag(props.data)
                            }}>{props.data.count}
                        </div>
                )
            }

        } else if (props.data.hasFlag) {
            return (
                <div
                    className="cell"
                    onContextMenu={e => {
                        e.preventDefault();
                        props.flag(props.data);
                    }}
                >
                    🚩
                </div>
            )
        } else {
            return (
                <div
                    className="cell"
                    onClick={() => props.open(props.data)}
                    onContextMenu={e => {
                        e.preventDefault();
                        props.flag(props.data);
                    }}
                >

                </div>
            )
        }
    }

    return (
        <>
            {renderCell()}

            {
                props.status === "winner" && props.showPortal ?
                    <Portal
                        handlePortal={props.handlePortal}
                    >
                        <p>Congratulations</p>
                        {<p>Your Score: {props.time} sec.</p>}
                    </Portal> :
                    null
            }
        </>
    )


}