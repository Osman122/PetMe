import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './Slices/UserSlice'

export default configureStore({
    reducer:{
        currentUser: UserSlice
    }
})