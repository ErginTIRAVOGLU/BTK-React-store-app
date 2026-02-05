import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "../../types/Cart";
import requests from "../../api/apiClient";



const initialState = {
    cart: null as Cart | null,
    status: 'idle' as string
};
type AddItemPayload = {
    productId: string;
    quantity?: number;
    key?: string;
};

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ productId, quantity = 1 }: AddItemPayload) => {
        try {
            return await requests.carts.addItem(productId, quantity);
        }
        catch (error: any) {
            return rejectWithValue(error.response?.data || 'Add item failed');
        }
    }
);

export const deleteItemFromCart = createAsyncThunk(
    'cart/deleteItemFromCart',
    async ({ productId, quantity = 1, key = "" }: AddItemPayload) => {
        try {
            return await requests.carts.removeItem(productId, quantity);
        }
        catch (error: any) {
            return rejectWithValue(error.response?.data || 'Remove item failed');
        }
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.pending, (state, action) => {
                state.status = 'pendingAddItem' + action.meta.arg.productId;
            });

        builder
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.status = 'idle';
            });

        builder
            .addCase(addItemToCart.rejected, (state, action) => {
                state.status = 'idle';
            });


        builder
            .addCase(deleteItemFromCart.pending, (state, action) => {
                state.status = 'pendingDeleteItem' + action.meta.arg.productId + action.meta.arg.key;
            });

        builder
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.status = 'idle';
            });

        builder
            .addCase(deleteItemFromCart.rejected, (state, action) => {
                state.status = 'idle';
            });
    }
});

export const { setCart } = cartSlice.actions;

function rejectWithValue(arg0: any): any {
    throw new Error("Function not implemented.");
}
