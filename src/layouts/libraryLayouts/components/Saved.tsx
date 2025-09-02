import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BookResponseModel } from "../hooks/bookModel";
import { motion } from "framer-motion";

const Saved: React.FC = () => {
  const [favorites, setFavorites] = useState<BookResponseModel[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    console.log("Retrieved favorites from localStorage:", stored);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id?: number) => {
    if (id == null) return;
    const updated = favorites.filter((book) => book.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center">
            <h2 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">
              My Saved Books
            </h2>
            <svg
              className="h-6 w-6 text-yellow-500 ml-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
            </svg>
          </div>
          <p className="mt-3 text-base text-gray-700">
            View all your favorite books in one place
          </p>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md border border-yellow-100 shadow-lg rounded-2xl p-8 text-center">
            <svg
              className="h-10 w-10 text-yellow-500 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
            </svg>
            <p className="text-lg text-gray-700 font-medium">
              No saved books yet. Start adding your favorites!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-md border border-emerald-100 shadow-lg rounded-2xl p-6 flex flex-col"
              >
                {
                  book.thumbnailUrl && (
                    <img
                      src={book.thumbnailUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )
                }
                <div className="flex items-center mb-4">
                  <svg
                    className="w-7 h-7 text-emerald-600 mr-3"
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    {book.title}
                  </h3>
                </div>

                <div className="space-y-1 text-sm text-gray-700 mb-6">
                  <p>
                    <span className="italic">by</span> {book.author}
                  </p>
                  <p>ISBN: {book.isbn}</p>
                  <p>Category: {book.category?.name}</p>
                  <p>Year: {book.publicationYear}</p>
                  <p
                    className={`font-semibold ${book.isAvailable ? "text-emerald-600" : "text-red-500"
                      }`}
                  >
                    {book.isAvailable ? "Available" : "Not Available"}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    to={`/books/${book.id}`}
                    className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemove(book.id)}
                    className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
                      <path
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        d="M4 20L20 4"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
