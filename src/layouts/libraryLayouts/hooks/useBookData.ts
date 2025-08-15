import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-instance";
import type { BookModel, UpdateBookModel } from "./bookModel";

const addBookWithFiles = (values: BookModel) => {
  return axiosInstance.post("/book/create", values);
};

const updateBookWithFiles = (id: number, values: UpdateBookModel) => {
  return axiosInstance.put(`/book/update/${id}`, values);
};

const deleteBook = (id: number) => {
  return axiosInstance.delete(`/book/delete/${id}`);
};

const findBookById = (id: number) => {
  return axiosInstance.get(`/book/${id}`);
};

const findAllBooks = () => {
  return axiosInstance.get("/book");
};

export const useAddBookWithFiles = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: addBookWithFiles,
    onSuccess,
    onError,
    mutationKey: ["addBookWithFiles"],
  });
};

export const useUpdateBookWithFiles = (
  id: number,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: (values: UpdateBookModel) => updateBookWithFiles(id, values),
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
  });
};

export const useFindAllBooks = () => {
  return useQuery({
    queryFn: findAllBooks,
    queryKey: ["findAllBooks"],
  });
};
