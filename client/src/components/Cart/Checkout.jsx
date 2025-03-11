import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/Slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=> state.auth);

    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    const handleCreateCheckout = async(e) => {
        e.preventDefault();
        if(cart && cart.products.length> 0){
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Paypal",
                    totalPrice: cart.totalPrice,
                })
            )
            if (res.payload && res.payload._id){
                setCheckoutId(res.payload._id); // Set checkout ID if checkout was successful
                console.log("CheckoutId: ",checkoutId );
            }
        }
    };
    // Dùng cho PayPal
    // const handlePaymentSuccess = async (details) => {
    //     try {
    //         await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
    //             {
    //                 paymentStatus : "paid",
    //                 paymentDetails: details,
    //             },
    //             {
    //                 headers:{
    //                     Authorization: `Bearer ${localStorage.getItem("userToken")}`
    //                 }
    //             }
    //         );
    //         await handleFinalizeCheckout(checkoutId);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };
    const handlePaymentSuccess = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                {
                    paymentStatus : "paid",
                    paymentDetails:{
                        "transactionId":"tem12",
                        "paymentGateway":"PayPal",
                        "amount":19,
                        "currency":"USD"
                    },
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            await handleFinalizeCheckout(checkoutId);
        } catch (error) {
            console.log(error)
        }
    };

    const handleFinalizeCheckout =  async(checkoutId) =>{
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            navigate("/order-confirmation");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            {/* Left Section */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user ? user.email : ""}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>

                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstname}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstname: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastname}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastname: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Country</label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type="submit" className="w-full bg-black text-white py-3 rounded">
                                Continue to Payment
                            </button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                                <button
                                className="border text-xs border-mb mb-4 p-3 cursor-pointer" 
                                onClick={handlePaymentSuccess}
                                >
                                    Thanh toán
                                </button>
                                {/* PayPal Component */}
                                {/* <PayPalButton
                                    amount={cart.totalPrice}
                                    onSuccess={handlePaymentSuccess}
                                    onError={() => alert("Payment failed. Try again.")}
                                /> */}
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Right Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t border-gray-200 py-4 mb-4">
                    {cart.products.map((product, index) => (
                        <div key={index} className="flex items-start justify-between py-2 border-b border-gray-200">
                            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4" />
                            <div>
                                <h3 className="text-md">{product.name}</h3>
                                <p className="text-gray-500">Size: {product.size}</p>
                                <p className="text-gray-500">Color: {product.color}</p>
                            </div>
                            <p className="text-xl">${product.price}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-200 pt-4 " >
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};
export default Checkout;
