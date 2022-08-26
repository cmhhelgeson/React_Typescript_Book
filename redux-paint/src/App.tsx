import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { beginStroke, currentStrokeSelector, updateStroke } from './features/currentStroke/slice';
import { endStroke } from './features/sharedActions';
import {clearCanvas, setCanvasSize} from "./utils/drawUtils"
import { Point, RootState} from './utils/types';

import interact from 'interactjs';

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
    /* if (idx % 50 === 0 && idx !== 0) {
      context.closePath();
      context.beginPath();
      context.moveTo(points[idx].x, points[idx].y);
    } */
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
  const canvasSize = useSelector<RootState>((state) => state.canvasSize)
  const dispatch = useDispatch();

  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [beginOffset, setBeginOffset] = useState<number[]>([0, 0]);
  const [isMovingWindow, setIsMovingWindow] = useState<boolean>(false);

  const startDraw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    const {offsetX, offsetY} = nativeEvent;
    dispatch(beginStroke({x: offsetX, y: offsetY}));
  }

  const zoomIn = () => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    console.log("zoom")
    const imgSrc = canvas.toDataURL();
    const prevWidth: number = canvas.width;
    const prevHeight: number = canvas.height;
    setCanvasSize(canvas, canvas.width * 1.5, canvas.height * 1.5);
    clearCanvas(canvas, "white");
    let img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, prevWidth, prevHeight, 0, 0, prevWidth, prevHeight);
    }
    img.src = imgSrc;
  }
  
  const zoomOut = () => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    console.log("zoom");
    const imgSrc = canvas.toDataURL();
    setCanvasSize(canvas, canvas.width / 1.5, canvas.height / 1.5);
    clearCanvas(canvas, "white");
    let img = new Image();
    img.onload = () => {context.drawImage(img, 0, 0);}
    img.src = imgSrc;
  }

  const onMouseDownTitleBar = ({nativeEvent}: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setIsMovingWindow(true);
    const {clientX, clientY} = nativeEvent;
    if (windowRef.current) {
      setBeginOffset([
        windowRef.current.offsetLeft - clientX,
        windowRef.current.offsetTop - clientY
      ]);
    }
  }

  const onMouseMoveTitleBar = ({nativeEvent}: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDown) {
      const {clientX, clientY} = nativeEvent;
      if (windowRef.current) {
        windowRef.current.style.left = clientX + beginOffset[0] + 'px'
        windowRef.current.style.top = clientY + beginOffset[1] + 'px'
      }
    }
  }

  const onMouseUpTitleBar = ({nativeEvent}: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false);
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
      const {canvas} = getCanvasWithContext();
      if (!canvas) {
        return;
      }
      if (offsetX >= WIDTH - 20 && offsetY >= HEIGHT - 20) {
        console.log("zone")
      }
      return;
    }
    //const {offsetX, offsetY} = nativeEvent;
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
    clearCanvas(canvas, "white");

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


  const titleBar = interact('.title-bar').draggable({
    listeners: {
      start(event) {
        console.log("start")
      },
      move(event) {
        if (windowRef.current) {
          const leftInt = parseInt(windowRef.current.style.left.slice(0, -2))
          const topInt = parseInt(windowRef.current.style.top.slice(0, -2))
          windowRef.current.style.left = leftInt + event.dx + 'px';
          windowRef.current.style.top = topInt + event.dy + 'px';
        }
      }
    }
  });



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
      <canvas 
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
        ref={canvasRef} />
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
      
    </div> 
  );
}

export default App;

/*onMouseDown={onMouseDownTitleBar}
        onMouseMove={onMouseMoveTitleBar}
        onMouseUp={onMouseUpTitleBar} */