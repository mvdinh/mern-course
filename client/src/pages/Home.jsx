import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGird"

const placeholderProducts =[
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
  {
    _id :1,
    name:"product 5",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
  {
    _id :2,
    name:"product 6",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
  {
    _id :3,
    name:"product 7",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
  {
    _id :4,
    name:"product 8",
    price:100,
    images:[
      {url: "https://picsum.photos/500/500?random=4"}
    ]
  },
]
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Besy Seller */}
      <h2 className="text-3x text-center font-bold mb-4">
        Best Seller
      </h2>
      <ProductDetails />

      {/* Top Wears for Women*/}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts}/>
      </div>
       
      {/*Feature Collection */}
      <FeaturedCollection/>
    </div>
  )
}

export default Home
