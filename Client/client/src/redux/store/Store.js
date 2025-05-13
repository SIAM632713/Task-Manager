import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/Setting-Slice.js"
import taskSlice from "../state-slice/Task-Slice.js"
import summaryReducer from "../state-slice/Summary-Slice.js"
import profileReducer from "../state-slice/Profile-Slice.js"

export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskSlice,
        summary:summaryReducer,
        Profile:profileReducer
    }
})