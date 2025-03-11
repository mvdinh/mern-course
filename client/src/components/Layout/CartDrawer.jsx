import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CartDrawer = ({ drawerOpen, tonggleCart }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCloseDrawer = () => {
    tonggleCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
    tonggleCart();

  };

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg 
      transform transition-transform duration-300 flex flex-col z-50 
      ${drawerOpen ? 'hiden' : 'translate-x-full'}`}>

      {/* Nút đóng giỏ hàng */}
      <div className='flex justify-end p-4'> 
        <button onClick={handleCloseDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600 cursor-pointer" />
        </button>
      </div>

      {/* Nội dung giỏ hàng */}
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {cart && cart.products && cart.products.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is empty</p>
        )}
      </div>

      {/* Nút thanh toán */}
      {cart && cart.products && cart.products.length > 0 && (
        <div className='p-4 bg-white sticky bottom-0'>
          <button 
            onClick={handleCheckout}
            className='w-full bg-black text-white py-3 rounded-lg font-semibold
            hover:bg-gray-800 transition cursor-pointer'>
            Checkout
          </button>
          <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
            Shipping, taxes, discount codes calculated at checkout
          </p>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
