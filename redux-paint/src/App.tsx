import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { beginStroke, currentStrokeSelector, updateStroke } from './features/currentStroke/slice';
import { endStroke } from './features/sharedActions';
import {clearCanvas, restoreSnapshot, setCanvasSize} from "./utils/drawUtils"
import { Point, RootState} from './utils/types';
import { dragRefWith, resizeRefWith} from './utils/windowUtils';

import interact from 'interactjs';
import { canvasSizeSelector, changeCanvasSize } from './features/canvasSize/slice';
import { ColorPanel } from './components/ColorPanel';

const WIDTH = 100;
const HEIGHT = 100;

const drawStroke = (
  context: CanvasRenderingContext2D,
  points: Point[],
  color: string
) => {
  if (!points.length) {
    return
  }
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  //context.beginPath();
  points.forEach((point, idx) => {
    context.lineTo(point.x, point.y);
  })
  //Callings stroke ater moving the line to new point significantly
  //Improves performance
  context.stroke();
  context.closePath();
}

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
}


function App() {
  //JSX Element Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  //Utilities
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {canvas, context: canvas?.getContext("2d")}
  }

  //Define state selectors and objects
  const isDrawing = useSelector<RootState>((state) => !!state.currentStroke?.points.length);
  const currentStroke = useSelector(currentStrokeSelector);
  const canvasSize = useSelector(canvasSizeSelector)
  const dispatch = useDispatch();


  //Local State Variables
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isDrawSquare, setIsDrawSquare] = useState<boolean>(false);
  const [prevPointerEvent, setPrevPointerEvent] = useState<React.PointerEvent |null>(null)
  const [mouseReTarget, setMouseReTarget] = useState<number>(1)
  const[drawScale, setDrawScale] = useState<number>(1);
  const[canvasScaleFactor, setCanvasScaleFactor] = useState<number>(1)

  const logTangentialPressure = (e: React.PointerEvent) => {
    console.log(e.clientX);
    console.log(e.clientY);
    if (prevPointerEvent) {
      console.log(lerp(prevPointerEvent.clientX, e.clientX, 0.5));
    }
    setPrevPointerEvent(e);

  }

  const startDraw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    const {offsetX, offsetY} = nativeEvent;
    dispatch(beginStroke({x: offsetX / mouseReTarget, y: offsetY / mouseReTarget}));
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
  
  const endDraw = () => {
    if (isDrawing) {
      setMouseDown(false);
      dispatch(endStroke(currentStroke));
      return;
    }
  }

  const zoomOut = () => {
    const {canvas, context} = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    context.scale(drawScale / 2, drawScale/2);
    setDrawScale(drawScale / 2);
    setMouseReTarget(mouseReTarget * 0.5);
    const curCanvasWidth = canvas.width;
    const curCanvasHeight = canvas.height;
    const scale = canvasScaleFactor * 2;
    dispatch(changeCanvasSize({
      width: curCanvasWidth, styleWidth: curCanvasWidth / scale, 
      height: curCanvasHeight, styleHeight: curCanvasHeight / scale}))
    setCanvasScaleFactor(scale);
  }

  const zoomIn = () => {
    const {canvas, context} = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    context.scale(drawScale * 2, drawScale * 2);
    setDrawScale(drawScale * 2);
    setMouseReTarget(mouseReTarget * 2);
    const curCanvasWidth = canvas.width;
    const curCanvasHeight = canvas.height;
    const scale = canvasScaleFactor / 2;
    dispatch(changeCanvasSize({
      width: curCanvasWidth, styleWidth: curCanvasWidth / scale, 
      height: curCanvasHeight, styleHeight: curCanvasHeight / scale}))
    setCanvasScaleFactor(scale);
  }

  const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = nativeEvent;
    if (!isDrawing) {
      return;
    }
    if (isDrawSquare) {


    }
    dispatch(updateStroke({x: offsetX / mouseReTarget, y: offsetY / mouseReTarget}));
  }

  useEffect(() => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    setCanvasSize(canvas, {width: 100, height: 100, styleWidth: 100, styleHeight: 100});
    //Rounds areas around adjacent points. 
    context.lineJoin = "round"
    context.direction = "ltr"
    context.lineCap = "round"
    context.strokeStyle = "red"
    context.lineWidth = 20;
    clearCanvas(canvas, "white")
    dragRefWith(windowRef, titleBarRef)
    resizeRefWith(windowRef, windowRef);
    //resizeRefWith(canvasRef, "canvas");
    resizeRefWith(canvasContainerRef, canvasContainerRef);

  }, [])

  useEffect(() => {
    const {context} = getCanvasWithContext();
    if (!context) {
      return;
    }
    console.log(context?.strokeStyle)
    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color)
    })
  }, [currentStroke])

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
  }, [canvasSize])




  return (<div>
    <div className="window" style={{
      "height": "500px", 
      "width": "500px", 
      "position": "relative", 
      "top": "10px",
      "left": "10px"}} ref={windowRef}>
      <div className='title-bar' ref={titleBarRef}>
        <div className='title-bar-text' style={{"margin": "0.25rem"}}>Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <div 
        className="canvas_wrapper" 
        style={{
          "width": canvasSize.width, 
          "height": canvasSize.height}}
        ref={canvasContainerRef}
      >
        <canvas 
          onPointerDown={logTangentialPressure}
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={draw}
          ref={canvasRef} />
      </div>
      <button style={{"margin": "20px"}} onClick={expandCanvas}>Increase Size</button>
      <button style={{"margin": "20px"}} onClick={shrinkCanvas}>Decrease Size</button>    
      <button style={{"margin": "20px"}} onClick={zoomOut}>Zoom Out</button>
      <button style={{"margin": "20px"}}>Zoom In</button>
    </div> 
    <ColorPanel/>
    </div>
  );
}

export default App;