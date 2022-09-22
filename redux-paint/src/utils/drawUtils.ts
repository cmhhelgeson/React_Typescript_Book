import { getCanvasImage } from "./canvasUtils";
import {CanvasSize, Point} from "./types"


type SnapshotMethod = "DATA_URL" | "IMAGE_DATA"

export const updateCanvas = () => {
    const canvas = document.getElementById('c');
}

export const clearCanvas = (canvas: HTMLCanvasElement, color: string) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return
    }
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


export const setCanvasSize = (canvas: HTMLCanvasElement, cs: CanvasSize): void => {
    canvas.width = cs.width;
    canvas.height = cs.height;
    canvas.style.width = `${cs.styleWidth}px`
    canvas.style.height = `${cs.styleHeight}px`
    canvas.getContext("2d")?.scale(1, 1);
}


export const restoreSnapshot = (canvas: HTMLCanvasElement, method: SnapshotMethod = "DATA_URL", snapshot: ImageData | string): void => {
    switch(method) {
        case "DATA_URL": {
            if (typeof snapshot !== 'string') {
                console.error("Snapshot has incompatible data type for chosen method");
                return;
            }
            const img = new Image();
            const ctx = canvas.getContext("2d");
            img.onload = () => ctx?.drawImage(img, 0, 0)
            img.src = snapshot;
            return;
        }
        case "IMAGE_DATA": {
            const ctx = canvas.getContext("2d");
            if (snapshot instanceof ImageData) {
                ctx?.putImageData(snapshot, 0, 0);
            } else {
                console.error("Snapshot has incompatible data type for chosen method");
                return;
            }
        }
    }


}

export const drawStroke = (
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



  
export const drawCombStroke = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    points: Point[],
    color: string
) => {
    if (!points.length) {
        return;
    }

    //Attempting to correctly draw the stroke by directly manipulating the imageData
    //context.strokeStyle = color;
    //context.beginPath();
    //Get the data for the entire canvas
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height);
    //Get RGB data for the first pixel;
    const prevR = canvasData.data[0];
    const prevG = canvasData.data[1];
    const prevB = canvasData.data[2]
    const prevA = canvasData.data[3];
    //Fill First Pixel and get RGBA for color
    context.fillStyle = color
    context.fillRect(0, 0, 1, 1);
    const rgba = context.getImageData(0, 0, 1, 1).data;
    //Fix modified pixel
    context.fillStyle = `rgba(${prevR}, ${prevG}, ${prevB}, ${prevA})`;
    context.fillRect(0, 0, 1, 1);

    points.forEach((point) => {
        const index = (point.x + point.y * canvas.width) * 4
        canvasData.data[index + 0] = rgba[0];
        canvasData.data[index + 1] = rgba[1];
        canvasData.data[index + 2] = rgba[2];
        canvasData.data[index + 3] = rgba[3];
    })
    context.putImageData(canvasData, 0, 0);

    /* context.moveTo(points[0].x, points[0].y)
    points.forEach((point, idx) => {
        context.moveTo(point.x, point.y)
        context.lineTo(point.x, point.y);
        context.stroke();
    })
    context.stroke();
    context.closePath(); */
}

export const drawSquareStroke = (
    context: CanvasRenderingContext2D,
    points: Point[],
    color: string,
    snapshot: string
) => {
    const img = new Image();
    img.onload = () => context?.drawImage(img, 0, 0)
    img.src = snapshot;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    //context.beginPath();
    points.forEach((point, idx) => {
      context.lineTo(point.x, point.y);
    })
    context.lineTo(points[0].x, points[0].y)
    //context.closePath();
    //Callings stroke ater moving the line to new point significantly
    //Improves performance
    context.stroke();
    context.closePath();
}


//export const clearCanvas = fillCanvas(canvas, "white");