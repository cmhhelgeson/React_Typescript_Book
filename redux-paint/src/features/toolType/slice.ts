import { createSlice } from "@reduxjs/toolkit";
import {RootState, ToolType} from "../../utils/types"

import {Point } from "../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";



const initialState: RootState["toolType"] = "DRAW" as ToolType

const toolTypeSlice = createSlice({
    name: "toolType",
    initialState, 
    reducers: {
        changeToolType: (state, action: PayloadAction<ToolType>) => {
            return action.payload;
        }
    }, 
})

export const toolType = toolTypeSlice.reducer
export const {
    changeToolType
} = toolTypeSlice.actions

export const toolTypeSelector = (state: RootState) => state.toolType;