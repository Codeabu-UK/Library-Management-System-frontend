import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-instance";
import type {
  BookFormModel,
  CategoryModel,
  UpdateBookModel,
} from "./bookModel";

import type { BookFormModel } from "./bookModel";
const buildBookFormData = (bookFormData: BookFormModel) => {
  const formData = new FormData();
  const {
    title,
    author,
    isbn,
    publicationYear,
    categoryId,
    categoryName,
    isAvailable,
    detailedPdfName,
    thumbnailPreview,
  } = bookFormData;

  // Single metadata JSON
  const metadata = {
    title: title ?? "",
    author: author ?? "",
    isbn: isbn ?? 0,
    publicationYear: publicationYear ?? 0,
    categoryId: categoryId ?? 0,
    categoryName: categoryName ?? "Uncategorized",
    isAvailable: isAvailable ?? true,
  };

  // JSON string
  formData.append("metadata", JSON.stringify(metadata));

  if (thumbnailPreview) {
    formData.append("thumbnail", thumbnailPreview);
  }

  if (detailedPdfName) {
    formData.append("detailedPdf", detailedPdfName);
  }

  // Log FormData contents
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  return formData;
};

const createCategory = (data: CategoryModel) =>
  axiosInstance.post("/books/category/create", data);

const findCategoryById = (id: number) =>
  axiosInstance.get(`/books/category/${id}`);

const createBookWithFiles = (data: BookFormModel) =>
  axiosInstance.post("/books/create", buildBookFormData(data));

const updateBookWithFiles = (id: number, data: BookFormModel) =>
  axiosInstance.put(`/books/update/${id}`, buildBookFormData(data));

const deleteBook = (id: number) => axiosInstance.delete(`/books/delete/${id}`);

const findBookById = (id: number) => axiosInstance.get(`/books/${id}`);

const findAllBooks = async () => {
  const res = await axiosInstance.get("/books");
  return res.data.books;
};

const resolveCategory = async (categoryId: number, categoryName: string) => {
  if (categoryId > 0) {
    try {
      const res = await findCategoryById(categoryId);
      console.log("Category found:", res.data);
      return res.data.category.id;
    } catch (err) {
      console.warn("Category not found, creating a new one...");
    }
  }

  const res = await createCategory({ id: categoryId, name: categoryName });
  return res.data.category.id;
};

export const useResolveCategory = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      resolveCategory(id, name),
  });
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
  onSuccess?: (response: any) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBookModel }) =>
      updateBookWithFiles(id, data),
    onSuccess,
    onError,
    mutationKey: ["updateBookWithFiles"],
  });
};

export const useDeleteBook = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess,
    onError,
    mutationKey: ["deleteBook"],
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

