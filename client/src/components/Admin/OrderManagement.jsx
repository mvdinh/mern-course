const OrderManagement = () => {
    const orders = [
        {
            _id: 123,
            user: {
                name: "Dinh",
            },
            totalPrice: 110,
            status: "Processing",
        },
    ];

    const handleStatus = (orderId, status) => {
        console.log("Updated Order:", orderId, "Status:", status);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Order Management</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                        <tr>
                            <th className="px-5 py-4 w-[120px] text-center">Order ID</th>
                            <th className="px-5 py-4 w-[150px] text-center">Customer</th>
                            <th className="px-5 py-4 w-[150px] text-center">Total Price ($)</th>
                            <th className="px-5 py-4 w-[140px] text-center">Status</th>
                            <th className="px-5 py-4 w-[200px] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-4 text-gray-900 font-medium text-center">
                                        {order._id}
                                    </td>
                                    <td className="px-5 py-4 text-gray-700 text-center">{order.user.name}</td>
                                    <td className="px-5 py-4 text-gray-700 text-center">${order.totalPrice}</td>
                                    <td className="px-4 py-4 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatus(order._id, e.target.value)}
                                            className="tẽbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md
                                            focus:ring-blue-500 focus:border-blue-500 block p-2 w-[120px]"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleStatus(order._id, "Delivered")}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition
                                            shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                        >
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-5 py-6 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
