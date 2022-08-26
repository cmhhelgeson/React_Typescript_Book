

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


export const setCanvasSize = (canvas: HTMLCanvasElement, width: number, height: number, styleWidth?: number, styleHeight?: number): void => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = styleWidth ? `${styleWidth}px` : `${width}px`
    canvas.style.height = styleHeight ? `${styleHeight}px` : `${height}px`
    canvas.getContext("2d")?.scale(1, 1);
}



//export const clearCanvas = fillCanvas(canvas, "white");