import React from "react";
import { useGlobalContext } from "../../Context";
import Book from "../Book";
import Loading from "../../Pages/Loader/Loader";
import coverImg from "../../Assets/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
  // Destructure necessary data from global context using useGlobalContext hook
  const { books, loading, resultTitle } = useGlobalContext();
  // Map through each book in the books array and return a new array with modified book objects
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: singleBook.id.replace("/works/", ""),
      cover_img: singleBook.cover_id
        ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
        : coverImg,
    };
  });
  // Show loading component if books are still being fetched
  if (loading) return <Loading />;

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {/* Map through each book in the booksWithCovers array and return a Book component for each */}
          {booksWithCovers.slice(0, 30).map((item, index) => {
            return <Book key={index} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default BookList;
