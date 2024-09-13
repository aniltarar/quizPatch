import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teachers: [],
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher : (state,action) => {
      state.teachers = action.payload
    }
  },
})


export const { setTeacher } = teacherSlice.actions

export default teacherSlice.reducer