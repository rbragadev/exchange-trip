import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { CourseType, Destination, SearchFilters } from '../types/domain';
import { SearchFiltersCard } from './SearchFiltersCard';

interface HomeHeroSearchProps {
  filters: SearchFilters;
  destinations: Destination[];
  courseTypes: CourseType[];
  onChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

export function HomeHeroSearch({ filters, destinations, courseTypes, onChange, onSearch }: HomeHeroSearchProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>Sua jornada começa aqui</Text>
        <Text style={styles.title}>Encontre o intercâmbio ideal para você</Text>
        <Text style={styles.subtitle}>Descubra destinos, compare cursos e salve opções para montar seu plano.</Text>
      </View>

      <SearchFiltersCard
        courseTypes={courseTypes}
        destinations={destinations}
        filters={filters}
        onChange={onChange}
        onSearch={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  copy: {
    gap: 8,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 22,
  },
});
