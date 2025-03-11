import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

export const fetchOrders = createAsyncThunk("adminOrder/fetchOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/orders`, {
            headers: {
                Authorization: TOKEN,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const updateOrder = createAsyncThunk("adminOrder/updateOrder", 
    async ({ id, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/orders/${id}`,
            {status}, 
            {
            headers: {
                Authorization: TOKEN,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteOrder = createAsyncThunk("adminOrder/deleteOrder", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/orders/${id}`, {
            headers: {
                Authorization: TOKEN,
            },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//Slice
const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState: {
        orders: [],
        totalOrders:0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Fetch all orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;

                //caculate total sales
                const totalSales = action.payload.reduce((acc, order)=>{
                    return acc + order.totalPrice;
                }, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //Update Order Status
            .addCase(updateOrder.fulfilled, (state, action) => {
                const updateOrder = action.payload;
                console.log("Update order: ", action.payload)
                const orderIndex = state.orders.findIndex(order => order._id === action.payload._id);
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updateOrder;
                }
            })

            //Delete Order
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order._id !== action.payload);
            })
    },
});

export default adminOrderSlice.reducer;