import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, EmptyState, PackageCard, Screen, SearchFiltersCard } from '../src/components';
import { courseTypes, destinations, exchangePackages } from '../src/mocks/catalog';
import { theme } from '../src/theme';
import type { SearchFilters } from '../src/types/domain';
import { searchFiltersFromParams, searchFiltersToParams } from '../src/utils/searchFilters';

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [filters, setFilters] = useState<SearchFilters>(() => searchFiltersFromParams(params));

  const filteredPackages = useMemo(
    () =>
      exchangePackages.filter((item) => {
        const matchesMode = item.mode === filters.mode;
        const matchesDestination = filters.destinationId === 'all' || item.destinationId === filters.destinationId;
        const matchesCourse = filters.courseTypeId === 'all' || item.courseTypeId === filters.courseTypeId;
        const matchesDuration = item.durationWeeks >= filters.durationWeeks;

        return matchesMode && matchesDestination && matchesCourse && matchesDuration;
      }),
    [filters],
  );

  const runSearch = () => {
    router.setParams(searchFiltersToParams(filters));
  };

  return (
    <Screen>
      <View style={styles.topRow}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>

      <AppHeader title="Resultados" subtitle="Busca por destino, curso e duração" />
      <SearchFiltersCard
        courseTypes={courseTypes}
        destinations={destinations}
        filters={filters}
        onChange={setFilters}
        onSearch={runSearch}
      />

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Programas encontrados</Text>
        <Text style={styles.resultsCount}>{filteredPackages.length} opções</Text>
      </View>

      {filteredPackages.length ? (
        <View style={styles.resultsList}>
          {filteredPackages.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              onOpen={(packageId) => router.push({ pathname: '/programs/[id]', params: { id: packageId } })}
            />
          ))}
        </View>
      ) : (
        <EmptyState
          title="Nenhum pacote encontrado"
          description="Ajuste destino, tipo de curso ou duração para ampliar as opções."
          actionLabel="Limpar filtros"
          onAction={() => setFilters(searchFiltersFromParams({}))}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    alignItems: 'flex-start',
  },
  backButton: {
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  resultsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultsTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  resultsCount: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  resultsList: {
    alignItems: 'flex-start',
    gap: 16,
  },
});
