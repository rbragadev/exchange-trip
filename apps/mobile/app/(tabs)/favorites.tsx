import { useRouter } from 'expo-router';
import React from 'react';
import { AppHeader, EmptyState, PackageCarousel, Screen } from '../../src/components';
import { exchangePackages } from '../../src/mocks/catalog';
import { useFavorites } from '../../src/providers/FavoritesProvider';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds } = useFavorites();
  const favoritePackages = exchangePackages.filter((item) => favoriteIds.includes(item.id));

  return (
    <Screen>
      <AppHeader title="Favoritos" subtitle="Opções salvas para revisar depois" />
      {favoritePackages.length ? (
        <PackageCarousel
          packages={favoritePackages}
          onOpenPackage={(packageId) => router.push({ pathname: '/programs/[id]', params: { id: packageId } })}
          title="Seus pacotes favoritos"
        />
      ) : (
        <EmptyState
          title="Nenhum favorito ainda"
          description="Salve pacotes pela home, busca ou detalhes para montar sua lista curta."
          actionLabel="Explorar ofertas"
          onAction={() => router.push('/offers')}
        />
      )}
    </Screen>
  );
}
