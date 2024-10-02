import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, setDoc,doc, getDocs,getDoc, query, where, deleteDoc } from "firebase/firestore";
import { set } from "react-hook-form";
import { db } from "~/firebase/firebaseConfig";

const initialState = {
  userClassrooms: [],
  currentClassroom:{},
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const classSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {
    setUserClassrooms:(state,action)=>{
      state.userClassrooms = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getClassromByUserID.pending,(state,action)=>{
      state.isLoading = true
    })
    .addCase(getClassromByUserID.fulfilled,(state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      state.userClassrooms = action.payload
    })
    .addCase(getClassromByUserID.rejected,(state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.error.message
    })
    .addCase(addClassroom.pending,(state,action)=>{
      state.isLoading = true
    })
    .addCase(addClassroom.fulfilled,(state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      // state.userClassrooms.push(action.payload)
    })
    .addCase(addClassroom.rejected,(state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.error.message
    })
    .addCase(deleteClassroomByID.pending,(state,action)=>{
      state.isLoading = true
    })
    .addCase(deleteClassroomByID.fulfilled,(state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      // state.userClassrooms = state.userClassrooms.filter((classroom)=>classroom.id !== action.payload.id)
    })
    .addCase(deleteClassroomByID.rejected,(state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.error.message
    })
    .addCase(getClassByID.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getClassByID.fulfilled, (state, action) => {
      state.isSuccess = true
      state.isLoading = false
      state.isError  = false
      state.currentClassroom = action.payload; // Veriyi state'e kaydediyoruz
      })
    .addCase(getClassByID.rejected, (state) => {
      state.isError = true;
      state.message = error.message
      state.isLoading = false;
      

    });
  }
});

export const addClassroom = createAsyncThunk("addClassroom",async (classroomInfo)=>{
  try{
    const classroomsRef = doc(collection(db,"classrooms"))
    await setDoc(classroomsRef,{
      id: classroomsRef.id,
      ...classroomInfo
    })
    return classroomInfo
  }
  catch(error){
    console.log("addClassroom -> error", error)
  }
})

export const deleteClassroomByID = createAsyncThunk("deleteClassroomByID",async(classroomID)=>{
  try{
    const classroomRef = doc(db,"classrooms",classroomID)
    await deleteDoc(classroomRef)
  } 
  catch(error){
    console.log("deleteClassroomByID -> error", error)
  } 
})

// user id ile o user'a ait sınıfları getirme
export const getClassromByUserID = createAsyncThunk("getClassromByUserID",async (userID)=>{
  try{
        
        const classroomsRef = await getDocs(collection(db, "classrooms"));
        const classrooms = classroomsRef.docs.map((doc) => ({
          ...doc.data()
        }));
        const filteredClassrooms = classrooms.filter((classroom) =>
          classroom.selectedTeacher.some((teacher) => teacher.uid === userID)
        );
        return filteredClassrooms; 
  }
  catch(error){
    console.error("Error fetching classrooms:", error);
  }
}
)

// class id ile sınıf bilgilerini getirme
export const getClassByID = createAsyncThunk("getClassroomByClassroomID",async(id) => {
  try{
      const classRef = doc(db, "classrooms", id);
      const classSnap = await getDoc(classRef);
      return classSnap.data();
  }
  catch(err){
      console.log(err)
}})


export const { setUserClassrooms} = classSlice.actions;

export default classSlice.reducer;
