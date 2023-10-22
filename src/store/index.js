import { configureStore, createSlice } from "@reduxjs/toolkit";
//import { toast } from "react-toastify";
import { userSlice } from "./userSlice";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filtedProducts: [],
  },

  reducers: {
    installValue(state, action) {
      state.items = action.payload;
      console.log(state.items);
    },
    filtedProd(state, action) {
      state.filtedProducts = action.payload;
    },
  },
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    isVisible: false,
  },
  reducers: {
    addCart(state, action) {
      let product = action.payload;
      function addProduct() {
        let b = [];
        b.push(product);
        state.items = [...state.items, ...b];
        state.totalPrice += product.price;
      }
      if (state.items.length > 0) {
        let check = state.items.find((e) => e.name == product.name);
        if (check) {
          check.quantity++;
          state.totalPrice += product.price;
          console.log(state.totalPrice);
        } else {
          addProduct();
        }
      } else {
        addProduct();
      }
      state.totalQuantity++;
    },
    updateCart(state, action) {
      let check = state.items.find((e) => e.name == action.payload.name);
      console.log(check.quantity);
      if (check.quantity < action.payload.quantity) {
        state.totalPrice += check.price;
        state.totalQuantity++;
      } else if (check.quantity > action.payload.quantity) {
        state.totalPrice -= check.price;
        state.totalQuantity--;
      }
      check.quantity = action.payload.quantity;
    },
    deleteProduct(state, action) {
      // console.log(action.payload.name);
      let check = state.items.filter((e) => e.name !== action.payload.name);
      state.items = check;
      state.totalPrice -= action.payload.sumPrice;
      state.totalQuantity--;
    },
    clearCart(state) {
      state.items = [],
      state.totalQuantity = 0,
      state.totalPrice = 0,
      state.isVisible = false
      
    },
   },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    products: productsSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const productsActions = productsSlice.actions;
export default store;
