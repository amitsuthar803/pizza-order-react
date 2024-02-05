import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "GarlicBread",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      //manually calling reducer -> simply delete the item if quantity goes less than 0
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// exporting reducer itself
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

// redux selector function and it starts with get keyword and have in centerallized in slice file.
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// this will add all pizza price in cart and return us total value of all pizza
// to optimize 'reselect' library to optimize above selecor
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// this will return current pizza quantity if exist if not it simply return 0
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
