import {createSlice} from '@reduxjs/toolkit';

let taskSlice = createSlice({
    name: 'task',
    initialState:{
        value: ""
    },
    reducers:{
        taskinfo: (state, action) =>{
            state.value = action.payload

        }
    }
})

export const {taskinfo} = taskSlice.actions;
export default taskSlice.reducer;