import React, { Ref } from "react";
import interact from "interactjs";
import {InteractEvent} from "@interactjs/core/InteractEvent"

import { AppAction } from "../actions";
import { useAppDispatch } from "../hooks";





/* export const dragRefWith = (
    ref: React.RefObject<HTMLElement>, 
    elementClassName?: string,
): void => {
    if (!ref.current) {
      return;
    } 
    console.log("reffed")
    interact(elementClassName ? 
        `.${elementClassName}` : ref.current.className
      ).draggable({
        listeners: {
          start(event) {

          },
          move(event: InteractEvent) {
            if (ref.current) {
              const leftInt = parseInt(ref.current.style.left.slice(0, -2))
              const topInt = parseInt(ref.current.style.top.slice(0, -2))
              ref.current.style.left = leftInt + event.dx + 'px';
              ref.current.style.top = topInt + event.dy + 'px';
            }
          }
        }, 
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: {top: 0, left: 0, right: 1000, bottom: 900}
            })
        ]
    })
} */

export const dragRefWith = (
    draggedObject: React.RefObject<HTMLElement>, 
    draggedWith: React.RefObject<HTMLElement>,
): void => {
    if (!draggedObject.current || !draggedWith.current) {
      return;
    } 
    console.log("reffed")
    interact(draggedWith.current).draggable({
        listeners: {
          start(event) {

          },
          move(event: InteractEvent) {
            if (draggedObject.current) {
              const leftInt = parseInt(draggedObject.current.style.left.slice(0, -2))
              const topInt = parseInt(draggedObject.current.style.top.slice(0, -2))
              draggedObject.current.style.left = leftInt + event.dx + 'px';
              draggedObject.current.style.top = topInt + event.dy + 'px';
            }
          }
        }, 
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: {top: 0, left: 0, right: 1000, bottom: 900}
            })
        ]
    })
}
 

export const resizeRefWith = (
    ref: React.RefObject<HTMLElement>, 
    elementClassName: string,
    dispatchActionType?: AppAction
): void => {
    if (!ref.current) {
        return;
    }
    console.log("Make resizable");
    interact(elementClassName ? 
        `.${elementClassName}` : ref.current.className
      ).resizable({
        edges: {bottom: true, right: true},
        listeners: {
          move(event: InteractEvent) {
            if (ref.current) {
              let {width, height} = event.rect;
              ref.current.style.width = `${width}px`
              ref.current.style.height = `${height}px`
            }
          }
        }, 
        modifiers: [
            interact.modifiers.restrictSize({
                min: {width: 500, height: 500},
                max: {width: 1700, height: 980}
            })
        ]
    })

}