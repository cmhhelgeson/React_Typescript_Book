import React, { Ref } from "react";
import interact from "interactjs";
import {InteractEvent} from "@interactjs/core/InteractEvent"




export const dragRefWith = (
    ref: React.RefObject<HTMLElement>, 
    elementClassName?: string
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
} 

export const resizeRefWith = (
    ref: React.RefObject<HTMLElement>, 
    elementClassName?: string
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