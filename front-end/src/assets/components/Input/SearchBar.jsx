import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ pages }) => {
  const [value, setValue] = useState(""); // Search query
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setValue(e.target.value); // Update search value
    setShowDropdown(true); // Show dropdown while typing
  };

  const handleClearSearch = () => {
    setValue(""); // Clear search input
    setShowDropdown(false); // Hide dropdown
  };

  const handleNavigate = (path) => {
    navigate(path); // Navigate to the selected page
    setShowDropdown(false); // Hide dropdown after navigation
    setValue(""); // Clear search input
  };

  // Filter pages based on search query
  const filteredPages = Object.keys(pages).filter((page) =>
    page.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative w-80">
      {/* Search Bar */}
      <div className="flex items-center px-4 bg-slate-100 rounded-md">
        <input
          type="text"
          placeholder="Search Pages..."
          className="w-full text-xs bg-transparent py-[11px] outline-none"
          value={value}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(true)} // Show dropdown on focus
        />

        {value && (
          <IoMdClose
            className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
            onClick={handleClearSearch}
          />
        )}

        <FaMagnifyingGlass
          className="text-slate-400 cursor-pointer hover:text-black"
          onClick={() =>
            filteredPages.length === 1
              ? handleNavigate(pages[filteredPages[0]])
              : setShowDropdown(true)
          }
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-10 bg-white shadow-lg rounded-md mt-1 w-full max-h-48 overflow-y-auto">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <div
                key={page}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleNavigate(pages[page])}
              >
                {page}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No matching pages found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
