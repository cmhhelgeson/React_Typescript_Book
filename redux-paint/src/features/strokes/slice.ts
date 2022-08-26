
import { RootState } from "../../utils/types";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";
import { Stroke } from "../../utils/types";

const initialState: RootState["strokes"] = [];

const strokesSlice = createSlice({
    name: "strokes",
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state, action: PayloadAction<Stroke>) => {
            const stroke = action.payload;
            state.push(stroke);
        })
    }
})

export const strokes = strokesSlice.reducer;

export const strokesSelector = (state: RootState) => state.strokes;