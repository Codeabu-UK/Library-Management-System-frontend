import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFindBookById } from '../hooks/useBookData';



const BookDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  // console.log("Book ID from URL:", id);

  const { data, isLoading, isError, error } = useFindBookById(Number(id));

  const book = data?.data?.book;

  // console.log("incoming body of the book", book)


  if (isLoading) <p>Loading book details...</p>;


  if (isError) <p>Error: {(error as Error).message}</p>;


  if (!book) <p>No book found</p>;

  const [favorites, setFavorites] = useState<number[]>([1, 3, 6]);

  // Handle Borrow/Return
  const handleBorrowReturn = () => {
    if (book) {
      // Implement borrow/return functionality
      console.log(`Borrow/Return book: ${book.title}`);
    }
  };

  // Handle Add/Remove from Favorites
  const handleFavoriteToggle = () => {
    if (book) {
      if (favorites.includes(book.id)) {
        setFavorites(favorites.filter((favId) => favId !== book.id));
      } else {
        setFavorites([...favorites, book.id]);
      }
    }
  };

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
              className="mt-4 inline-block px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-900">Book Details</h2>
            <svg className="h-5 w-5 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-600">Explore details of your selected book</p>
        </div>

        {/* Book Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
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
            <h3 className="text-2xl font-medium text-gray-900">{book.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Author:</span> {book.author}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Category:</span> {book.category.name}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-bold">Publication Year:</span> {book.publicationYear}
          </p>
          <p
            className={`text-sm font-medium mb-6 ${book.isAvailable ? 'text-green-600' : 'text-red-600'
              }`}
          >
            <span className="font-bold">Availability:</span> {book.isAvailable ? 'Available' : 'Not Available'}
          </p>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleBorrowReturn}
              className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              disabled={book.isAvailable === undefined}
            >
              {book.isAvailable ? 'Borrow' : 'Return'}
            </button>
            <button
              onClick={handleFavoriteToggle}
              className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
            >
              <svg className="h-4 w-4 mr-2" fill={favorites.includes(book.id) ? 'currentColor' : 'none'} stroke={favorites.includes(book.id) ? 'none' : 'currentColor'} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={favorites.includes(book.id) ? 0 : 2}
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.446l-7.416 3.967 1.48-8.279L0 9.306l8.332-1.151L12 .587z"
                />
                {favorites.includes(book.id) && (
                  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" d="M4 20L20 4" />
                )}
              </svg>
              {favorites.includes(book.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <Link
              to="/"
              className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
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