export type Point = {
    x: number
    y: number
}

export type Stroke = {
    points: Point[];
    color: string;
}


export type CanvasSize = {
    width: number, 
    height: number,
    styleWidth: number, 
    styleHeight: number
}

export type RootState = {
    canvasSize: CanvasSize;
    strokes: Stroke[];
    currentStroke: Stroke
}
