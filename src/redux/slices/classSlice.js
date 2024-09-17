import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "~/firebase/firebaseConfig";
import { toast } from "react-toastify";



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
  async ({ data, user }) => { 
    try {
      const restStudents = data.students.map(({ classrooms, ...rest }) => rest);
      const restTeachers = data.teachers.map(({ classrooms, ...rest }) => rest);

      const classroomRef = doc(collection(db, "classrooms"));

      await setDoc(classroomRef, {
        className: data.className,
        classDescription: data.classDescription,
        students: restStudents,
        teachers: restTeachers,
      });

      // Öğrenci ve Öğretmen tablosunda classroom'a eklenecek document
      const classRoomData = {
        id: classroomRef.id,
        className: data.className,
        classDescription: data.classDescription,
        teachers: restTeachers,
        students: restStudents,
      };

      console.log(classRoomData);

      const teachers = data.teachers;
      for (const teacher of teachers) {
        const teacherRef = doc(db, "teachers", teacher.uid);
        await updateDoc(teacherRef, {
          classrooms: arrayUnion(classRoomData),
        });
      }

      const students = data.students;
      for (const student of students) {
        const studentRef = doc(db, "students", student.uid);
        await updateDoc(studentRef, {
          classrooms: arrayUnion(classRoomData),
        });
      }


        const userRef = doc(db, "users", user.uid);

        await updateDoc(userRef, {
        classrooms: arrayUnion(classRoomData),
        });
      

      toast.success("Sınıf başarıyla eklendi");
    } catch (error) {
      const message = error.message || "Bir hata meydana geldi";
      toast.error(message);
      return isRejectedWithValue({ message });
      
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

