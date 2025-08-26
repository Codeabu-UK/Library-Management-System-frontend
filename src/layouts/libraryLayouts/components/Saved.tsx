import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BookResponseModel } from '../hooks/bookModel';


const Saved: React.FC = () => {
  const [favorites, setFavorites] = useState<BookResponseModel[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-900">My Saved Books</h2>
            <svg className="h-5 w-5 text-yellow-500 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-600">View all your favorite books in one place</p>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <svg className="h-8 w-8 text-yellow-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
            </svg>
            <p className="text-lg text-gray-600">No saved books yet. Start adding your favorites!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {favorites.map((book) => (
              <div
                key={book.id}
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
                <p className="text-sm text-gray-600 mb-2">
                  <span className="italic">by</span> {book.author}
                </p>
                <p className="text-sm text-gray-600 mb-2">ISBN: {book.isbn}</p>
                <p className="text-sm text-gray-600 mb-2">Category: {book.category?.name}</p>
                <p className="text-sm text-gray-600 mb-4">Year: {book.publicationYear}</p>
                <p
                  className={`text-sm font-medium mb-4 ${book.isAvailable ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {book.isAvailable ? 'Available' : 'Not Available'}
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    to={`/books/${book.id}`}
                    className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemove(book.id)}
                    className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
                      <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" d="M4 20L20 4" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;