import { createSlice } from "@reduxjs/toolkit";
import { DB_URL } from "/src/API/firebase";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
    userId: "",
    orders: [],
    cart: "",
    user: [],
  },
  reducers: {
    setActiveUser(state, action) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.orders = action.payload.orders;
      state.cart = action.payload.cart;
      state.displayName = action.payload.displayName;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = "";
      state.orders = "";
      state.cart = "";
      state.displayName = "";
    },
    updateUser(state, action) {
        state.isLoggedIn = true;
        state.name = action.payload.name;
        
        (state.email = action.payload.email),
        (state.userId = action.payload.userId),
        (state.cart = action.payload.cart);
        state.displayName = action.payload.displayName;
    },
  },
});
//function return1 another function/ call dispatch in Root
export const getUserFromDB = (userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(DB_URL + "/users/" + userId + ".json");

      if (!response.ok) {
        throw new Error("Cant get user from DB");
      }

      const data = await response.json();
      return data;
    };

    try {
      const userFromDB = await sendRequest();
      dispatch(
        userSlice.actions.setActiveUser({
          name: userFromDB.name,
          email: userFromDB.email,
          userId: userId,
          cart: userFromDB.cart,
          orders: userFromDB.orders || [],
          displayName: userFromDB.displayName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
