import {createSlice} from '@reduxjs/toolkit';

let modeSlice = createSlice({
    name: 'mode',
    initialState:{
        value: localStorage.getItem("mode") || "white"
    },
    reducers:{
        modeToggle: (state, action) =>{
            state.value = action.payload

        }
    }
})

export const {modeToggle} = modeSlice.actions;
export default modeSlice.reducer;


