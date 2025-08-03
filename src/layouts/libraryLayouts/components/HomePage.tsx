import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder book data (replace with API call)
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isAvailable: true },
  { id: 2, title: '1984', author: 'George Orwell', isAvailable: false },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isAvailable: true },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isAvailable: true },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isAvailable: false },
  { id: 6, title: 'Lord of the Rings', author: 'J.R.R. Tolkien', isAvailable: true },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Books</h2>
          <p className="mt-2 text-sm text-gray-600">
            Browse our collection of books
          </p>
        </div>

        {/* Book Flex Container */}
        <div className="flex flex-wrap justify-center gap-6">
          {books.map((book) => (
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
              <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
              <p
                className={`text-sm font-medium mb-4 ${
                  book.isAvailable ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {book.isAvailable ? 'Available' : 'Not Available'}
              </p>
              <Link
                to={`/books/${book.id}`}
                className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                {book.isAvailable ? 'Borrow' : 'View Details'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;