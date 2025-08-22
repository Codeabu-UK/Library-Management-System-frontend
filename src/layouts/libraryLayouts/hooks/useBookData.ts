import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-instance";

import type { BookFormModel } from "./bookModel";

const createBookWithFiles = (bookFormData: BookFormModel) => {
  const formData = new FormData();
  
  formData.append("title", bookFormData.title || "");
  formData.append("author", bookFormData.author || "");
  formData.append("isbn", (bookFormData.isbn || "").toString());
  formData.append("publicationYear", (bookFormData.publicationYear || 0).toString());
  formData.append("categoryId", (bookFormData.categoryId || 0).toString());
  formData.append("isAvailable", (bookFormData.isAvailable ?? true).toString());
  
  // Only append files if they exist
  if (bookFormData.thumbnailPreview) {
    formData.append("thumbnail", bookFormData.thumbnailPreview);
  }
  if (bookFormData.detailedPdfName) {
    formData.append("detailedPdf", bookFormData.detailedPdfName);
  }
  
  return axiosInstance.post("/books/create", formData);
};

const updateBookWithFiles = (id: number, bookFormData: BookFormModel) => {
  const formData = new FormData();
  
  formData.append("title", bookFormData.title || "");
  formData.append("author", bookFormData.author || "");
  formData.append("isbn", (bookFormData.isbn || "").toString());
  formData.append("publicationYear", (bookFormData.publicationYear || 0).toString());
  formData.append("categoryId", (bookFormData.categoryId || 0).toString());
  formData.append("isAvailable", (bookFormData.isAvailable ?? true).toString());
  
  // Only append files if they exist
  if (bookFormData.thumbnailPreview) {
    formData.append("thumbnail", bookFormData.thumbnailPreview);
  }
  if (bookFormData.detailedPdfName) {
    formData.append("detailedPdf", bookFormData.detailedPdfName);
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