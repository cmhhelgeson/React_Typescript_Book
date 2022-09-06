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


//export const clearCanvas = fillCanvas(canvas, "white");