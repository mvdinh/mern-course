import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form reload trang
    console.log("Search Term:", searchTerm);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 
      ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-100 px-4 py-2 rounded-lg w-full 
                        focus:outline-none placeholder:text-gray-700"
            />
            {/* Search Icon */}
            <button
              type="submit"
              className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 
              text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* Close Icon */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer
                       hover:text-gray-800">
                <HiMiniXMark className="h-6 w-6" />
            </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className="p-2 cursor-pointer">
          <HiMagnifyingGlass className="h-6 w-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
