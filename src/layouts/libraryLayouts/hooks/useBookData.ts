import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-instance";
import type { BookFormModel } from "./bookModel";

const createBookWithFiles = (bookFormData: BookFormModel) => {
  const formData = new FormData();

  const { title, author, isbn, publicationYear, categoryId, categoryName, isAvailable, thumbnailPreview, detailedPdfName } = bookFormData;

  formData.append("title", title || "");
  formData.append("author", author || "");
  formData.append("isbn", (isbn || "").toString());
  formData.append("publicationYear", (publicationYear || 0).toString());
  formData.append("categoryName", categoryName || "Uncategorized");
  formData.append("categoryId", (categoryId || 0).toString());
  formData.append("isAvailable", (isAvailable ?? true).toString());

  // Only append files if they exist
  if (thumbnailPreview) {
    formData.append("thumbnail", thumbnailPreview);
  }
  if (detailedPdfName) {
    formData.append("detailedPdf", detailedPdfName);
  }
  
  return axiosInstance.post("/books/create", formData);
};

const updateBookWithFiles = (id: number, bookFormData: BookFormModel) => {
  const formData = new FormData();

  const { title, author, isbn, publicationYear, categoryId, categoryName, isAvailable, thumbnailPreview, detailedPdfName } = bookFormData;

  formData.append("title", title || "");
  formData.append("author", author || "");
  formData.append("isbn", (isbn || "").toString());
  formData.append("publicationYear", (publicationYear || 0).toString());
  formData.append("categoryId", (categoryId || 0).toString());
  formData.append("categoryName", categoryName || "Uncategorized");
  formData.append("isAvailable", (isAvailable ?? true).toString());

  // Only append files if they exist
  if (thumbnailPreview) {
    formData.append("thumbnail", thumbnailPreview);
  }
  if (detailedPdfName) {
    formData.append("detailedPdf", detailedPdfName);
  }
  
  return axiosInstance.put(`/books/update/${id}`, formData);
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

// Category-related functions
const createCategory = (categoryData: { name: string }) => {
  return axiosInstance.post("/categories", categoryData);
};

const getAllCategories = () => {
  return axiosInstance.get("/categories");
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

// Category hooks
export const useCreateCategory = (
  onSuccess?: (response: any) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess,
    onError,
    mutationKey: ["createCategory"],
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryFn: getAllCategories,
    queryKey: ["getAllCategories"],
  });
};