import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGird";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen , setIsSidebarOpen] = useState(false);

  const tonggleSidebar = () =>{
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleClickOutside =(e)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
        setIsSidebarOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        { _id: 1, name: "Product 1", price: 100, images: [{ url: "https://picsum.photos/500/500?random=1" }] },
        { _id: 2, name: "Product 2", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
        { _id: 3, name: "Product 3", price: 150, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
        { _id: 4, name: "Product 4", price: 200, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
        { _id: 5, name: "Product 5", price: 180, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
        { _id: 6, name: "Product 6", price: 210, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
        { _id: 7, name: "Product 7", price: 190, images: [{ url: "https://picsum.photos/500/500?random=7" }] },
        { _id: 8, name: "Product 8", price: 170, images: [{ url: "https://picsum.photos/500/500?random=8" }] },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);



  return (
    <div className="flex flex-col lg:flex-row p-4">
        {/* Mobile Filter Button */}
        <button 
        onClick={tonggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center">
            <FaFilter className="mr-2" />
            <h1>Hello</h1>
        </button>
        {/* Filter Sidebar */}
        <div
        ref={sidebarRef}
        className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto 
            transition-transform duration-300 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:static lg:translate-x-0
        `}
        >
            <FilterSidebar />
        </div>

        <div className="flex-grow-4">
            <h2 className="text-2xl uppercase mb-4">
                All Collection 
            </h2>

            {/* Sort Options */}
            <SortOptions/>

            {/* Product Grids */}
            <ProductGrid products={products}/>

        </div>

      
    </div>
  );
};

export default CollectionPage;
