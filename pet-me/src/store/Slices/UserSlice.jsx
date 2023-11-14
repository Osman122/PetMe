import {createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const Initial_State = {
    currentUser: {},
    synced: false
}

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: Initial_State,
    reducers:{
        setCurrUser: (state,action) => {
            state.currentUser = action.payload
            state.synced = true
        },

        clearCurrUser: (state,action) => {
            Cookies.remove('access')
            Cookies.remove('refresh')
            state.synced = false
            state.currentUser =  {}
        }
    }
})

export const {setCurrUser, clearCurrUser} = UserSlice.actions
export default UserSlice.reducer;