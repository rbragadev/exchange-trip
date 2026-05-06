import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface FavoritesContextValue {
  favoriteIds: string[];
  isFavorite: (packageId: string) => boolean;
  toggleFavorite: (packageId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const isFavorite = useCallback((packageId: string) => favoriteIds.includes(packageId), [favoriteIds]);

  const toggleFavorite = useCallback((packageId: string) => {
    setFavoriteIds((current) =>
      current.includes(packageId) ? current.filter((id) => id !== packageId) : [...current, packageId],
    );
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}
