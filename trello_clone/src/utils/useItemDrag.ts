import { useDrag } from "react-dnd";
import { setDraggedItem } from "../state/actions";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../state/draggables";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect } from "react";

//useDrag returns three items
//collectedProps from collect function
//Connector function for the drag source
//Connection function for the default drag preview

export const useItemDrag = (item: DragItem) => {
    const {dispatch} = useAppState();
    const [, drag, preview] = useDrag({
        type: item.type, 
        item: () => {
            if (item.type == "DUE_DATE") {
                console.log("Due Date Type");
            }
            dispatch(setDraggedItem(item));
            return item;
        },
        end: () => dispatch(setDraggedItem(null))
    })
    //When the default drag preview is created, replace it with an empty image
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [preview]);
    return {drag};
}