import type { BookResponseModel } from "../layouts/libraryLayouts/hooks/bookModel";

export const FAVORITES_KEY = "favorites";

export const loadFavorites = (): BookResponseModel[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites: BookResponseModel[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};