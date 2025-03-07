import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGird";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchProductsByFilter} from "../redux/Slices/productsSlice"

const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state)=> state.products);

  //  Với mảng [['param1', 'value1'], ['param2', 'value2']],
  //  hàm Object.fromEntries() sẽ tạo ra đối tượng { param1: 'value1', param2: 'value2' }.
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(()=>{
    dispatch(fetchProductsByFilter({collection, ...queryParams}))
  }, [dispatch, collection, searchParams])
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

  return (
    <div className="flex flex-col lg:flex-row p-4">
        {/* Mobile Filter Button */}
        <button 
        onClick={tonggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center">
            <FaFilter className="mr-2" />
            <h1>Filter</h1>
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
            <ProductGrid products={products} loading={loading} error={error}/>

        </div>

      
    </div>
  );
};

export default CollectionPage;
