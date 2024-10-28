import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  feedbacks: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFeedbacks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.feedbacks = action.payload;
      })
      .addCase(getFeedbacks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const feedbacksRef = doc(collection(db, "feedbacks"));
      await setDoc(feedbacksRef, {
        id: feedbacksRef.id,
        ...feedbackData,
      });
      toast.success("Geri bildiriminiz başarıyla alındı.");
    } catch (e) {
      toast.error("Bir hata oluştu", rejectWithValue(e));
      return rejectWithValue(e);
    }
  }
);

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async (userId) => {
    try {
      const feedbacksRef = collection(db, "feedbacks");
      const q = query(feedbacksRef, where("userId", "==", userId));
      const feedbacksSnapshot = await getDocs(q);
      const feedbacks = feedbacksSnapshot.docs.map((doc) => doc.data());
      return feedbacks;
    } catch (e) {
      toast.error("Bir hata oluştu");
    }
  }
);

export const { setFeedbacks } = feedbackSlice.actions;
export default feedbackSlice.reducer;
