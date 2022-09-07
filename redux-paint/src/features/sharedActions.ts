import {createAction} from "@reduxjs/toolkit"
import { Stroke } from "../utils/types"

type EndStrokePayload = {
    stroke: Stroke,
    historyIndex: number
}
export const endStroke = createAction<EndStrokePayload>("endStroke");