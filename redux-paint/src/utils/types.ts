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


export type ShapeToolType = 
    "TRIANGLE_EQUILATERAL" | "TRIANGLE_RIGHT" |
    "DIAMOND" | "PENTAGON" | "HEXAGON" | 
    "ARROW_RIGHT" | "ARROW_LEFT" | "ARROW_DOWN" | "ARROW_UP" |
    "STAR_FOUR_SIDES" | "STAR_FIVE_SIDES" | "STAR_SIX_SIDES" |
    "SPEECH_SQUARE" | "SPEECH_CIRCLE" | "SPEECH_CLOUD" |
    "HEART" | "LIGHTNING";

export type ToolType = ShapeToolType | "PENCIL" |
    "FILL" | "TEXT" | "ERASER" | "COLOR_PICKER" |
    "MAGNIFIER";

export type ShapeOutlineType = "NONE" | "SOLID" | "CRAYON" |
"MARKER" | "OIL" | "NATURAL_PENCIL" | "WATERCOLOR"


export type RootState = {
    canvasSize: CanvasSize;
    strokes: Stroke[];
    currentStroke: Stroke
}
