import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    addClassToUser: (state, action) => {
      const updatedClassrooms = [...state.user.classrooms, action.payload];
      state.user = { ...state.user, classrooms: updatedClassrooms };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { setUser, logout, updateUser, addClassToUser } = userSlice.actions;

export default userSlice.reducer;
