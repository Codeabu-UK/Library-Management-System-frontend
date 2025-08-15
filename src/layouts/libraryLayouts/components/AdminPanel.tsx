import React, { useState } from 'react';

// Placeholder book data (replace with API call)
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  isAvailable: boolean;
  thumbnailPreview?: string;
  detailedPdfName?: string;
}

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Fiction', publicationYear: 1925, isAvailable: true, thumbnailPreview: '', detailedPdfName: '' },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '978-0451524935', category: 'Fiction', publicationYear: 1949, isAvailable: false, thumbnailPreview: '', detailedPdfName: '' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0446310789', category: 'Fiction', publicationYear: 1960, isAvailable: true, thumbnailPreview: '', detailedPdfName: '' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', category: 'Fiction', publicationYear: 1813, isAvailable: true, thumbnailPreview: '', detailedPdfName: '' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769488', category: 'Fiction', publicationYear: 1951, isAvailable: false, thumbnailPreview: '', detailedPdfName: '' },
  { id: 6, title: 'Lord of the Rings', author: 'J.R.R. Tolkien', isbn: '978-0544003415', category: 'Fantasy', publicationYear: 1954, isAvailable: true, thumbnailPreview: '', detailedPdfName: '' },
];

const categories = ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Biography', 'History'];

const Admin: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: categories[0],
    publicationYear: '',
    isAvailable: true,
    thumbnailPreview: '',
    detailedPdfName: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-900">Admin Panel - Manage Books</h2>
            <svg className="h-5 w-5 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zm4 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zm-8 6c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zm8 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2z" />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-600">Add, edit, or delete books in the library</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Add/Edit Book Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 lg:w-2/5 w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h3>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <div className="relative">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter book title"
                  />
                </div>
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <div className="relative">
                  <input
                    id="author"
                    name="author"
                    type="text"
                    value={formData.author}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              {/* ISBN */}
              <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                  ISBN
                </label>
                <div className="relative">
                  <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    value={formData.isbn}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 978-1234567890"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  // onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publication Year */}
              <div>
                <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Publication Year
                </label>
                <div className="relative">
                  <input
                    id="publicationYear"
                    name="publicationYear"
                    type="number"
                    value={formData.publicationYear}
                    // onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 2020"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Year</span>
                  </div>
                </div>
              </div>

              {/* Is Available */}
              <div className="flex items-center">
                <input
                  id="isAvailable"
                  name="isAvailable"
                  type="checkbox"
                  checked={formData.isAvailable}
                  // onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                  Available
                </label>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  // onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.thumbnailPreview && (
                  <img
                    src={formData.thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="mt-2 h-20 rounded shadow"
                  />
                )}
              </div>

              {/* Detailed PDF Upload */}
              <div>
                <label htmlFor="detailedPdf" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed PDF
                </label>
                <input
                  id="detailedPdf"
                  name="detailedPdf"
                  type="file"
                  accept="application/pdf"
                  // onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.detailedPdfName && (
                  <p className="mt-1 text-xs text-gray-500">{formData.detailedPdfName}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  {editingBook ? "Update Book" : "Add Book"}
                </button>
                {editingBook && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBook(null);
                      setFormData({
                        title: "",
                        author: "",
                        isbn: "",
                        category: categories[0],
                        publicationYear: "",
                        isAvailable: true,
                        thumbnailPreview: '',
                        detailedPdfName: "",
                      });
                      setError("");
                    }}
                    className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

          </div>

          {/* Book List */}
          <div className="bg-white shadow-lg rounded-lg p-6 lg:w-3/5 w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Book List</h3>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">ID</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Title</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Author</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">ISBN</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Category</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Year</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Availability</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={book.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-sm text-gray-600">{book.id}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{book.title}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{book.author}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{book.isbn}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{book.category}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{book.publicationYear}</td>
                      <td className="px-4 py-2 text-sm font-medium">
                        <span className={book.isAvailable ? 'text-green-600' : 'text-red-600'}>
                          {book.isAvailable ? 'Available' : 'Not Available'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex space-x-2">
                          <button
                            // onClick={() => handleEdit(book)}
                            className="px-2 py-1 rounded-md text-xs text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            // onClick={() => handleDelete(book.id)}
                            className="px-2 py-1 rounded-md text-xs text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M7 7h10m-10 4v6m4-6v6m4-6v6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {books.map((book) => (
                <div key={book.id} className="bg-white shadow rounded-lg p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-bold">Title:</span> {book.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold">Author:</span> {book.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold">ISBN:</span> {book.isbn}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold">Category:</span> {book.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold">Year:</span> {book.publicationYear}
                    </p>
                    <p className="text-sm font-medium">
                      <span className="font-bold">Availability:</span>{' '}
                      <span className={book.isAvailable ? 'text-green-600' : 'text-red-600'}>
                        {book.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      //   onClick={() => handleEdit(book)}
                      className="w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      //   onClick={() => handleDelete(book.id)}
                      className="w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;