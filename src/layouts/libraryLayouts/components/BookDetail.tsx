import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFindBookById } from "../hooks/useBookData";
import type { BookResponseModel } from "../hooks/bookModel";
import { loadFavorites, saveFavorites } from "../../../utils/saved";


const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useFindBookById(Number(id));
  const book: BookResponseModel | undefined = data?.data?.book;

  const [favorites, setFavorites] = useState<BookResponseModel[]>([]);

  // Load favorites on mount
  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  // Borrow/Return handler (backend integration later)
  const handleBorrowReturn = () => {
    if (book) {
      console.log(`Borrow/Return book: ${book.title}`);
      // TODO: Call backend API -> update availability
    }
  };

  // Toggle favorite
  const handleFavoriteToggle = () => {
    if (!book) return;
    setFavorites((prev) => {
      let updated;
      if (prev.find((b) => b.id === book.id)) {
        updated = prev.filter((b) => b.id !== book.id);
      } else {
        updated = [...prev, book];
      }
      saveFavorites(updated);
      return updated;
    });
  };

  // Render states
  if (isLoading) return <p className="text-center py-8 text-gray-500">Loading book details...</p>;
  if (isError)
    return <p className="text-center py-8 text-red-500">Error: {(error as Error).message}</p>;
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <svg className="h-8 w-8 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-gray-600">Book not found</p>
            <Link
              to="/"
              className="mt-4 inline-block px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some((b) => b.id === book.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex justify-center items-center">
            Book Details
            <svg className="h-5 w-5 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </h2>
          <p className="mt-2 text-sm text-gray-600">Explore details of your selected book</p>
        </div>

        {/* Book Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
          <h3 className="text-2xl font-medium text-gray-900 mb-2">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Author:</span> {book.author}</p>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ISBN:</span> {book.isbn}</p>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Category:</span> {book.category?.name}</p>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Publication Year:</span> {book.publicationYear}</p>
          <p className={`text-sm font-medium mb-6 ${book.isAvailable ? "text-green-600" : "text-red-600"}`}>
            <span className="font-bold">Availability:</span> {book.isAvailable ? "Available" : "Not Available"}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleBorrowReturn}
              className="w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              disabled={book.isAvailable === undefined}
            >
              {book.isAvailable ? "Borrow" : "Return"}
            </button>

            <button
              onClick={handleFavoriteToggle}
              className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill={isFavorite ? "currentColor" : "none"}
                stroke={isFavorite ? "none" : "currentColor"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isFavorite ? 0 : 2}
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z"
                />
              </svg>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>

            <Link
              to="/"
              className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-200 hover:bg-gray-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
