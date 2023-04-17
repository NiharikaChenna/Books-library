import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Pages/Loader/Loader";
import coverImg from "../../Assets/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// URL for fetching book details from OpenLibrary API
const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  // Get the book ID from the URL using useParams hook
  const { id } = useParams();

  // State variables for loading state and book data
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  // Navigate hook for navigating back to the book list page
  const navigate = useNavigate();

  // Fetch book details on component mount and when ID changes
  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        // Fetch book details from OpenLibrary API
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        // If book details are found, extract relevant information and update state
        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;
          const newBook = {
            description: description
              ? description.value
              : "No description found",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          // If no book details are found, set book state to null
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  // Show loading component if book details are still being fetched
  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/book")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <span>{book?.description}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subject Places: </span>
              <span className="text-italic">{book?.subject_places}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subject Times: </span>
              <span className="text-italic">{book?.subject_times}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
