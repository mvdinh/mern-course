import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/Slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  const { user } = useSelector((state) => state.auth);

  const handleBackToHome = () => navigate("/");

  const clearUserCart = async () => {
    try {
      if (checkout && checkout._id) {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/all`, {
          data: { userId: user._id },
        });
        dispatch(clearCart()); // Ensure Redux store is also updated
        localStorage.removeItem("cart");
        console.log("Cart cleared after order confirmation.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id && user?._id) {
      clearUserCart();
    } else {
      navigate("/my-orders");
    }
  }, [checkout, user?._id, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 bg-white mb-10">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for your order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            <div>
              <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-emerald-700 text-sm">
              Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
            </div>
          </div>
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-5 text-right">
            <p className="text-sm text-gray-500">Total Price: ${checkout.totalPrice}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Paypal</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">{checkout.shippingAddress.address}</p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-10 text-left">
        <p
          onClick={handleBackToHome}
          className="text-lg text-gray-500 underline cursor-pointer"
        >
          Back To Home
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
