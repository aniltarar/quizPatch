import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '~/firebase/firebaseConfig'

const initialState = {
  teachers: [],
  isLoading : false,
  isSuccess : false,
  isError : false,
  message : ""
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher : (state,action) => {
      state.teachers = action.payload
    },
    reset : (state) => {
      state.isLoading = false,
      state.isSuccess = false,
      state.isError = false,
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllTeachers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getAllTeachers.fulfilled, (state,action) => {
      state.isSuccess = true
      state.isLoading = false
      state.teachers = action.payload
    })
    .addCase(getAllTeachers.rejected, (state,action) => {
      state.isError = true
      state.message = action.error.message || "Bir Hata Meydana Geldi"
    })
  }
})

export const getAllTeachers = createAsyncThunk("teachers/getAllTeachers", async() => {
  const teachersRef = collection(db,"teachers")
  const snapshot = await getDocs(teachersRef)
  const teachersData = snapshot.docs.map((teacher) => ({
    id : teacher.id,
    ...teacher.data()
  }))
  return teachersData
})


export const { setTeacher } = teacherSlice.actions

export default teacherSlice.reducer