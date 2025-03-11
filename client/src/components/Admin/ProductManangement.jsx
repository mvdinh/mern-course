import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAdminProduct, fetchAdminProducts } from "../../redux/Slices/adminProductSlice";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state)=>state.adminProduct)

    useEffect(()=>{
        dispatch(fetchAdminProducts())
    }, [dispatch])

    const handleDeleteUser = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteAdminProduct(productId))
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                        <tr>
                            <th className="px-5 py-4 text-left">Name</th>
                            <th className="px-5 py-4 text-left">Price ($)</th>
                            <th className="px-5 py-4 text-left">SKU</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr
                                    key={product._id}
                                    className=" hover:bg-gray-50 transition"
                                >
                                    <td className="px-5 py-4 text-gray-900 font-medium">
                                        {product.name}
                                    </td>
                                    <td className="px-5 py-4 text-gray-700">${product.price}</td>
                                    <td className="px-5 py-4 text-gray-700">{product.sku}</td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                to={`/admin/products/${product._id}/edit`}
                                                className="bg-yellow-500 text-white w-24 py-2 rounded-md text-center hover:bg-yellow-600 transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteUser(product._id)}
                                                className="bg-red-500 text-white w-24 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-5 py-6 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
