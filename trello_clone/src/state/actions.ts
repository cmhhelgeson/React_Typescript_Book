import { stringify } from "querystring"
import { idText } from "typescript"
import { DragItem } from "./draggables"

export type Action =
  | {
      type: "ADD_LIST"
      payload: string
    }
  | {
      type: "ADD_TASK"
      payload: { text: string; listId: string }
    }
  | {
      type: "MOVE_LIST"
      payload: {selectedId: string, shiftedId: string}
    }
  | {
      type: "SET_DRAGGED_ITEM"
      payload: DragItem | null
    }
  | { 
      type: "MOVE_TASK"
      payload: {
        selectedId: string,
        shiftedId: string | null,
        sourceColumnId: string,
        targetColumnId: string,
      }
    }
  | {
      type: "COPY_LIST"
      payload: string
    }
  | {
      type: "DELETE_LIST",
      payload: string,
    }
  | {
      type: "ADD_TASK_DATE",
      payload: {
        sourceColumnId: string,
        id: string, 
        date: string,
      }
    }
  | {
      type: "DELETE_TASK_DATE",
      payload: {
        sourceColumnId: string, 
        id: string, 
      }
    } 
  | { type: "MOVE_TASK_DATE",
      payload: {
        sourceColumnId: string,
        sourceCardId: string,
        targetColumnId: string,
        targetCardId: string,
      }
    }
  | {
    type: "CHANGE_LIST_NAME",
    payload: {
      id: string,
      newText: string
    }
  }

export const addTask = (text: string, listId: string): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId
  }
})

export const addList = (text: string): Action => ({
  type: "ADD_LIST",
  payload: text
})

export const moveList = (selectedId: string, shiftedId: string): Action => ({
  type: "MOVE_LIST", 
  payload: {
    selectedId, 
    shiftedId
  }
})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: "SET_DRAGGED_ITEM", 
  payload: draggedItem
})

export const moveTask = (selectedId: string, shiftedId: string | null, sourceColumnId: string, targetColumnId: string): Action => ({
  type: "MOVE_TASK",
  payload: {
    selectedId, 
    shiftedId,
    sourceColumnId, 
    targetColumnId
  }
})

export const copyList = (originalId: string): Action => ({
  type: "COPY_LIST",
  payload: originalId
})

export const deleteList = (id: string): Action => ({
  type: "DELETE_LIST",
  payload: id
})

export const addTaskDate = (sourceColumnId: string, id: string, date: string): Action => ({
  type: "ADD_TASK_DATE", 
  payload: {
    sourceColumnId,
    id,
    date,
  }
})

export const deleteTaskDate = (sourceColumnId: string, id: string): Action => ({
  type: "DELETE_TASK_DATE",
  payload: {
    sourceColumnId, 
    id
  }
})

export const moveTaskDate = (sourceColumnId: string, sourceCardId: string, targetColumnId: string, targetCardId: string): Action => ({
  type: "MOVE_TASK_DATE",
  payload: {
    sourceColumnId, 
    sourceCardId, 
    targetColumnId,
    targetCardId,
  }
})

export const changeListName = (id: string, newText: string) : Action => ({
  type: "CHANGE_LIST_NAME",
  payload: { 
    id, newText
  }
})
