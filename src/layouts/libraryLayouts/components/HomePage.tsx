import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFindAllBooks } from "../hooks/useBookData";
import type { BookResponseModel } from "../hooks/bookModel";
import { useAppSelector } from "../../../store/store";
import { loadFavorites, saveFavorites } from "../../../utils/saved";


const HomePage: React.FC = () => {
  const { data: booksData, isLoading, isError } = useFindAllBooks();
  const [books, setBooks] = useState<BookResponseModel[]>([]);
  const [favorites, setFavorites] = useState<BookResponseModel[]>([]);
  const query = useAppSelector((state) => state.search.query);

  // Load books
  useEffect(() => {
    if (booksData) setBooks(booksData);
  }, [booksData]);

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
  const filteredBooks = books.filter((book) => {
    if (!query.trim()) return true;
    const lowerQuery = query.toLowerCase();
    return (
      book.title?.toLowerCase().includes(lowerQuery) ||
      book.author?.toLowerCase().includes(lowerQuery) ||
      book.category?.name?.toLowerCase().includes(lowerQuery)
    );
  });

  if (isLoading) return <p className="text-center py-8 text-gray-500">Loading books...</p>;
  if (isError) return <p className="text-center py-8 text-red-500">Failed to load books</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Books</h2>
          <p className="mt-2 text-sm text-gray-600">Browse our collection of books</p>
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <p className="text-lg text-gray-600">No books found matching your search</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {filteredBooks.map((book) => {
              const isFav = favorites.some((b) => b.id === book.id);
              return (
                <div
                  key={book.id!}
                  className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                >
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 mr-3"
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
                    <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Category: {book.category?.name || "Uncategorized"}
                  </p>
                  <p className={`text-sm font-medium mb-4 ${book.isAvailable ? "text-green-600" : "text-red-600"}`}>
                    {book.isAvailable ? "Available" : "Not Available"}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 w-full">
                    <Link
                      to={`/books/${book.id!}`}
                      className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      {book.isAvailable ? "Borrow" : "View Details"}
                    </Link>

                    {/* Favorite toggle */}
                    <button
                      onClick={() => handleFavoriteToggle(book)}
                      className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
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
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
