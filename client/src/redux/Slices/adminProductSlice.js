import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk để lấy danh sách sản phẩm admin
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchAdminProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`
                },
            });
            console.log("Admin", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi khi lấy sản phẩm!");
        }
    }
);

// Async thunk để thêm sản phẩm mới
export const addAdminProduct = createAsyncThunk(
    "adminProducts/addAdminProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi khi thêm sản phẩm!");
        }
    }
);

// Async thunk để cập nhật sản phẩm
export const updateAdminProduct = createAsyncThunk(
    "adminProducts/updateAdminProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi khi cập nhật sản phẩm!");
        }
    }
);

// Async thunk để xóa sản phẩm
export const deleteAdminProduct = createAsyncThunk(
    "adminProducts/deleteAdminProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`
                    },
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi khi xóa sản phẩm!");
        }
    }
);

// Slice quản lý sản phẩm admin
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
            // Fetch
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
                state.error = action.payload || "Lỗi không xác định!";
            })

            // Add
            .addCase(addAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })

            // Update
            .addCase(updateAdminProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                console.log(action.payload)
            })

            // Delete
            .addCase(deleteAdminProduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            });
    },
});

export default adminProductSlice.reducer;
