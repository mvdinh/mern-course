import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGird";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilter } from "../redux/Slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null); 

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilter({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(res.data);
      } catch (err) {
        console.error("Error fetching best seller product:", err);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  // Theo dõi sự thay đổi của bestSellerProduct
  useEffect(() => {
    if (!bestSellerProduct) {
      console.log("Best Seller Product is undefined or empty!");
    } else {
      console.log("Updated Best Seller:", bestSellerProduct);
      console.log("id", bestSellerProduct._id)
    }
  }, [bestSellerProduct]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4 mt-12">Best Seller</h2>
      {bestSellerProduct && bestSellerProduct._id ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center text-red-500">
          {bestSellerProduct === null
            ? "Loading best seller product..."
            : "Không tìm thấy sản phẩm Best Seller!"}
        </p>
      )}

      {/* Top Wears for Women */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      {/* Feature Collection */}
      <FeaturedCollection />
    </div>
  );
};

export default Home;
