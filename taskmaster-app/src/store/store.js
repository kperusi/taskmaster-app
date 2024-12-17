import {configureStore} from '@reduxjs/toolkit'
import { taskSlice } from './taskSlice'
import taskReducer from '../store/taskSlice'
export default configureStore({
    reducer:{
        tasks:taskReducer,
    },
})