import { CardContainer, CardTop, DueDateText} from "./styles"
import { DueDateContainer } from "./DueDate"
import {useEffect, useRef, useState} from "react"
import {useItemDrag} from "./utils/useItemDrag"
import {useAppState} from "./state/AppStateContext"
import {throttle} from "throttle-debounce-ts"
import {isHidden} from "./utils/isHidden"
import { useDrop } from "react-dnd"
import { addTask, moveTask, setDraggedItem, addTaskDate, deleteTaskDate, moveTaskDate } from "./state/actions"
import { findItemIndexById } from "./utils/arrayUtils"
import { count } from "console"
import { convertToDate } from "./utils/dateUtils"




type CardProps = {
  text: string
  id: string
  columnId: string,
  isPreview?: boolean
  dueDate?: string
}


export const Card = ({ text, id, columnId, isPreview, dueDate }: CardProps) => {

  const {lists, draggedItem, dispatch} = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);


  const handleMouseEnter = () => {
    setHovered(true);
  }

  const handleMouseLeave = () => {
    setHovered(false);
  }

  const handleAddDate = () => {
    if (!dueDate) {
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      const year = Math.floor(Math.random() * 2) + 2020;
      const date = convertToDate({day, month, year,});
      dispatch(addTaskDate(columnId, id, date));
    }
  }

  const handleDeleteDate = () => {
    if (dueDate) {
      dispatch(deleteTaskDate(columnId, id));
    }
  }


  const {drag} = useItemDrag({type: "CARD", id, text, columnId});
  const [, drop] = useDrop({
    accept: ["CARD", "DUE_DATE"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD" && draggedItem.type !== "DUE_DATE") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }
      if (draggedItem.type === "CARD") {
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
      } else {
        console.log("Due Date Hovered");
        dispatch(moveTaskDate(draggedItem.columnId, draggedItem.id, columnId, id));
        dispatch(setDraggedItem({...draggedItem, columnId: columnId, id: id}))
        return;
      }
      /* if (lastTask) {
        //dispatch(addTask("Edit task", draggedItem.columnId));
      } */
    })
  });


  drag(drop(ref));

  console.log("Card rendered");

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
    {dueDate ? <DueDateContainer text={dueDate} columnId={columnId} cardId={id}/> : null}
    <button onClick={() => dispatch(moveTaskDate(columnId, id, "Christian", "Helgeson"))}></button>
    </CardContainer>
}
