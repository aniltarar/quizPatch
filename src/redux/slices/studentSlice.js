import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  students: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.students = action.payload;
    },
    reset:(state)=>{
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
        
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error.message || "Bir Hata Meydana Geldi"
      });
  },
});

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async () => {
    const studentsRef = collection(db, "students");
    const snapshot = await getDocs(studentsRef);
    const studentsData = snapshot.docs.map((student) => ({
      ...student.data(),
    }));
    return studentsData;
  }
);

export const { setStudent,reset } = studentSlice.actions;

export default studentSlice.reducer;
