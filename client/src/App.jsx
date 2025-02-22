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
      </Routes>
    </BrowserRouter>
  )
}

export default App;