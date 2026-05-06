import { useRouter } from 'expo-router';
import React from 'react';
import { AppHeader, PackageCarousel, Screen } from '../../src/components';
import { exchangePackages } from '../../src/mocks/catalog';

export default function OffersScreen() {
  const router = useRouter();
  const offerPackages = exchangePackages.filter((item) => item.isOffer);

  return (
    <Screen>
      <AppHeader title="Ofertas" subtitle="Pacotes em destaque para comparar" />
      <PackageCarousel
        packages={offerPackages}
        onOpenPackage={(packageId) => router.push({ pathname: '/programs/[id]', params: { id: packageId } })}
        title="Ofertas especiais"
        subtitle="Lista mockada para a fase 1, sem preço dinâmico ou backend."
      />
    </Screen>
  );
}
