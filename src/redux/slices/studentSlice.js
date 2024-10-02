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


// antrenman
export const addNewStudent = createAsyncThunk("student/addNewStudent", async (student) => {

  try {
    const studentsRef = collection(db, "students");
    await setDoc(studentsRef, student);
    
  } catch (error) {
    console.log(error);

  }
});

export const getStudentByID = createAsyncThunk("student/getStudentByID", async (studentID) => {
  try{
    const studentRef = doc(db,"students",studentID);
    const studentSnap = await getDoc(studentRef);
    return studentSnap.data();
  }
  catch(error){
    console.log(error);
  }
});

export const addLessonToStudent = createAsyncThunk("student/addLessonToStudent", async ({studentID,lessonID}) => {
  try{
    const studentRef = doc(db,"students",studentID);
    await updateDoc(studentRef,{
      lessons: arrayUnion(lessonID)
    })
  }
  catch(error){
    console.log(error);
  }
});
// antrenman sonu


export const { setStudent,reset } = studentSlice.actions;

export default studentSlice.reducer;
