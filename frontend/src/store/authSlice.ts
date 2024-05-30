import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserStateType, UserType } from "@/lib/interface";

const initialState: UserStateType = {
  username: "",
  _id: "",
  authorizationToken: [],
  profileImage: `${process.env.NEXT_PUBLIC_BACKEND_URL}/pfp/default_pfp.svg`, // Assuming that we are using image links
  highscore: 0,
  differentImageSrc: "",
  differentImageFile: {} as File,
  otherProfileImages: [],
  authenticated: false, // change this when done with testing back to false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, values) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(values),
      })
        .then(async (res) => {
          const data = await res.json();

          const userData: UserType = data;

          state.username = userData.username;
          state.authorizationToken = userData.tokens;
          state.highscore = userData.highscore;
          state.authenticated = true;
          state._id = userData._id;
          // closes dialog on submit
        })
        .catch((err) => {
          throw new Error("Username or Password is incorrect");
          setloginError("Username or Password is incorrect");
        });
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
