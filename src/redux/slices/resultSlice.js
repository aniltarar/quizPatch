import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  examPaper: [],
  correctAnswers: [],
};




export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExamPaperByUserID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExamPaperByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.examPaper = action.payload;
      })
      .addCase(getExamPaperByUserID.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCorrectAnswersByExamID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCorrectAnswersByExamID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.correctAnswers = action.payload
      })
      .addCase(getCorrectAnswersByExamID.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const getExamPaperByUserID = createAsyncThunk(
  "result/getExamPaperByUserID",
  async (userID) => {
    const examPaperRef = collection(db, "examPapers");

    const examPaperSnapshot = await getDocs(examPaperRef);

    const examPaper = examPaperSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const currentUserPapers = examPaper.filter(
      (exampaper) => exampaper.userID === userID
    );
    return currentUserPapers;
  }
);

export const getCorrectAnswersByExamID = createAsyncThunk(
  "result/getCorrectAnswersByExamID",
  async (examID) => {
    const examRef = collection(db, "exams");
    const examSnapshot = await getDocs(examRef);

    const exam = examSnapshot.docs.map((doc) => ({
      id: doc.id,
      questionsAnswers: doc.data().questions.map((question) => question.correctAnswer),
    }));
    return exam;
  }
);


export const { setResults } = resultSlice.actions;
export default resultSlice.reducer;
