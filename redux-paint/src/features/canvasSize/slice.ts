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
            const {width, height, styleWidth, styleHeight} = action.payload;
            state.width = width;
            state.height = height;
            state.styleWidth = styleWidth;
            state.styleHeight = styleHeight;
        }
    },
});

export const canvasSize = canvasSizeSlice.reducer;
export const {changeCanvasSize}  = canvasSizeSlice.actions;
export const canvasSizeSelector = (state: RootState) => state.canvasSize;