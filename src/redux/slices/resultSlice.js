import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  examPaper: {},
  allExamPapers: [],
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
        state.allExamPapers = action.payload;
      })
      .addCase(getExamPaperByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(getExamPaperByExamPaperID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExamPaperByExamPaperID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.examPaper = action.payload;
      })
      .addCase(getExamPaperByExamPaperID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(getCorrectAnswersByExamID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCorrectAnswersByExamID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.correctAnswers = action.payload;
      })
      .addCase(getCorrectAnswersByExamID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const getExamPaperByUserID = createAsyncThunk(
  "result/getExamPaperByUserID",
  async (userID, { rejectWithValue }) => {
    try {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getExamPaperByExamPaperID = createAsyncThunk(
  "result/getExamPaperByExamPaperID",
  async (id, { rejectWithValue }) => {
    try {
      const examPaperRef = doc(db, "examPapers", id);
      const examPaperDoc = await getDoc(examPaperRef);

      if (!examPaperDoc.exists()) {
        throw new Error("Exam paper not found");
      }

      const examPaperData = {
        id: examPaperDoc.id,
        ...examPaperDoc.data(),
      };
      return examPaperData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCorrectAnswersByExamID = createAsyncThunk(
  "result/getCorrectAnswersByExamID",
  async (examID, { rejectWithValue }) => {
    try {
      const examRef = doc(db, "exams", examID);
      const examSnapshot = await getDoc(examRef);

      if (!examSnapshot.exists()) {
        throw new Error("Exam not found");
      }

      const examData = examSnapshot.data();
      const questionsAnswers = examData.questions.map(
        (question) => question.correctAnswer
      );

      const exam = {
        id: examID,
        questionsAnswers,
      };

      return exam;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const { setResults } = resultSlice.actions;
export default resultSlice.reducer;
