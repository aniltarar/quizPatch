import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/userSlice'
import studentReducer from './slices/studentSlice'
import teacherReducer from './slices/teacherSlice'
import classReducer from './slices/classSlice'
import examReducer from './slices/examSlice'
import resultReducer from './slices/resultSlice'





export const store = configureStore({
  reducer: {
    user: useReducer,
    student:studentReducer,
    teacher : teacherReducer,
    classrooms:classReducer,
    exam : examReducer,
    result : resultReducer

  },
})