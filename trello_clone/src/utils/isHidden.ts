import { DragItem } from "../state/draggables";

export const isHidden = (
    draggedItem: DragItem | null,
    type: string,
    id: string,
    isPreview?: boolean
): boolean => {
    return Boolean(!isPreview && draggedItem && draggedItem.type === type && draggedItem.id === id)
}