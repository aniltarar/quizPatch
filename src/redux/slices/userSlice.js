import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state,action) => {
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("user")
    }
    
  },
})




export const { setUser,logout } = userSlice.actions

export default userSlice.reducer