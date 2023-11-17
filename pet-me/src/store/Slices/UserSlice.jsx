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
        },

        addPet: (state,action) => {
            let new_pet = action.payload
            let old_pets = state.currentUser.pets.filter(obj => obj.id != new_pet.id)
            state.currentUser.pets =  [...old_pets, new_pet]
        }
    }
})

export const {setCurrUser, clearCurrUser, addPet} = UserSlice.actions
export default UserSlice.reducer;