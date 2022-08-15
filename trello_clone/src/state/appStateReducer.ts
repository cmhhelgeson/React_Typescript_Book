import { Action } from "./actions"
import { nanoid } from "nanoid"
import { findItemIndexById, getColumnAndCardIndexes, moveItem, removeItemAtIndex } from "../utils/arrayUtils"
import { DragItem } from "./draggables"

export type Task = {
  id: string
  text: string, 
  dueDate?: string
}

export type List = {
  id: string
  text: string
  tasks: Task[]
}

export type AppState = {
  lists: List[]
  draggedItem: DragItem | null
}


export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: []
      })
      break
    }
    case "COPY_LIST": {
      const originalListIndex = findItemIndexById(draft.lists, action.payload);
      draft.lists.push({
        id: nanoid(),
        text: draft.lists[originalListIndex].text,
        tasks: draft.lists[originalListIndex].tasks,
      })
      break
    }
    case "DELETE_LIST": {
      const idx = findItemIndexById(draft.lists, action.payload);
      draft.lists = [...draft.lists.slice(0, idx), ...draft.lists.slice(idx + 1)];
      break;
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload
      //Finds Numerical Index of List by its Id
      const targetListIndex = findItemIndexById(draft.lists, listId)

      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text
      })
      break
    }
    case "MOVE_LIST": {
      const {selectedId, shiftedId} = action.payload;
      const selectedIndex = findItemIndexById(draft.lists, selectedId);
      const shiftedIndex = findItemIndexById(draft.lists, shiftedId);
      draft.lists = moveItem(draft.lists, selectedIndex, shiftedIndex);
      break;
    }
    case "MOVE_TASK": {
      const {selectedId, shiftedId, sourceColumnId, targetColumnId} = action.payload;
      const sourceListIndex = findItemIndexById(
        draft.lists,
        sourceColumnId
      )
      const targetListIndex = findItemIndexById(
        draft.lists,
        targetColumnId
      )

      let dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        selectedId
      )

      const hoverIndex = shiftedId
        ? findItemIndexById(
            draft.lists[targetListIndex].tasks,
            shiftedId
          )
        : 0

      if (dragIndex < 0) {
        dragIndex = findItemIndexById(
          draft.lists[targetListIndex].tasks,
          selectedId
        )
        const item = draft.lists[targetListIndex].tasks[dragIndex];
        // Remove the task from the source list
        draft.lists[targetListIndex].tasks.splice(dragIndex, 1)

        // Add the task to the target list
        draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item)
      } else {

        const item = draft.lists[sourceListIndex].tasks[dragIndex]

        // Remove the task from the source list
        draft.lists[sourceListIndex].tasks.splice(dragIndex, 1)

        // Add the task to the target list
        draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item)
      }
      break
    }
    case "SET_DRAGGED_ITEM": {
      const draggedItem = action.payload;
      draft.draggedItem = draggedItem;
      break;
    }
    case "ADD_TASK_DATE": {
      const {sourceColumnId, id, date} = action.payload;
      const listIndex = findItemIndexById(draft.lists, sourceColumnId);
      const taskIndex = findItemIndexById(draft.lists[listIndex].tasks, id);
      draft.lists[listIndex].tasks[taskIndex].dueDate = date;
      break;
    }
    case "DELETE_TASK_DATE": {
      const {sourceColumnId, id} = action.payload;
      const listIndex = findItemIndexById(draft.lists, sourceColumnId);
      const taskIndex = findItemIndexById(draft.lists[listIndex].tasks, id);
      draft.lists[listIndex].tasks[taskIndex].dueDate = undefined;
      break
    }
    case "MOVE_TASK_DATE": {
      const {sourceColumnId, sourceCardId, targetColumnId, targetCardId} = action.payload;
      const {sourceColumnIndex, targetColumnIndex, sourceCardIndex, targetCardIndex} = 
        getColumnAndCardIndexes(draft.lists, sourceColumnId, targetColumnId, sourceCardId, targetCardId);
      if (sourceColumnIndex === targetColumnIndex && sourceCardIndex === targetCardIndex) {
        break;
      }
      let sourceCard = draft.lists[sourceColumnIndex].tasks[sourceCardIndex];
      let targetCard = draft.lists[targetColumnIndex].tasks[targetCardIndex];
      let temp = sourceCard.dueDate;
      if (sourceCard.dueDate !== undefined && targetCard.dueDate !== undefined) {
        sourceCard.dueDate = targetCard.dueDate;
      } else {
        sourceCard.dueDate = undefined;
      }
      targetCard.dueDate = temp;
      break;

    }
    case "CHANGE_LIST_NAME": {
      const {id, newText} = action.payload;
      const index = findItemIndexById(draft.lists, id);
      draft.lists[index].text = newText;
      break;
    }
    default: {
      break
    }
  }
}
