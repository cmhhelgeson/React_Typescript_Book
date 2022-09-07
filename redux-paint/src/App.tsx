/* REACT IMPORTS */
import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
/* REDUCER FEATURES */
import { 
  beginStroke, 
  currentStrokeSelector, 
  updateStroke
} from './features/currentStroke/slice';
import { 
  canvasSizeSelector, 
  changeCanvasSize 
} from './features/canvasSize/slice';
import { 
  undo, 
  historyIndexSelector
} from './features/historyIndex/slice';
import { 
  strokes,
  strokesLengthSelector, 
  strokesSelector
} from './features/strokes/slice';
import { 
  endStroke 
} from './features/sharedActions';

/* UTILITIES */
import {clearCanvas, restoreSnapshot, setCanvasSize, drawStroke} from "./utils/drawUtils"
import { Point, RootState} from './utils/types';
import {resizeRefWith} from './utils/windowUtils';
/* COMPONENTS */
import { ColorPanel } from './components/ColorPanel';
import { GenericXPWindow } from './components/GenericXPWindow';


const WIDTH = 100;
const HEIGHT = 100;

function App() {
  //JSX Element Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  //Utilities
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {canvas, context: canvas?.getContext("2d")}
  }

  //Define state selectors and objects
  const isDrawing = useSelector<RootState>((state) => !!state.currentStroke?.points.length);
  const currentStroke = useSelector(currentStrokeSelector);
  const strokes = useSelector(strokesSelector);
  const canvasSize = useSelector(canvasSizeSelector)
  const historyIndex = useSelector(historyIndexSelector);
  const strokesLength = useSelector(strokesLengthSelector)
  const dispatch = useDispatch();


  //Local State Variables
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseReTarget, setMouseReTarget] = useState<number>(1) //don't use this
  const[drawScale, setDrawScale] = useState<number>(1);
  const[canvasScaleFactor, setCanvasScaleFactor] = useState<number>(1)

  //INTERNAL DRAWING FUNCTIONS
  const startDraw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    const {offsetX, offsetY} = nativeEvent;
    dispatch(beginStroke({x: offsetX / mouseReTarget, y: offsetY / mouseReTarget}));
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
    dispatch(updateStroke({x: offsetX / mouseReTarget, y: offsetY / mouseReTarget}));
  }

  const drawComb = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = nativeEvent;
    if (!isDrawing) {
      return;
    }
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    const bristleCount = Math.round(20 / 3);
    const gap = 20;
    dispatch(updateStroke({
      x: (offsetX + 0 * gap) / mouseReTarget, 
      y: (offsetY + 0 * gap) / mouseReTarget
    }));
    dispatch(updateStroke({
      x: (offsetX + 1 * gap) / mouseReTarget, 
      y: (offsetY + 1 * gap) / mouseReTarget
    }));
    dispatch(updateStroke({
      x: (offsetX + 2 * gap) / mouseReTarget, 
      y: (offsetY + 2 * gap) / mouseReTarget
    }));
    dispatch(updateStroke({
      x: (offsetX + 3 * gap) / mouseReTarget, 
      y: (offsetY + 3 * gap) / mouseReTarget
    }));

  }

  //CANVAS RESIZING AND EXPANSION FUNCTIONS
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


  const onUndo = () => {
    dispatch(undo(strokesLength));
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

  //CONDITIONAL EFFECTS
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
    //resizeRefWith(canvasRef, "canvas");
    resizeRefWith(
      canvasContainerRef, canvasContainerRef, 
      canvasSize.width, canvasSize.height, 
      1000, 800 
    );

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
    if (!canvas || !context) {
      return;
    }

    requestAnimationFrame(() => {
      clearCanvas(canvas, "white")
      strokes.slice(0, strokes.length - historyIndex).
      forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color)
      })

    })

  }, [historyIndex])

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
    <GenericXPWindow text={"Paint"}>
      <div 
        className="canvas_wrapper" 
        style={{
          "width": canvasSize.styleWidth, 
          "height": canvasSize.styleHeight}}
        ref={canvasContainerRef}
      >
        <canvas 
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={drawComb}
          ref={canvasRef} />
      </div>
      <button style={{"margin": "20px"}} onClick={expandCanvas}>Increase Size</button>
      <button style={{"margin": "20px"}} onClick={shrinkCanvas}>Decrease Size</button>    
      <button style={{"margin": "20px"}} onClick={zoomOut}>Zoom Out</button>
      <button style={{"margin": "20px"}} onClick={zoomIn}>Zoom In</button>
      <button style={{"margin": "20px"}} onClick={onUndo}>Undo</button>
    </GenericXPWindow>
    <ColorPanel/>
    </div>
  );
}

export default App;