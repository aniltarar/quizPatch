import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/userSlice";
import studentReducer from "./slices/studentSlice";
import teacherReducer from "./slices/teacherSlice";
import classReducer from "./slices/classSlice";
import examReducer from "./slices/examSlice";
import resultReducer from "./slices/resultSlice";
import adminReducer from "./slices/adminSlice";
import  feedbackReducer  from "./slices/feedbackSlice";


export const store = configureStore({
  reducer: {
    user: useReducer,
    student: studentReducer,
    teacher: teacherReducer,
    classrooms: classReducer,
    exam: examReducer,
    result: resultReducer,
    feedback: feedbackReducer,
    admin: adminReducer,
  },
});
