import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFindBookById } from "../hooks/useBookData";
import type { BookResponseModel } from "../hooks/bookModel";
import { loadFavorites, saveFavorites } from "../../../utils/saved";
import { motion } from "framer-motion";

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
  if (isLoading)
    return (
      <p className="text-center py-8 text-emerald-600 font-medium animate-pulse">
        Loading book details...
      </p>
    );

  if (isError)
    return (
      <p className="text-center py-8 text-red-500 font-medium">
        Error: {(error as Error).message}
      </p>
    );

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-100 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-red-100 shadow-xl rounded-2xl p-8 text-center">
            <svg
              className="h-10 w-10 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-gray-700 font-medium">Book not found</p>
            <Link
              to="/"
              className="mt-6 inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center drop-shadow-sm">
            Book Details
            <svg
              className="h-6 w-6 text-emerald-600 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </h2>
          <p className="mt-3 text-base text-gray-700">
            Explore details of your selected book
          </p>
        </div>

        {/* Book Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-md border border-emerald-100 shadow-xl rounded-2xl p-8"
        >
          {book.thumbnailUrl && (
            <img
              src={book.thumbnailUrl}
              alt={`${book.title} cover`}
              className="w-full h-56 object-cover rounded-xl mb-6 shadow-md"
            />
          )}

          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {book.title}
          </h3>

          {/* Meta info */}
          <div className="space-y-1 text-gray-700 text-sm mb-6">
            <p>
              <span className="font-bold">Author:</span> {book.author}
            </p>
            <p>
              <span className="font-bold">ISBN:</span> {book.isbn}
            </p>
            <p>
              <span className="font-bold">Category:</span>{" "}
              {book.category?.name}
            </p>
            <p>
              <span className="font-bold">Publication Year:</span>{" "}
              {book.publicationYear}
            </p>
            <p
              className={`font-semibold ${
                book.isAvailable ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <span className="font-bold">Availability:</span>{" "}
              {book.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>

          {/* PDF Preview */}
          {book.pdfUrl && (
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-5 py-2.5 mb-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              📄 View PDF
            </a>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleBorrowReturn}
              disabled={book.isAvailable === undefined}
              className="w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all disabled:opacity-60"
            >
              {book.isAvailable ? "Borrow" : "Return"}
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteToggle}
              className={`w-full flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all ${
                isFavorite
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              }`}
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
            </motion.button>

            <Link
              to="/"
              className="w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-900 bg-gray-200 hover:bg-gray-300 shadow-sm transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;
