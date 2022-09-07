import { RootState } from "../../utils/types";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";

const initialState: RootState["historyIndex"] = 0;

const historyIndexSlice = createSlice({
    name: "strokes",
    initialState, 
    reducers: {
        undo: (state, action: PayloadAction<number>) => {
            return Math.min(state + 1, action.payload)
        },
        redo: (state, action: PayloadAction<number>) => {
            return Math.max(state - 1, action.payload)
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state) => {
            return 0;
        })
    }
})


export const historyIndex = historyIndexSlice.reducer;
export const {
    undo, 
    redo
} = historyIndexSlice.actions
export const historyIndexSelector = (state: RootState) => state.historyIndex;
