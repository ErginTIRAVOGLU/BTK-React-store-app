import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "../../types/Cart";

const initialState = {
    cart :null as Cart | null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
        }
    }
});

export const {setCart} = cartSlice.actions;