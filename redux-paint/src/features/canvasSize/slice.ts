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


const canvasSizeSlice = createSlice({
    name: "canvasSize", 
    initialState,
    reducers: {
        zoom: (state, action: PayloadAction<CanvasSize>) => {
            state = action.payload;
        }
    },
});