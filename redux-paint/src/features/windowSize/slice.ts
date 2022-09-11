import { createSlice } from "@reduxjs/toolkit";
import {RootState, WidthHeight} from "../../utils/types"
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: RootState["windowSize"] = {
    width: 500,
    height: 500
}

const windowSizeSlice = createSlice({
    name: "windowSize",
    initialState, 
    reducers: {
        changeWindowSize: (state, action: PayloadAction<WidthHeight>) => {
            return action.payload;
        }
    }
});


export const windowSize = windowSizeSlice.reducer;

export const {
    changeWindowSize
} = windowSizeSlice.actions

export const windowSizeSelector = (state: RootState) => state.windowSize;