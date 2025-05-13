import {createSlice} from "@reduxjs/toolkit";
export const settingsSlice =createSlice({
    name: "settings",
    initialState: {
        loader: "hidden" // Tailwind class for hiding elements
    },
    reducers: {
        ShowLoader: (state) => {
            state.loader = ""; // show loader
        },
        HideLoader: (state) => {
            state.loader = "hidden"; // hide loader
        }
    }
})

export const {ShowLoader,HideLoader}=settingsSlice.actions
export default  settingsSlice.reducer;