import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teacher: [],
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
  },
})

export const {  } = teacherSlice.actions

export default teacherSlice.reducer