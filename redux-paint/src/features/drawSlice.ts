import {createSlice} from "@reduxjs/toolkit"
import { RootState, Point, Stroke } from "../utils/types"

const initialState: RootState["currrentStroke"] = {
    points: [],
    color: "#000"
}


//Creates a slice that only deals with the currentStroke of the rootState
const currentStrokeSlice = createSlice({
    name: "currentStroke",
    initialState,
    reducers: {
        beginStroke: (state, action) => {
            state.points = [action.payload];
        },
        updateStroke: (state, action) => {
            state.points.push(action.payload);
        },
        setStrokeColor: (state, action) => {
            state.color = action.payload;
        }
    }, 
    /*//In extraReducer, we define actions that are shared between multiple
    //components of the state. endStroke is an action that both clears
    //the currentStroke and adds a stroke to the Strokes List
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state) => {
            state.points = [];
        })
    }, */
})