import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.products));

    },
    
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.products));

    },
    resetcart: (state) => {
      state.products = [];
      localStorage.setItem('cart', JSON.stringify(state.products));

    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity++;
        localStorage.setItem('cart', JSON.stringify(state.products));

      }
      

    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1 && state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity--;
        localStorage.setItem('cart', JSON.stringify(state.products));

      }
    }
  },
});

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_CART_DATA':
      return {
        ...state,
        products: action.payload
      };
    // Other cases for addToCart, removeItem, etc.
    default:
      return state;
  }
};

// Action creators are generated for each case reducer function
export const { addToCart, resetcart, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;