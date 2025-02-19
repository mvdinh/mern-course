import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const newArrivals = [
        { _id: "1", name: "Nike Air Force 1", price: 120, img: [{ url: "https://picsum.photos/500/500?random=1", altText: "Nike Air Force 1" }] },
        { _id: "2", name: "Nike Air Force 2", price: 120, img: [{ url: "https://picsum.photos/500/500?random=2", altText: "Nike Air Force 2" }] },
        { _id: "3", name: "Nike Air Force 3", price: 120, img: [{ url: "https://picsum.photos/500/500?random=3", altText: "Nike Air Force 3" }] },
        { _id: "4", name: "Nike Air Force 4", price: 120, img: [{ url: "https://picsum.photos/500/500?random=4", altText: "Nike Air Force 4" }] },
        { _id: "5", name: "Nike Air Force 5", price: 120, img: [{ url: "https://picsum.photos/500/500?random=5", altText: "Nike Air Force 5" }] },
    ];

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = direction === "left" ? -300 : 300;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Update Scroll Buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        updateScrollButtons(); // Initialize button states

        container.addEventListener("scroll", updateScrollButtons);
        return () => container.removeEventListener("scroll", updateScrollButtons);
    }, []);

    return (
        <section>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>

                {/* Scroll Buttons */}
                <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                    <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border bg-white text-black ${!canScrollLeft && "opacity-50 cursor-not-allowed"}`}>
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button onClick={() => scroll("right")} disabled={!canScrollRight} className={`p-2 rounded border bg-white text-black ${!canScrollRight && "opacity-50 cursor-not-allowed"}`}>
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Scroll Content */}
            <div ref={scrollRef} 
            className="container mx-auto overflow-x-auto flex space-x-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 scrollbar-thumb-rounded"
            >
                {newArrivals.map((product) => (
                    <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                        <img src={product.img[0]?.url} alt={product.img[0]?.altText || product.name} className="w-full h-[500px] object-cover rounded-lg" />
                        <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                            <Link to={`/products/${product._id}`} className="block">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="mt-1">${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
