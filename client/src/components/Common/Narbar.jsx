import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const tonggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    const tonggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-2xl font-medium">
                        Hello
                    </Link>
                </div>

                {/* Center - Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
                    <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
                    <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
                    <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
                </div>

                {/* Right - Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/profile" className="text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700" />
                    </Link>

                    <button onClick={tonggleCartDrawer} className="relative hover:text-black cursor-pointer">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-1 bg-[var(--rabbit-red)] text-white text-xs rounded-full px-2 py-0.5">
                            4
                        </span>
                    </button>

                    {/* Search */}
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={tonggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>

                    {/* Cart Drawer */}
                    <CartDrawer drawerOpen={drawerOpen} tonggleCartDrawer={tonggleCartDrawer} />

                    {/* Mobile Navigation Drawer */}
                    <div className={`fixed top-0 left-0 w-2/5 sm:w-1/2 md:w-1/3 h-full bg-white z-50 transform transition-transform duration-300
                    ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex justify-end p-4">
                            <button onClick={tonggleNavDrawer}>
                                <IoMdClose className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>
                        {/* Add menu links */}
                        <nav className="flex flex-col space-y-4 p-6">
                            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
                            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
                            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
                            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
                        </nav>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
