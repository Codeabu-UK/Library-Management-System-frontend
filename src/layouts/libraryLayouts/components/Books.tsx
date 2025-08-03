import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Placeholder book data (replace with API call)
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  isAvailable: boolean;
}

const initialBooks: Book[] = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Fiction', publicationYear: 1925, isAvailable: true },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '978-0451524935', category: 'Fiction', publicationYear: 1949, isAvailable: false },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0446310789', category: 'Fiction', publicationYear: 1960, isAvailable: true },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', category: 'Fiction', publicationYear: 1813, isAvailable: true },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769488', category: 'Fiction', publicationYear: 1951, isAvailable: false },
  { id: 6, title: 'Lord of the Rings', author: 'J.R.R. Tolkien', isbn: '978-0544003415', category: 'Fantasy', publicationYear: 1954, isAvailable: true },
];

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 6]); // Mock favorite IDs
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Add/Remove from Favorites
  const handleFavoriteToggle = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-900">All Books</h2>
            <svg className="h-5 w-5 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-600">Browse all books in the library</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by title, author, or category..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg
              className="absolute inset-y-0 right-0 pr-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Books List */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <svg className="h-8 w-8 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-lg text-gray-600">No books found matching your search</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {filteredBooks.map((book) => (
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
                <p className="text-sm text-gray-600 mb-2">Category: {book.category}</p>
                <p className="text-sm text-gray-600 mb-4">Year: {book.publicationYear}</p>
                <p
                  className={`text-sm font-medium mb-4 ${
                    book.isAvailable ? 'text-green-600' : 'text-red-600'
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
                    onClick={() => handleFavoriteToggle(book.id)}
                    className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      fill={favorites.includes(book.id) ? 'currentColor' : 'none'}
                      stroke={favorites.includes(book.id) ? 'none' : 'currentColor'}
                      viewBox="0 0 24 24"
                    >
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;