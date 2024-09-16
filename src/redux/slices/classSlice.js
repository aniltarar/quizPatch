import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  classrooms: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const classSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {
    setClassrooms: (state, action) => {
      state.classrooms = action.payload;
    },

    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClassroom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classrooms = action.payload;
      })
      .addCase(addClassroom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error.message || "Bir Hata Meydana Geldi";
      })
      .addCase(getClassrooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassrooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classrooms = action.payload;
      })
      .addCase(getClassrooms.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error.message || "Bir Hata Meydana Geldi";
      });
  },
});

export const addClassroom = createAsyncThunk(
  "classrooms/addClassroom",
  async (data) => {
    try {
      const classroomRef = doc(collection(db, "classrooms"));
      await setDoc(classroomRef, data);
      console.log("Başarıyla Veritabanına sınıf Eklendi");
    } catch (error) {
      console.error("Error adding classroom:", error);
      throw error;
    }
  }
);
export const getClassrooms = createAsyncThunk(
  "classrooms/getClassrooms",
  async () => {
    try {
      const allClassroomsRef = collection(db, "classrooms");
      const snapshot = await getDocs(allClassroomsRef);
      const classroomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return classroomsData;
    } catch (error) {
      console.log("Error getting classrooms", error);
    }
  }
);

export const { reset, setClassrooms } = classSlice.actions;

export default classSlice.reducer;
