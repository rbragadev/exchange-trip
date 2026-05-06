import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { AppHeader, DestinationChips, HomeHeroSearch, HowItWorksList, PackageCarousel, Screen, WhyUsSection } from '../../src/components';
import { courseTypes, destinations, exchangePackages, howItWorks, whyUs } from '../../src/mocks/catalog';
import type { SearchFilters } from '../../src/types/domain';
import { defaultSearchFilters, searchFiltersToParams } from '../../src/utils/searchFilters';

export default function HomeScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>(defaultSearchFilters);
  const [selectedDestinationId, setSelectedDestinationId] = useState('all');

  const featuredPackages = useMemo(() => {
    if (selectedDestinationId === 'all') {
      return exchangePackages.filter((item) => item.isOffer);
    }

    return exchangePackages.filter((item) => item.destinationId === selectedDestinationId);
  }, [selectedDestinationId]);

  const openPackage = (packageId: string) => {
    router.push({ pathname: '/programs/[id]', params: { id: packageId } });
  };

  const submitSearch = () => {
    router.push({ pathname: '/search', params: searchFiltersToParams(filters) });
  };

  return (
    <Screen>
      <AppHeader subtitle="Planejamento de intercâmbio" />
      <HomeHeroSearch
        courseTypes={courseTypes}
        destinations={destinations}
        filters={filters}
        onChange={setFilters}
        onSearch={submitSearch}
      />
      <DestinationChips destinations={destinations} selectedId={selectedDestinationId} onSelect={setSelectedDestinationId} />
      <PackageCarousel
        packages={featuredPackages}
        onOpenPackage={openPackage}
        title="Pacotes prontos para embarcar"
        subtitle="Mocks para validar navegação, favoritos e detalhes."
      />
      <HowItWorksList steps={howItWorks} />
      <WhyUsSection items={whyUs} />
    </Screen>
  );
}
