import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { DragItem } from "./state/draggables";
import { DueDateContainer } from "./DueDate";





export const CustomDragLayer = () => {
    const { draggedItem } = useAppState()
    const { currentOffset } = useDragLayer((monitor) => ({
      currentOffset: monitor.getSourceClientOffset()
    }))

    const displayCorrectType = (draggedItem: DragItem | null): any => {
        if (!draggedItem) {
            return null;
        }
        switch(draggedItem.type) {
            case "COLUMN": {
                return (<Column id={draggedItem.id} text={draggedItem.text} isPreview />);
            } break;
            case "CARD": {
                return (<Card id={draggedItem.id} columnId ={draggedItem.columnId} text={draggedItem.text} isPreview/>);
            } break;

            case "DUE_DATE": {
                return <DueDateContainer cardId={draggedItem.id} columnId={draggedItem.columnId} text={draggedItem.text} isPreview/>
            }

            default: {
                return null;
            }
        }

    }

    //We now see that we defined id + text in ColumnDragItem (draggables.ts)
    //So they could be rendered in the custom drag layer
    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                {displayCorrectType(draggedItem)}
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null;
}


//Since only one item is going to be dragged at a time, we can define a component
//that returns different renders depending on the type of the current draggedItem