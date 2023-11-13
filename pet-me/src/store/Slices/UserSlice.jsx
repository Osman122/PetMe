import {createSlice} from '@reduxjs/toolkit'

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
            state.currentUser =  {}
        }
    }
})

export const {setCurrUser, clearCurrUser} = UserSlice.actions
export default UserSlice.reducer;