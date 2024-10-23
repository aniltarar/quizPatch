import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setVerifiedTeacherByTeacherUID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setVerifiedTeacherByTeacherUID.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setVerifiedTeacherByTeacherUID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(deleteTeacherByTeacherUID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeacherByTeacherUID.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteTeacherByTeacherUID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(deleteStudentByStudentUID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudentByStudentUID.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteStudentByStudentUID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const setVerifiedTeacherByTeacherUID = createAsyncThunk(
  "admin/setVerifiedTeacher",
  async (teacherUID, { rejectWithValue }) => {
    try {
      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTeacherByTeacherUID = createAsyncThunk(
  "admin/deleteTeacher",
  async (teacherUID, { rejectWithValue }) => {
    try {
      const teacherRef = doc(db, "teachers", teacherUID);
      await deleteDoc(teacherRef);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStudentByStudentUID = createAsyncThunk(
  "admin/deleteStudent",
  async (studentUID, { rejectWithValue }) => {
    try {
      const studentRef = doc(db, "students", studentUID);
      await deleteDoc(studentRef);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const {} = adminSlice.actions;

export default adminSlice.reducer;
