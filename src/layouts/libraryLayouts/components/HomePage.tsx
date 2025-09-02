import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFindAllBooks } from "../hooks/useBookData";
import type { BookResponseModel } from "../hooks/bookModel";
import { useAppSelector } from "../../../store/store";
import { loadFavorites, saveFavorites } from "../../../utils/saved";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  const { data: booksData = [], isLoading, isError } = useFindAllBooks();
  const [favorites, setFavorites] = useState<BookResponseModel[]>([]);
  const query = useAppSelector((state) => state.search.query);

  if (!booksData) return null;

  // Load favorites from localStorage on mount
  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  // Handle favorites toggle
  const handleFavoriteToggle = (book: BookResponseModel) => {
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

  // Filter books
  const filteredBooks = booksData.filter((book: BookResponseModel) => {
    if (!query.trim()) return true;
    const lowerQuery = query.toLowerCase();
    return (
      book.title?.toLowerCase().includes(lowerQuery) ||
      book.author?.toLowerCase().includes(lowerQuery) ||
      book.category?.name?.toLowerCase().includes(lowerQuery)
    );
  });

  if (isLoading)
    return (
      <p className="text-center py-8 text-emerald-600 font-medium animate-pulse">
        Loading books...
      </p>
    );
  if (isError)
    return (
      <p className="text-center py-8 text-red-500 font-medium">
        Failed to load books
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-100 py-12 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Our Books
          </h2>
          <p className="mt-3 text-base text-gray-700">
            Browse our handpicked collection of books
          </p>
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-lg border border-emerald-200 shadow-xl rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700 font-medium">
              No books found matching your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book: BookResponseModel) => {
              const isFav = favorites.some((b) => b.id === book.id);
              return (
                <motion.div
                  key={book.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="bg-white/80 backdrop-blur-md border border-emerald-100 shadow-lg rounded-2xl p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Thumbnail */}
                  {book.thumbnailUrl ? (
                    <img
                      src={book.thumbnailUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-xl mb-5 shadow-md"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-5 flex items-center justify-center shadow-inner">
                      <span className="text-gray-500 text-sm">
                        No Image Available
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-emerald-600"
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
                    {book.title}
                  </h3>

                  {/* Author */}
                  <p className="text-sm text-gray-700 mb-1">
                    by{" "}
                    <span className="font-medium text-emerald-700">
                      {book.author}
                    </span>
                  </p>

                  {/* Category */}
                  <p className="text-sm text-gray-600 mb-2">
                    Category:{" "}
                    <span className="font-medium text-gray-800">
                      {book.category?.name || "Uncategorized"}
                    </span>
                  </p>

                  {/* Availability */}
                  <p
                    className={`text-sm font-semibold mb-4 ${
                      book.isAvailable ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {book.isAvailable ? "Available" : "Not Available"}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <Link
                      to={`/books/${book.id ?? ""}`}
                      className="w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
                    >
                      {book.isAvailable ? "Borrow" : "View Details"}
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFavoriteToggle(book)}
                      className={`w-full flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all ${
                        isFav
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                      }`}
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill={isFav ? "currentColor" : "none"}
                        stroke={isFav ? "none" : "currentColor"}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={isFav ? 0 : 2}
                          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z"
                        />
                      </svg>
                      {isFav ? "Remove from Favorites" : "Add to Favorites"}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
