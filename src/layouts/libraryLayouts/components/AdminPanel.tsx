import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  categoriesLocal,
  type BookFormModel,
  type BookResponseModel,
  type CategoryModel,
  type UpdateBookModel,
} from "../hooks/bookModel";
import {
  useAddBookWithFiles,
  useDeleteBook,
  useFindAllBooks,
  useResolveCategory,
  useUpdateBookWithFiles,
} from "../hooks/useBookData";


const Admin: React.FC = () => {
  const thumbnailRef = useRef<HTMLInputElement | null>(null);
  const pdfRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: resolveCategoryMutate, isPending: isCategoryLoading } = useResolveCategory();

  const { data: booksData, isLoading, isError, refetch } = useFindAllBooks();
  const [books, setBooks] = useState<BookResponseModel[]>([]);

  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { mutate: addBook, isPending } = useAddBookWithFiles(
    () => {
      setMessage({ type: "success", text: "Book added successfully." });
      setTimeout(() => setMessage(null), 4000);
      resetForm();
      refetch();
    },
    (error: any) => {
      const msg = error?.response?.data?.message || error?.message || "Error adding book.";
      setMessage({ type: "error", text: msg });
    }
  );

  const [formData, setFormData] = useState<BookFormModel>({
    title: "",
    author: "",
    isbn: 0,
    isAvailable: true,
    categoryId: 0,
    categoryName: "",
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
      categoryId: 0,
      categoryName: "",
      publicationYear: new Date().getFullYear(),
      thumbnailPreview: undefined,
      detailedPdfName: undefined,
    });
    if (thumbnailRef.current) thumbnailRef.current.value = "";
    if (pdfRef.current) pdfRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: any = value;
    if (type === "checkbox") processedValue = (e.target as HTMLInputElement).checked;
    if (name === "publicationYear" || name === "isbn") processedValue = Number(value);

    setFormData({ ...formData, [name]: processedValue });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;

    const selectedCategory = categoriesLocal.find(cat => cat.name === selectedName);

    setFormData(prev => ({
      ...prev,
      categoryName: selectedName,
      categoryId: selectedCategory ? selectedCategory.id : 0,
    }));
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

  useEffect(() => {
    if (booksData) setBooks(booksData || []);
  }, [booksData]);

  const { mutate: deleteBookMutate } = useDeleteBook();
  const { mutate: updateBook } = useUpdateBookWithFiles(
    () => {
      setMessage({ type: "success", text: "Book updated successfully." });
      setTimeout(() => setMessage(null), 4000);
      setEditingBookId(null);
      resetForm();
      refetch();
    },
    (error: any) => {
      const msg = error?.response?.data?.message || error?.message || "Error updating book.";
      setMessage({ type: "error", text: msg });
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending || isCategoryLoading) return;

    try {
      const { categoryId, categoryName, ...bookRest } = formData;

      if (!categoryName) {
        setMessage({ type: "error", text: "Category is required" });
        return;
      }

      // Resolve category using the hook
      const resolvedCategoryId = await resolveCategoryMutate({
        id: Number(categoryId),
        name: categoryName,
      });

      const bookData = {
        ...bookRest,
        categoryId: resolvedCategoryId,
      };

      if (editingBookId) {
        updateBook({ id: editingBookId, data: bookData });
      } else {
        addBook(bookData);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.response?.data?.message || err?.message });
    }
  };
  const confirmDelete = () => {
    if (!deleteTargetId) return;
    deleteBookMutate(deleteTargetId, {
      onSuccess: () => {
        setMessage({ type: "success", text: "Book deleted successfully." });
        setTimeout(() => setMessage(null), 4000);
        refetch();
        setDeleteTargetId(null);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err?.message || "Failed to delete book.";
        setMessage({ type: "error", text: msg });
      },
    });
  };
  const { title, author, isbn, isAvailable, categoryName, publicationYear } = formData;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
            📚 Admin Panel
          </h2>
          <p className="mt-2 text-base text-gray-600">Manage your library with ease</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 lg:w-2/5 w-full"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingBookId ? "✏️ Edit Book" : "➕ Add New Book"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mb-4 px-4 py-2 rounded-lg text-sm shadow ${message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                >
                  {message.text}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-inner focus:border-emerald-500 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={author}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-inner focus:border-emerald-500 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ISBN</label>
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  value={isbn}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-inner focus:border-emerald-500 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="categoryName"
                  name="categoryName"
                  value={categoryName}
                  onChange={handleCategoryChange}
                  required
                  className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-500 focus:ring-emerald-400"
                >
                  <option value="">-- Select Category --</option>
                  {categoriesLocal.map((cat: CategoryModel) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Publication Year</label>
                <input
                  id="publicationYear"
                  name="publicationYear"
                  type="number"
                  value={publicationYear}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-inner focus:border-emerald-500 focus:ring-emerald-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="isAvailable"
                  name="isAvailable"
                  type="checkbox"
                  checked={isAvailable}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">
                  Available
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                <input
                  ref={thumbnailRef}
                  id="thumbnail"
                  name="thumbnailPreview"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm"
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
                  className="mt-1 block w-full text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isPending || isCategoryLoading}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
              >
                {editingBookId ? "Update Book" : "Add Book"}
              </motion.button>
            </form>
          </motion.div>

          {/* Book List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 lg:w-3/5 w-full"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📖 Book List</h3>

            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p className="text-red-500">Error loading books</p>
            ) : books.length === 0 ? (
              <p>No books found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="hidden md:table w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100/60">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Author</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <motion.tr
                        key={book.id}
                        whileHover={{ scale: 1.01, backgroundColor: "#f0fdf4" }}
                        className="border-b"
                      >
                        <td className="px-4 py-2">{book.id}</td>
                        <td className="px-4 py-2 font-medium">{book.title}</td>
                        <td className="px-4 py-2">{book.author}</td>
                        <td className="px-4 py-2">{book.category?.name}</td>
                        <td className="px-4 py-2 flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleEditBook(book.id!, book)}
                            className="px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setDeleteTargetId(book.id!)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                          >
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="grid gap-4 md:hidden">
                  {books.map((book) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white/80 border border-emerald-100 rounded-xl shadow-sm"
                    >
                      <p className="text-sm text-gray-500">ID: {book.id}</p>
                      <h4 className="text-base font-semibold text-gray-800">{book.title}</h4>
                      <p className="text-sm text-gray-600">Author: {book.author}</p>
                      <p className="text-sm text-gray-600">Category: {book.category?.name}</p>
                      <div className="flex gap-2 mt-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleEditBook(book.id!, book)}
                          className="flex-1 px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 text-sm"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setDeleteTargetId(book.id!)}
                          className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 text-sm"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTargetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-96"
            >
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete this book? This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
