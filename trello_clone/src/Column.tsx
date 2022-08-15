import { ColumnContainer, ColumnTitleContainer } from "./styles"
import { Card } from "./Card"
import { useMemo, useRef, useState} from "react"
import { AddNewItem } from "./AddNewItem"
import { useAppState } from "./state/AppStateContext"
import { addList, addTask, setDraggedItem, moveList, moveTask, copyList, deleteList, changeListName} from "./state/actions"
import {useItemDrag} from "./utils/useItemDrag"
import { useDrop } from "react-dnd"
import { throttle } from "throttle-debounce-ts"
import {isHidden} from "./utils/isHidden"
import { findItemIndexById } from "./utils/arrayUtils"
import { textSpanOverlap } from "typescript"
type ColumnProps = {
  text: string
  id: string
  isPreview?: boolean
}

type ColumnTitleProps = {
  text: string
}



export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();

  const [displayTitle, setDisplayTitle] = useState<boolean>(true);

  const tasks = getTasksByListId(id);

  const t = useMemo(() => {
    console.log("Text considered")
    return text;
  }, [text]);
  
  const ref = useRef<HTMLDivElement>(null);
  const {drag} = useItemDrag({type: "COLUMN", id, text});
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return
        }

        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        if (draggedItem)
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({...draggedItem, columnId: id}));
      } 
    })
  })


  drag(drop(ref));

  console.log("Column rendered");
  return (
    (<ColumnContainer 
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id)}
      isPreview={isPreview}>
      {displayTitle ? 
        <ColumnTitleContainer>{text}</ColumnTitleContainer> : 
        null 
      } 
      <button onClick={() => setDisplayTitle(!displayTitle)}>Change List Name</button>
      {tasks ? (tasks.map((task) => (
        <Card columnId={id} text={task.text} key={task.id} id={task.id} dueDate={task.dueDate}/>
      ))) : null}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
      <button onClick={() => dispatch(copyList(id))}>Copy List</button>
      <button>Move List</button>
      <button onClick={() => dispatch(deleteList(id))}>Delete List</button>
    </ColumnContainer>)
  )
}
