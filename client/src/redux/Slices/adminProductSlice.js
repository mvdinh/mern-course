import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchAdminProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/products`, {
                headers: {
                    Authorization: TOKEN
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async function to add a new product
export const addAdminProduct = createAsyncThunk(
    "adminProducts/addAdminProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/admin/products`,
                productData,
                {
                headers: {
                    Authorization: TOKEN
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update an existing product
export const updateAdminProduct = createAsyncThunk(
    "adminProducts/updateAdminProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/api/admin/products/${id}`,
                productData,
                {
                headers: {
                    Authorization: TOKEN
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a product
export const deleteAdminProduct = createAsyncThunk(
    "adminProducts/deleteAdminProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/admin/products/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addAdminProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(addAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAdminProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAdminProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload.id
                );
            })
            .addCase(deleteAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminProductSlice.reducer;