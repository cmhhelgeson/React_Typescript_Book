
import { RootState } from "../../utils/types";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";
import { Stroke } from "../../utils/types";



type EndStrokePayload = {
    stroke: Stroke
    historyIndex: number
}

const initialState: RootState["strokes"] = [];

const strokesSlice = createSlice({
    name: "strokes",
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state, action: PayloadAction<EndStrokePayload>) => {
            const {stroke, historyIndex} = action.payload;
            if (historyIndex === 0) {
                state.push(stroke);
            } else {
                state.splice(-historyIndex, historyIndex, stroke)
            }
        })
    }
})

export const strokes = strokesSlice.reducer;
export const strokesSelector = (state: RootState) => state.strokes;
export const strokesLengthSelector = (state: RootState) => state.strokes.length;