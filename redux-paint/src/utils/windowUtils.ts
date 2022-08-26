import React from "react";
import interact from "interactjs";



export const useDragRefWith = (ref: React.RefObject<HTMLElement>, elementClassName?: string): void => {
    if (!ref.current) {
      return;
    } 
    interact(elementClassName ? 
        `.${elementClassName}` : ref.current.className
      ).draggable({
        listeners: {
          start(event) {
            console.log(elementClassName);
            console.log("start");
          },
          move(event) {
            if (ref.current) {
              const leftInt = parseInt(ref.current.style.left.slice(0, -2))
              const topInt = parseInt(ref.current.style.top.slice(0, -2))
              ref.current.style.left = leftInt + event.dx + 'px';
              ref.current.style.top = topInt + event.dy + 'px';
            }
          }
        }
      })
  }