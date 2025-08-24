import React, { useEffect, useRef, useState } from "react";
import {
  categories,
  type BookFormModel,
  type BookResponseModel,
  type UpdateBookModel,
} from "../hooks/bookModel";
import {
  useAddBookWithFiles,
  useDeleteBook,
  useFindAllBooks,
  useUpdateBookWithFiles,
} from "../hooks/useBookData";

const Admin: React.FC = () => {
  const thumbnailRef = useRef<HTMLInputElement | null>(null);
  const pdfRef = useRef<HTMLInputElement | null>(null);

  // Query books
  const { data: booksData, isLoading, isError, refetch } = useFindAllBooks();
  const [books, setBooks] = useState<BookResponseModel[]>([]);

  // Edit state
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    if (booksData) setBooks(booksData || []);
  }, [booksData]);

  // Delete hook
  const { mutate: deleteBookMutate } = useDeleteBook();

  // Update hook
  const { mutate: updateBook } = useUpdateBookWithFiles(
    (response) => {
      console.log("Book updated successfully:", response?.data);
      setMessage({ type: "success", text: "Book updated successfully." });
      setTimeout(() => setMessage(null), 5000);
      setEditingBookId(null);
      resetForm();
      refetch();
    },
    (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while updating the book";
      setMessage({ type: "error", text: message });
    }
  );

  // Add hook
  const { mutate: addBook, isPending } = useAddBookWithFiles(
    (response: any) => {
      console.log("Book added successfully:", response.data);
      resetForm();
      setMessage({ type: "success", text: "Book added successfully." });
      setTimeout(() => setMessage(null), 5000);
      refetch();
    },
    (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while adding the book";
      setMessage({ type: "error", text: message });
    }
  );

  // Form state
  const [formData, setFormData] = useState<BookFormModel>({
    title: "",
    author: "",
    isbn: 0,
    isAvailable: true,
    categoryId: categories[0].id,
    categoryName: categories[0].name,
    publicationYear: new Date().getFullYear(),
    thumbnailPreview: undefined,
    detailedPdfName: undefined,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: 0,
      isAvailable: true,
      categoryId: categories[0].id,
      categoryName: categories[0].name,
      publicationYear: new Date().getFullYear(),
      thumbnailPreview: undefined,
      detailedPdfName: undefined,
    });
    if (thumbnailRef.current) thumbnailRef.current.value = "";
    if (pdfRef.current) pdfRef.current.value = "";
  };

  // Change handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: any = value;

    if (type === "checkbox") {
      processedValue = (e.target as HTMLInputElement).checked;
    } else if (name === "publicationYear") {
      processedValue = Number(value);
    }

    if (name === "categoryId") {
      const selected = categories.find((c) => c.id === Number(value));
      setFormData({
        ...formData,
        categoryId: Number(value),
        categoryName: selected?.name ?? "Uncategorized",
      });
    } else {
      setFormData({ ...formData, [name]: processedValue });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ ...formData, [e.target.name]: file });
  };

  const handleEditBook = (id: number, book: UpdateBookModel) => {
    setEditingBookId(id);
    const { title, author, isbn, isAvailable, categoryId, categoryName, publicationYear } = book;
    setFormData({
      title,
      author,
      isbn,
      isAvailable,
      categoryId,
      categoryName,
      publicationYear,
      thumbnailPreview: undefined,
      detailedPdfName: undefined,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    if (editingBookId) {
      updateBook({ id: editingBookId, data: formData });
    } else {
      addBook(formData);
    }
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    deleteBookMutate(deleteTargetId, {
      onSuccess: () => {
        setMessage({ type: "success", text: "Book deleted successfully." });
        setTimeout(() => setMessage(null), 5000);
        refetch();
        setDeleteTargetId(null);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete book.";
        setMessage({ type: "error", text: msg });
      },
    });
  };

  const { title, author, isbn, isAvailable, categoryId, publicationYear } =
    formData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Panel - Manage Books
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add, edit, or delete books in the library
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">


          <div className="bg-white shadow-lg rounded-lg p-6 lg:w-2/5 w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingBookId ? "Edit Book" : "Add New Book"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div
                  className={`mb-4 px-4 py-2 rounded text-sm ${message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                >
                  {message.text}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm 
                  focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={author}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm 
                  focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* ISBN */}
              <div>
                <label className="block text-sm font-medium text-gray-700">ISBN</label>
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  value={isbn}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm 
                  focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={categoryId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
                  focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Publication Year</label>
                <input
                  id="publicationYear"
                  name="publicationYear"
                  type="number"
                  value={publicationYear}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm 
                  focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-2">
                <input
                  id="isAvailable"
                  name="isAvailable"
                  type="checkbox"
                  checked={isAvailable}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">
                  Available
                </label>
              </div>

              {/* Files */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                <input
                  ref={thumbnailRef}
                  id="thumbnail"
                  name="thumbnailPreview"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Detailed PDF</label>
                <input
                  ref={pdfRef}
                  id="detailedPdf"
                  name="detailedPdfName"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                {editingBookId ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>

          {/* Book List */}
          <div className="bg-white shadow-lg rounded-lg p-6 lg:w-3/5 w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Book List</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error loading books</p>
            ) : books.length === 0 ? (
              <p>No books found</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-sm">ID</th>
                    <th className="px-4 py-2 text-sm">Title</th>
                    <th className="px-4 py-2 text-sm">Author</th>
                    <th className="px-4 py-2 text-sm">Category</th>
                    <th className="px-4 py-2 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border-b">
                      <td className="px-4 py-2">{book.id}</td>
                      <td className="px-4 py-2">{book.title}</td>
                      <td className="px-4 py-2">{book.author}</td>
                      <td className="px-4 py-2">{book.category?.name}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleEditBook(book.id!, book)}
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(book.id!)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed bg-transparent bg-opacity-40 top-20 right-36 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
