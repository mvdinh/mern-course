import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Helper function to load cart from local storage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : {products: []};
};


//Helper function to save cart to local storage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

//Fetching cart for user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId, guestId },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart");
        }
    }
);


//Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, guestId, productId, quantity, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    userId,
                    guestId,
                    productId,
                    quantity,
                    size,
                    color,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add item to cart");
        }
    }
);


//Update the quantity of an item in the cart for a user or guest
export const updateCartItem = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ userId, guestId, productId, quantity, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    userId,
                    guestId,
                    productId,
                    quantity,
                    size,
                    color,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cart item");
        }
    }
);


//Remove an item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", 
    async ({ userId, guestId, productId, size, color }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            data: { userId, guestId, productId, size, color },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove item from cart");
    }
});

//Merge guest cart into user cart
export const mergeCarts = createAsyncThunk(
    "cart/mergeCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                {
                    userId,
                    guestId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to merge carts");
        }
    }
);

//Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers:(builder)=>{
        //Fetching cart
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            saveCartToStorage(action.payload);
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        });

        //Adding to cart
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            saveCartToStorage(state.cart);
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
        });

        //Updating cart item
        builder.addCase(updateCartItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCartItem.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            saveCartToStorage(state.cart);
        });
        builder.addCase(updateCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update cart item";
        });

        //Removing from cart
        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            saveCartToStorage(state.cart);
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item";
        });
    
        //Merging carts
        builder.addCase(mergeCarts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(mergeCarts.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            saveCartToStorage(state.cart);
        });
        builder.addCase(mergeCarts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge carts";
        });
    }
}); 
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;