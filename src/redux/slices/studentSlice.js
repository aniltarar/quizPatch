import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [],
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent : (state,action) => {
      state.students = action.payload
    }
  },
})


export const { setStudent } = studentSlice.actions

export default studentSlice.reducer