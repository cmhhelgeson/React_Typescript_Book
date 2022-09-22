import { createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../utils/types"

import {Point } from "../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";


const initialState: RootState["currentStroke"] = {
    points: [],
    color: "#000"
}

const currentStrokeSlice = createSlice({
    name: "currentStroke",
    initialState, 
    reducers: {
        beginStroke: (state, action: PayloadAction<Point>) => {
            state.points = [action.payload];
        },
        updateStroke: (state, action: PayloadAction<Point[]>) => {
            state.points = [...state.points, ...action.payload];
        },
        setStrokeColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload
        },
        updateStrokeSquare: (state, action: PayloadAction<Point>) => {
            const {x, y} = action.payload;
            const topLeftPoint = state.points[0];
            const topRightPoint: Point = {x: x, y: topLeftPoint.y};
            const bottomLeftPoint: Point = {x: topLeftPoint.x, y: y}
            const bottomRightPoint: Point = {x: x, y: y};
            state.points = [topLeftPoint, topRightPoint, bottomRightPoint, bottomLeftPoint];    
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state) => {
            state.points = [];
        })
    }

}) 

export const currentStroke = currentStrokeSlice.reducer 

export const {
    beginStroke, 
    updateStroke, 
    setStrokeColor,
    updateStrokeSquare
} = currentStrokeSlice.actions

export const currentStrokeSelector = (state: RootState) => state.currentStroke