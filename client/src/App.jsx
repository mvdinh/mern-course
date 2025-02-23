import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from "sonner"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManangement from "./components/Admin/ProductManangement";
import EditProduct from "./components/Admin/EditProduct";
import OrderManagement from "./components/Admin/OrderManagement";

const App = () =>{
  return (
    <BrowserRouter>
      {/* use package sonner*/}
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<UserLayout />} >
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>} ></Route>
          <Route path="register" element={<Register/>} ></Route>
          <Route path="profile" element={<Profile/>} ></Route>
          <Route path="collections/:collection" element={<CollectionPage/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="checkout" element={<Checkout/> }/>
          <Route path="order-confirmation" element={<OrderConfirmationPage/> }/>
          <Route path="order/:id" element={<OrderDetailPage/>}/>
          <Route path="my-orders" element={<MyOrderPage/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminHomePage/>} />
          <Route path="users" element={<UserManagement/>} />
          <Route path="products" element={<ProductManangement/>} />
          <Route path="products/:id/edit" element={<EditProduct/>} />
          <Route path="orders" element={<OrderManagement/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;