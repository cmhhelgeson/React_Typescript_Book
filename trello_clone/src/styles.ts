import styled from "styled-components"
import {keyframes} from "styled-components"
 
export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`

export const ColumnTitleContainer = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`

type AddItemButtonProps = {
  dark?: boolean
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`

type DragPreviewContainerProps = {
  isHidden?: boolean
  isPreview?: boolean
}

const tiltDraggedDiv = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(15deg)
  }
`

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0.3 : 1)};
  animation-name: ${(props) => (props.isHidden ? tiltDraggedDiv : undefined)};
  animation-duration: ${(props) => (props.isPreview ? "0.4s" : undefined)};
  transform: ${(props) => (props.isPreview ? "rotate(15deg)" : undefined)}
`

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`

export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  max-width: 300px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  flex-direction: column;
`

export const CardTop = styled.div`
  flex-direction: row;
  align-items: center;
`

/*export const DueDateText = styled.div.attrs(() => ({
  className: "DueDateText",
}))`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 2px;
  color: #5e6c84;
` */

export const DueDateText = styled(DragPreviewContainer)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 2px;
  color: #5e6c84;
  max-width: 100px;

  &:hover {
    background-color: #ffe;
    height: 70px;
    font-size: 18px;
  }

  background-color: ${(props) => (props.isPreview ? "white" : null)};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`

type DragPreviewWrapperProps = {
  position: {
    x: number
    y: number
  }
}

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`
    }
  })
)<DragPreviewWrapperProps>``


