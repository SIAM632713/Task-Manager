import {createSlice} from "@reduxjs/toolkit";
export const summarySlice=createSlice({
    name:"summary",
    initialState:{
        value:[]
    },
    reducers:{
        Setsummary:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const {Setsummary}=summarySlice.actions;
export default summarySlice.reducer;