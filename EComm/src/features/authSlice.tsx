import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    email: "",
    password: "",
    isLoggedIn: false,
    isAdmin: false
  },
  reducers: {
    addUser: (state, action) => {
      const { username, email, password } = action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
      state.isLoggedIn = true;
      state.isAdmin = false;
    },

    delUser: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.isLoggedIn = false;
      state.isAdmin = false;
    }
  }
})

export const { addUser, delUser } = authSlice.actions;
export default authSlice.reducer;