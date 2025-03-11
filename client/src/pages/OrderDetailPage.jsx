import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/Slices/orderSlice";

const OrderDetailPage = () => {
  const { id } = useParams();
  const {orderDetails} = useSelector((state)=>state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found.</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>

          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          {/* Product List */}
<div className="overflow-x-auto">
  <h4 className="text-lg font-semibold mb-4">Products</h4>
  <table className="min-w-full table-fixed text-gray-600 mb-4">
    <thead className="bg-gray-100">
      <tr>
        <th className="py-2 px-4 w-1/3 pl-30 text-left">Name</th>
        <th className="py-2 px-4 w-1/6 text-center">Unit Price</th>
        <th className="py-2 px-4 w-1/6 text-center">Quantity</th>
        <th className="py-2 px-4 w-1/6 text-center">Total</th>
      </tr>
    </thead>
    <tbody>
      {orderDetails.orderItems.map((item) => (
        <tr key={item.productId} className="border-b">
          <td className="py-2 px-4 flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-lg"
            />
            <Link
              to={`/product/${item.product}`}
              className="text-blue-500 hover:underline truncate w-40"
            >
              {item.name}
            </Link>
          </td>
          <td className="px-2 py-4 text-center">${item.price.toFixed(2)}</td>
          <td className="px-2 py-4 text-center">{item.quantity}</td>
          <td className="px-2 py-4 text-center">
            ${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* Back To Orders Link */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
