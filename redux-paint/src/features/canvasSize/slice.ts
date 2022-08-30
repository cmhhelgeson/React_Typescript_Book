import { createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../utils/types"

import {Point, CanvasSize} from "../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";


const initialState: RootState["canvasSize"] = {
    width: 100, 
    height: 100,
    styleWidth: 100,
    styleHeight: 100,
}


export const canvasSizeSlice = createSlice({
    name: "canvasSize", 
    initialState,
    reducers: {
        changeCanvasSize: (state, action: PayloadAction<CanvasSize>) => {
            state = action.payload;
        }
    },
});

export const canvasSize = canvasSizeSlice.reducer;
export const {changeCanvasSize}  = canvasSizeSlice.actions;
export const canvasSizeSelector = (state: RootState) => state.canvasSize;