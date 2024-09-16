import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/userSlice'
import studentReducer from './slices/studentSlice'
import teacherReducer from './slices/teacherSlice'



export const store = configureStore({
  reducer: {
    user: useReducer,
    student:studentReducer,
    teacher : teacherReducer
  },
})