import { HiOutlineTrash } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../redux/Slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  console.log("user, guestId, cart", userId, cart);

  // Handle adding or subtracting quantity in cart
  const handleAddToCart = ({ productId, delta, quantity, size, color }) => {
    console.log("productId, delta, quantity, size, color ", productId, delta, quantity, size, color )
    console.log("Plus")
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItem({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    console.log("Remove");
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart.products.map((product) => (
        <div key={product.productId} className="flex items-center justify-between mb-4 pb-1 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h3>{product.product ? product.product: "undefined"}</h3>
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{product.size}</span>
                <span className="text-sm text-gray-500">{product.color}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold">${product.price.toLocaleString()}</span>
            <div className="flex items-center space-x-2">
              {/* Nút Giảm Số Lượng */}
              <button
                onClick={() =>
                  handleAddToCart({
                    productId: product.product,
                    delta: -1,
                    quantity: product.quantity,
                    size: product.size,
                    color: product.color,
                  })
                }
                disabled={product.quantity <= 1}
                className={`text-gray-500 px-2 py-1 rounded-lg cursor-pointer ${product.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                -
              </button>
              <span>{product.quantity}</span>
              {/* Nút Tăng Số Lượng */}
              <button
                onClick={() =>
                  handleAddToCart({
                    productId: product.product,
                    delta: 1,
                    quantity: product.quantity,
                    size: product.size,
                    color: product.color,
                  })
                }
                className="text-gray-500 px-2 py-1 rounded-lg cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          {/* Nút Xóa */}
          <button
            onClick={() => handleRemoveFromCart(product.product, product.size, product.color)}
            className="text-red-600 px-2 py-1 rounded-lg cursor-pointer hover:bg-red-200"
          >
            <HiOutlineTrash className="h-6 w-6" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
