

type ColumnDragItem = {
    id: string, 
    text: string, 
    type: "COLUMN"
}

type CardDragItem = {
    id: string, 
    text: string,
    columnId: string,
    type: "CARD"
}

//This doesn't work since with union types, we can only access members or variables that each of the types have in common

type DueDateItem = {
    text: string,
    columnId: string, 
    //The id of the card the dueDate is associated with
    id: string, 
    type: "DUE_DATE"
}


export type DragItem = ColumnDragItem | CardDragItem | DueDateItem;