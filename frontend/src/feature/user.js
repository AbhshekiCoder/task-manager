import {createSlice} from '@reduxjs/toolkit';


let userSlice = createSlice({
    name: 'user',
    initialState:{
        value: ""
    },
    reducers:{
        userInfo: (state, action) =>{
            state.value = action.payload

        }
    }
})

export const {userInfo} = userSlice.actions;
export default userSlice.reducer;
