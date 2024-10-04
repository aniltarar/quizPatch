import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  exams: [],
  currentExam: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};


export const examSlice = createSlice({
    name:"exam",
    initialState,
    reducers:{
        setExams:(state,action)=>{
            state.exams = action.payload
        },
        setCurrentExam:(state,action)=>{
            state.currentExam = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addToExam.pending,(state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(addToExam.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.exams = action.payload
        })
        .addCase(addToExam.rejected,(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        })
        .addCase(getMyExamsForTeacher.pending,(state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(getMyExamsForTeacher.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.exams = action.payload
        })
        .addCase(getMyExamsForTeacher.rejected,(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        })
    }
})

export const addToExam = createAsyncThunk("exams/addToExam", async(exam,{rejectWithValue}) => {
    try {
        const examsRef = doc(collection(db,"exams"))
        await setDoc(examsRef,{
            examID:examsRef.id,
            ...exam
            
        })
        console.log("Exam added successfully");
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)
    }
})

    export const getMyExamsForTeacher = createAsyncThunk("exams/getMyExamsForTeacher", async(userID,{rejectWithValue}) => {
        try {
            const examsRef = collection(db,"exams")
            const examsSnapshot = await getDocs(examsRef)
            const exams = examsSnapshot.docs.map((doc)=>({...doc.data()}))
            const filteredMyExams = exams.filter((exam)=>exam.addedUser===userID);
            return filteredMyExams
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    })

    export const deleteExamByID = createAsyncThunk("exams/deleteExamByID",async(examID,{rejectWithValue})=>{
        try {
            const examRef = doc(db,"exams",examID)
            await deleteDoc(examRef)
            console.log("Exam deleted successfully");
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    })

    
export const { setCurrentExam,setExams } = examSlice.actions;
export default examSlice.reducer;
