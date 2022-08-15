import { CardContainer, CardTop, DueDateText} from "./styles"
import {useEffect, useRef, useState} from "react"
import {useItemDrag} from "./utils/useItemDrag"
import {useAppState} from "./state/AppStateContext"
import {throttle} from "throttle-debounce-ts"
import {isHidden} from "./utils/isHidden"
import { useDrop } from "react-dnd"
import { addTask, moveTask, setDraggedItem, addTaskDate, deleteTaskDate, moveTaskDate} from "./state/actions"
import { findItemIndexById } from "./utils/arrayUtils"
import { count } from "console"



type DueDateProps = {
    text: string, 
    columnId: string, 
    cardId: string,
    isPreview?: boolean
}

export const DueDateContainer = ({text, columnId, cardId, isPreview}: DueDateProps) => {
    const {lists, draggedItem, dispatch} = useAppState();
    const [hovered, setHovered] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleMouseEnter = () => {
        setHovered(true);
    }
    
    const handleMouseLeave = () => {
        setHovered(false);
    }

    const {drag} = useItemDrag({type: "DUE_DATE", text: text, columnId: columnId, id: cardId});
    const [, drop] = useDrop({
        accept: "DUE_DATE", 
        hover: throttle(200, () => {
            if (!draggedItem) {
                return;
            }
            if (draggedItem.type !== "DUE_DATE") {
                return;
            }
            if (draggedItem.id === cardId) {
                return;
            }

            //dispatch(moveTaskDate(draggedItem.columnId, draggedItem.id, columnId, cardId));
            //dispatch(setDraggedItem({...draggedItem}))
        })
        
    })

    drag(drop(ref));

    return (
        <DueDateText isHidden={isHidden(draggedItem, "DUE_DATE", cardId)} ref={ref} isPreview={isPreview}>{text}</DueDateText>
    );
    
}



/* 

export const DueDateContainer = ({ text, id, columnId, isPreview, dueDate }: CardProps) => {



  const {drag} = useItemDrag({type: "CARD", id, text, columnId});
  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }
      if (draggedItem.columnId === columnId) {
        console.log("column ids match");

      }
      try {
        console.log("Moved task");
        dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
        dispatch(setDraggedItem({...draggedItem, columnId: columnId}));
      } catch (error) {
        console.log(draggedItem.id, id, draggedItem.columnId, columnId);
        console.log("Stop")
      }
      if (lastTask) {
        //dispatch(addTask("Edit task", draggedItem.columnId));
      } 
    })
  });


  drag(drop(ref));

  return <CardContainer 
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    ref={ref} 
    isPreview={isPreview} 
    isHidden={isHidden(draggedItem, "CARD", id)}>
      <CardTop>
        {text}
        {hovered ? <div><button onClick={handleAddDate}>Add</button><button onClick={handleDeleteDate}>Delete</button></div> : null}
      </CardTop>
    {dueDate ? <DueDateText>{dueDate}</DueDateText> : null}
    <button onClick={() => dispatch(moveTaskDate(columnId, id, "Christian", "Helgeson"))}></button>
    </CardContainer>
} */
