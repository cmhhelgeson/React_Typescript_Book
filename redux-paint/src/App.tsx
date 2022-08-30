import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { beginStroke, currentStrokeSelector, updateStroke } from './features/currentStroke/slice';
import { endStroke } from './features/sharedActions';
import {clearCanvas, restoreSnapshot, setCanvasSize} from "./utils/drawUtils"
import { Point, RootState} from './utils/types';
import { dragRefWith, resizeRefWith} from './utils/windowUtils';

import interact from 'interactjs';
import { canvasSizeSelector, changeCanvasSize } from './features/canvasSize/slice';

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


function App() {
  //JSX Element Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  //Utilities
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {canvas, context: canvas?.getContext("2d")}
  }

  //Define state selectors and objects
  const isDrawing = useSelector<RootState>((state) => !!state.currentStroke?.points.length);
  const currentStroke = useSelector(currentStrokeSelector);
  const canvasSize = useSelector(canvasSizeSelector)
  const dispatch = useDispatch();

  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isDrawSquare, setIsDrawSquare] = useState<boolean>(false);

  const startDraw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    const {offsetX, offsetY} = nativeEvent;
    dispatch(beginStroke({x: offsetX, y: offsetY}));
  }

  const expandCanvas = () => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    console.log("zoom")
    const imgSrc = canvas.toDataURL();
    const prevWidth: number = canvas.width;
    const prevHeight: number = canvas.height;
    const newWidth = canvas.width * 1.5;
    const newHeight = canvas.width * 1.5;
    dispatch(changeCanvasSize({
      width: newWidth, styleWidth: newWidth, 
      height: newHeight, styleHeight: newHeight}))
    setCanvasSize(canvas, canvas.width * 1.5, canvas.height * 1.5);
    clearCanvas(canvas, "white");
    let img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, prevWidth, prevHeight, 0, 0, prevWidth, prevHeight);
    }
    img.src = imgSrc;
  }
  
  const shrinkCanvas = () => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    console.log("zoom");
    const imgSrc = canvas.toDataURL();
    setCanvasSize(canvas, canvas.width / 1.5, canvas.height / 1.5);
    clearCanvas(canvas, "white");
    restoreSnapshot(canvas, "DATA_URL", imgSrc);
  }
  
  const endDraw = () => {
    if (isDrawing) {
      setMouseDown(false);
      dispatch(endStroke(currentStroke));
      return;
    }
  }

  const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = nativeEvent;
    if (!isDrawing) {
      return;
    }
    if (isDrawSquare) {


    }
    dispatch(updateStroke({x: offsetX, y: offsetY}));
  }

  useEffect(() => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    setCanvasSize(canvas, WIDTH, HEIGHT);
    //Rounds areas around adjacent points. 
    context.lineJoin = "round"
    context.direction = "ltr"
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 20;
    clearCanvas(canvas, "white")
    dragRefWith(windowRef, "title-bar")
    resizeRefWith(windowRef, "window");
    resizeRefWith(canvasRef, "canvas");

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



  return (  
    <div className="window" style={{
      "height": "500px", 
      "width": "500px", 
      "position": "relative", 
      "top": "10px",
      "left": "10px"}} ref={windowRef}>
      <div className='title-bar'>
        <div className='title-bar-text' style={{"margin": "0.25rem"}}>Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <div 
        id="canvas_wrapper" 
        style={{
          "width": canvasRef.current ? canvasRef.current.width : "100px", 
          "height": canvasRef.current ? canvasRef.current.height : "100px"}}>
        <canvas 
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={draw}
          ref={canvasRef} />
      </div>
      <button style={{"margin": "20px"}} onClick={expandCanvas}>Increase Size</button>
      <button onClick={shrinkCanvas}>Decrease Size</button>
      
    </div> 
  );
}

export default App;