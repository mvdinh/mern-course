import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import productsReducer from "./Slices/productsSlice";
import cartReducer from "./Slices/cartSlice";
import checkoutReducer from "./Slices/checkoutSlice";
import orderReducer from "./Slices/orderSlice"
import adminReducer from "./Slices/adminSilce"
import adminProductReducer from "./Slices/adminProductSlice";
import adminOrderReducer from "./Slices/adminOrderSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
  },
});

export default store;
