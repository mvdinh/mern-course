import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGird from "./ProductGird";

const selectedProduct ={
    name: "Product Name",
    price: 120,
    originalPrice: 150,
    description: "Product Description",
    brand: "Fashion Brand",
    material: "100% Cotton",
    sizes:["S", "M", "L", "XL"],
    color:["Black", "White", "Red"],
    images:[
        {url: "https://picsum.photos/500/500?random=1", altText: "Product Image 1"},
        {url: "https://picsum.photos/500/500?random=2", altText: "Product Image 2"},
        {url: "https://picsum.photos/500/500?random=3", altText: "Product Image 3"},
        {url: "https://picsum.photos/500/500?random=4", altText: "Product Image 4"},
    ]
}

const similarProducts =[
  {
    _id :1,
    name:"product 1",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
  {
    _id :2,
    name:"product 2",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
  {
    _id :3,
    name:"product 3",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
  {
    _id :4,
    name:"product 4",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
]
const ProductDetails = () => {
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    useEffect(() => {
      if (selectedProduct.images.length > 0) {
        setMainImage(selectedProduct.images[0].url);
      } else {
        setMainImage(null); // Tránh đặt giá trị rỗng
      }
    }
    , [selectedProduct]);

    const handleQuantityChange = (action )=>{
      if(action === "plus") setQuantity((prev) => prev + 1)
      if(action === "minus") setQuantity((prev) => prev -1)
    }

    const handleAddToCart = () =>{
      if(!selectedColor || !selectedSize){
        toast.error("Please select a size and color before adding to cart.",{
          duration: 1000,
        });
        return;
      }

      setIsButtonDisabled(true);

      setTimeout (()=>{
        toast.success("Product added to cart!",{
          duration :1000,
        });
        setIsButtonDisabled(false);
      }, 500)
    }
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img 
                  key={index}
                  src={image.url}
                  alt={image.altText || image.name}
                  className={`w-16 h-16 object-cover cursor-pointer rounded-lg border
                  ${mainImage === image.url ?  "border-1 border-black": "border-gray-300"}
                  `}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
  
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt={selectedProduct.images[0].altText || selectedProduct.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
  
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img 
                  key={index}
                  src={image.url}
                  alt={image.altText || image.name}
                  className="w-16 h-16 object-cover cursor-pointer rounded-lg border"
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
  
            {/* Right Side */}
            <div className="md:w-1/2 md:ml-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedProduct.name}</h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
              </p>
              <p className="text-2xl text-gray-500 mb-2">${selectedProduct.price}</p>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
  
              {/* Colors */}
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.color.map((color, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-full border cursor-pointer
                      ${selectedColor === color ? "border-2 border-black": "border-gray-300"}`
                      }
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.9)",
                      }}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
  
              {/* Sizes */}
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button 
                    key={size} 
                    className={`px-4 py-2 rounded border cursor-pointer
                    ${selectedSize === size ? "bg-black text-white":""}`
                    }
                    onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button 
                  onClick={()=> handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer"
                  >-</button>
                  <span>{quantity}</span>
                  <button 
                  onClick={()=> handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer"
                  >+</button>
                </div>
              </div>
  
              {/* Add to Cart Button */}
              <button
              onClick={()=>handleAddToCart()}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer
              ${
                isButtonDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-900"
              }`}
              >
              {
                isButtonDisabled
                ? "ADDING..."
                : "ADD TO CART"
              }
              </button>
  
              {/* Characteristics */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand:</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material:</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            
          {/* You May Also Like */}
          <div className="mt-20">
              <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
              </h2>
              <ProductGird products={similarProducts}/>
          </div>

        </div>
      </div>
    );
  };
  
  export default ProductDetails;
  