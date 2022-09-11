import { rejects } from "assert"
import { canvasSize } from "../features/canvasSize/slice"

export const getCanvasImage = (
    canvas: HTMLCanvasElement | null
): Promise<null | Blob> => {
    return new Promise((resolve, reject) => {
        if (!canvas) {
            return reject(null)
        }
        canvas.toBlob(resolve)
    })
}