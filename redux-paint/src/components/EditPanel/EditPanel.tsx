import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { undo, redo} from "../../features/historyIndex/slice";
import { strokesLengthSelector } from "../../features/strokes/slice";

import "../../index.css"

export const EditPanel = () => {
    const dispatch = useDispatch()
    const strokesLength = useSelector(strokesLengthSelector);


    return (
        <div className="window edit">
            <div className="title-bar">
                <div className="title-bar-text">Edit</div>
            </div>
            <div className="window-bdoy">
                <div className="button redo">
                    <button 
                        className="button redo"
                        onClick={() => dispatch(undo(strokesLength))}
                    >
                    Undo
                    </button>
                    <button
                        className="button redo"
                        onClick={() => dispatch(redo(strokesLength))}
                    >
                    Redo
                    </button>
                </div>
            </div>
        </div>
    )
}