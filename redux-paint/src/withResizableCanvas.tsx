import React, {useRef, ComponentType, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { beginStroke, currentStrokeSelector, updateStroke } from './features/currentStroke/slice';
import { endStroke } from './features/sharedActions';
import {clearCanvas, restoreSnapshot, setCanvasSize, drawStroke} from "./utils/drawUtils"
import { CanvasSize, Point, RootState} from './utils/types';
import { dragRefWith, resizeRefWith} from './utils/windowUtils';
import { canvasSizeSelector, changeCanvasSize } from './features/canvasSize/slice';



type CanvasAndContextType = {
    canvas: HTMLCanvasElement | null
    context: CanvasRenderingContext2D | null | undefined
}

type InjectedProps = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    canvasSize: CanvasSize
    getCanvasWithContext(canvas: HTMLCanvasElement): CanvasAndContextType
    expandCanvas(): void
    shrinKcanvas(): void
}

export const withResizableCanvas = (WrappedComponent: ComponentType<InjectedProps>) => {
    return function WithReiszableCanvasComponent() {
        //Reference to the canvas
        const canvasRef = useRef<HTMLCanvasElement>(null);

        //State selectors
        const canvasSize = useSelector(canvasSizeSelector)
        const dispatch = useDispatch();

        //Utilities)
        const getCanvasWithContext = (canvas = canvasRef.current) => {
            return {canvas, context: canvas?.getContext("2d")}
        }

        const expandCanvas = () => {
            const {canvas, context} = getCanvasWithContext();
            if (!canvas || !context) {
              return;
            }
            console.log("zoom")
            const newWidth = canvas.width * 2;
            const newHeight = canvas.height * 2;
            dispatch(changeCanvasSize({
              width: newWidth, styleWidth: newWidth, 
              height: newHeight, styleHeight: newHeight}))
        }

        const shrinkCanvas = () => {
            const {canvas, context} = getCanvasWithContext();
            if (!canvas || !context) {
              return;
            }
            console.log("zoom");
            const imgSrc = canvas.toDataURL();
            //Since the canvas size doesn't change this will only change once
            dispatch(changeCanvasSize({
              width: canvas.width / 2, styleWidth: canvas.height / 2, 
              height: canvas.width / 2, styleHeight: canvas.height / 2}))
        }


        useEffect(() => {
            const {canvas} = getCanvasWithContext();
            if (!canvas) {
                return;
            }
            clearCanvas(canvas, "white");
        }, [])

        useEffect(() => {
            const {canvas, context} = getCanvasWithContext();
            console.log(canvasSize)
            if (!canvas || !context) {
              console.log("cnt find")
              return;
            }
            const imgSrc = canvas.toDataURL();
            const curWidth = canvas.width;
            const curHeight = canvas.height;
            const curStyleWidth = parseInt(canvas.style.width.slice(0, -2));
            const curStyleHeight = parseInt(canvas.style.height.slice(0, -2));
        
            //If Canvas will Become Bigger
            if (curWidth < canvasSize.width) {
              setCanvasSize(canvas, canvasSize);
              clearCanvas(canvas, "white");
              let img = new Image();
              img.onload = () => {
                context.drawImage(img, 0, 0, curWidth, curHeight, 0, 0, curWidth, curHeight);
              }
              img.src = imgSrc;
              console.log(canvasSize);
              return;
            }
            //If Canvas Will Become Smaller
            if (curWidth > canvasSize.width) {
              setCanvasSize(canvas, canvasSize);
              //setCanvasSize(canvas, canvas.width / 1.5, canvas.height / 1.5);
              clearCanvas(canvas, "white");
              restoreSnapshot(canvas, "DATA_URL", imgSrc);
              return;
            }
            if (curStyleWidth !== canvasSize.styleWidth) {
              setCanvasSize(canvas, canvasSize)
              let img = new Image();
              img.onload = () => {
                context.drawImage(img, 0, 0, curWidth, curHeight, 0, 0, canvas.width, canvas.height);
              }
              img.src = imgSrc;
            }
        }, [canvasSize]);

        return (
        <WrappedComponent
            canvasRef={canvasRef}
            shrinKcanvas={shrinkCanvas}
            expandCanvas={expandCanvas}
            getCanvasWithContext={getCanvasWithContext}
            canvasSize={canvasSize} 
        />);
    }
}