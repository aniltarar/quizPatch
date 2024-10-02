const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  exams: [],
  currentExam: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const examSlice = createSlice({
    name:"exams",
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
    }

})