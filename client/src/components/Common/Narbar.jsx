import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/Slices/cartSlice";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart({ userId, guestId }));
    }, [drawerOpen, dispatch, userId, guestId]);

    
    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer = () => {
        setNavDrawerOpen((prev) => !prev);
    };

    const tonggleCart = () => {
        if(!user){
            navigate("/login")
        }else{
            setDrawerOpen((prev) => !prev);
        }
    };
    return (
        <>
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <div>
                    <Link to="/" className="text-2xl font-medium">
                        Hello
                    </Link>
                </div>

                <div className="hidden md:flex space-x-6">
                    <Link to="/collections/all?gender=Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
                    <Link to="/collections/all?gender=Women" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
                    <Link to="/collections/all?category=Top Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
                    <Link to="/collections/all?category=Bottom Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">
                        Admin
                    </Link>
                    <Link to="/profile" className="text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700" />
                    </Link>

                    <button onClick={tonggleCart} className="relative hover:text-black cursor-pointer">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>

                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform transition-transform duration-300
                ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="bg-white w-3/4 h-full shadow-lg p-6">
                    <button onClick={toggleNavDrawer} className="absolute top-4 right-4">
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>

                    <nav className="flex flex-col space-y-4 mt-10">
                        <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer} className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
                        <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
                        <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
                    </nav>
                </div>
            </div>

            <CartDrawer drawerOpen={drawerOpen} tonggleCart={tonggleCart} />
        </>
    );
};

export default Navbar;
