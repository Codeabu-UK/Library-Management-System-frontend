import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "ISBN is required")
  ),
  publicationYear: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1000).max(new Date().getFullYear())
  ),
  categoryId: z.preprocess((val) => Number(val), z.number().int().positive()),
  categoryName: z.string().min(1, "Category name is required"),
  isAvailable: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean()
  ),
  thumbnailId: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().optional()
  ),
  detailedPdfId: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().optional()
  ),
});

export const updateBookSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  author: z.string().min(1, "Author is required").optional(),
  isbn: z.number().min(1, "ISBN is required").optional(),
  publicationYear: z
    .number()
    .int()
    .min(1000)
    .max(new Date().getFullYear())
    .optional(),
  categoryId: z.number().int().positive().optional(),
  isAvailable: z.boolean().optional(),
  thumbnailId: z.number().int().positive().optional(),
  detailedPdfId: z.number().int().positive().optional(),
});

export const createCategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "Category name is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").optional(),
});

export const createFavoriteSchema = z.object({
  userId: z.number().int().positive(),
  bookId: z.number().int().positive(),
});

export const deleteFavoriteSchema = z.object({
  userId: z.number().int().positive(),
  bookId: z.number().int().positive(),
});

export const createFileSchema = z.object({
  filePath: z.string().min(1, "File path is required"),
  fileType: z.string().min(1, "File type is required"),
});

export const updateFileSchema = z.object({
  filePath: z.string().min(1, "File path is required").optional(),
  fileType: z.string().min(1, "File type is required").optional(),
});

// Form model for UI state (includes File objects)
export type BookFormModel = {
  title?: string;
  author?: string;
  isbn?: number;
  publicationYear?: number;
  categoryId?: number;
  categoryName?: string;
  isAvailable?: boolean;
  thumbnailId?: number;
  detailedPdfId?: number;
  thumbnailPreview?: File;
  detailedPdfName?: File;
};

export const categories: CategoryModel[] = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Non-Fiction" },
  { id: 3, name: "Science" },
  { id: 4, name: "Fantasy" },
  { id: 5, name: "Biography" },
  { id: 6, name: "History" },
  { id: 7, name: "Horror" },
];

// Type exports
export type BookModel = z.infer<typeof createBookSchema>;
export type UpdateBookModel = z.infer<typeof updateBookSchema>;
export type CategoryModel = z.infer<typeof createCategorySchema>;
export type UpdateCategoryModel = z.infer<typeof updateCategorySchema>;
export type FavoriteModel = z.infer<typeof createFavoriteSchema>;
export type DeleteFavoriteModel = z.infer<typeof deleteFavoriteSchema>;
export type FileModel = z.infer<typeof createFileSchema>;
export type UpdateFileModel = z.infer<typeof updateFileSchema>;
