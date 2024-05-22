import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/cart/add/?customerid=1';

export const addToCartAPI = async (cartItem) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error adding the item to the cart:", error);
    throw error;
  }
};

const initialState = {
  userInfo: [],
  products: [],
};

const orebiSlice = createSlice({
  name: 'orebi',
  initialState,
  reducers: {
    addToCartSuccess: (state, action) => {
      const item = state.products.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(item => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(item => item._id !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    setCartItems: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  addToCartSuccess,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  setCartItems,
} = orebiSlice.actions;

export const addToCart = (cartItem) => async (dispatch) => {
  try {
    const addedItem = await addToCartAPI(cartItem);
    dispatch(addToCartSuccess(addedItem));
    dispatch(showSuccessMessage('Product added to cart successfully!'));
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    dispatch(showErrorMessage('Failed to add product to cart.'));
  }
};

export default orebiSlice.reducer;
