import React, { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../src/Context";
import "./SearchForm.css";

const SearchForm = () => {
  // Destructure necessary values from global context
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  // Create a reference for the search input field
  const searchText = useRef("");
  const navigate = useNavigate();
  // Set focus on the search input field on component mount
  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the search term from the input field
    let tempSearchTerm = searchText.current.value.trim();
    // If the search term contains only special characters or whitespace, set a default search term
    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setSearchTerm("the lost world");
      setResultTitle("Please Enter Something ...");
    } else {
      // Otherwise, set the search term to the input field value
      setSearchTerm(searchText.current.value);
    }

    navigate("/book");
  };

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="Search here ..."
                ref={searchText}
              />
              <button
                type="submit"
                className="flex flex-c"
                onClick={handleSubmit}
              >
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
