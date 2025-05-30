import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "../feature/mode.js"
import userSlice from "../feature/user.js"
import taskSlice from "../feature/task.js"
export const store = configureStore({
    reducer:{
        mode:  modeSlice,
        user: userSlice,
        task: taskSlice
    },
   
})

