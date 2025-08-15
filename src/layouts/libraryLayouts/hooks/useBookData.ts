import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-instance";
import type { BookFormModel, BookModel, UpdateBookModel } from "./bookModel";

const addBookWithFiles = (values: BookModel) => {
  return axiosInstance.post("/books/create", values);
};

const updateBookWithFiles = (id: number, values: UpdateBookModel) => {
  return axiosInstance.put(`/books/update/${id}`, values);
};

const deleteBook = (id: number) => {
  return axiosInstance.delete(`/books/delete/${id}`);
};

const findBookById = (id: number) => {
  return axiosInstance.get(`/books/${id}`);
};

const findAllBooks = () => {
  return axiosInstance.get("/books");
};

export const uploadFile = (
  file: File
): Promise<{ data: { id: number; filePath: string; fileType: string } }> => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/file/upload", formData);
};

const createBookWithFiles = async (
  bookFormData: BookFormModel
): Promise<any> => {
  const {
    title,
    author,
    isbn,
    publicationYear,
    categoryId,
    thumbnailPreview,
    detailedPdfName,
  } = bookFormData;
  // Validate required fields
  if (!title || !author || !isbn || !publicationYear || !categoryId) {
    throw new Error("All book fields are required");
  }

  if (!thumbnailPreview || !detailedPdfName) {
    throw new Error("Both thumbnail and PDF files are required");
  }

  // Upload files first
  const thumbnailResponse = await uploadFile(thumbnailPreview);
  const pdfResponse = await uploadFile(detailedPdfName);

  // Create book with file IDs
  const bookData: BookModel = {
    title,
    author,
    isbn,
    publicationYear,
    categoryId,
    isAvailable: bookFormData.isAvailable ?? true,
    thumbnailId: thumbnailResponse.data.id,
    detailedPdfId: pdfResponse.data.id,
  };

  return addBookWithFiles(bookData);
};

export const useAddBookWithFiles = (
  onSuccess?: (response: any) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: createBookWithFiles,
    onSuccess,
    onError,
    mutationKey: ["addBookWithFiles"],
  });
};

export const useUpdateBookWithFiles = (
  id: number,
  onSuccess?: (response: any) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: (bookFormData: BookFormModel) =>
      updateBookWithFiles(id, bookFormData),
    onSuccess,
    onError,
    mutationKey: ["updateBookWithFiles", id],
  });
};

export const useDeleteBook = (
  id: number,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess,
    onError,
    mutationKey: ["deleteBook", id],
  });
};

export const useFindBookById = (id: number) => {
  return useQuery({
    queryFn: () => findBookById(id),
    queryKey: ["findBookById", id],
    enabled: !!id,
  });
};

export const useFindAllBooks = () => {
  return useQuery({
    queryFn: findAllBooks,
    queryKey: ["findAllBooks"],
  });
};
