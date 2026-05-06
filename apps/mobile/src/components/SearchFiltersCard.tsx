import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { CourseType, Destination, SearchFilters } from '../types/domain';
import { formatDateLabel } from '../utils/formatters';
import { ProgramModeToggle } from './ProgramModeToggle';

interface SearchFiltersCardProps {
  filters: SearchFilters;
  destinations: Destination[];
  courseTypes: CourseType[];
  onChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

const startDateOptions = ['2026-05-25', '2026-07-06', '2026-09-14'];

export function SearchFiltersCard({
  filters,
  destinations,
  courseTypes,
  onChange,
  onSearch,
}: SearchFiltersCardProps) {
  const updateFilters = (next: Partial<SearchFilters>) => onChange({ ...filters, ...next });

  const cycleStartDate = () => {
    const currentIndex = startDateOptions.indexOf(filters.startDate);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % startDateOptions.length : 0;
    updateFilters({ startDate: startDateOptions[nextIndex] });
  };

  return (
    <View style={styles.card}>
      <ProgramModeToggle value={filters.mode} onChange={(mode) => updateFilters({ mode })} />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Destino</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          <FilterChip
            label="Todos"
            selected={filters.destinationId === 'all'}
            onPress={() => updateFilters({ destinationId: 'all' })}
          />
          {destinations.map((destination) => (
            <FilterChip
              key={destination.id}
              label={`${destination.city}, ${destination.countryCode}`}
              selected={filters.destinationId === destination.id}
              onPress={() => updateFilters({ destinationId: destination.id })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Tipo de curso</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          <FilterChip
            label="Todos"
            selected={filters.courseTypeId === 'all'}
            onPress={() => updateFilters({ courseTypeId: 'all' })}
          />
          {courseTypes.map((courseType) => (
            <FilterChip
              key={courseType.id}
              label={courseType.label}
              selected={filters.courseTypeId === courseType.id}
              onPress={() => updateFilters({ courseTypeId: courseType.id })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.doubleRow}>
        <View style={styles.controlBlock}>
          <Text style={styles.label}>Data inicial</Text>
          <Pressable accessibilityRole="button" onPress={cycleStartDate} style={styles.inputLike}>
            <Text style={styles.inputText}>{formatDateLabel(filters.startDate)}</Text>
          </Pressable>
        </View>

        <View style={styles.controlBlock}>
          <Text style={styles.label}>Duração</Text>
          <View style={styles.stepper}>
            <Pressable
              accessibilityRole="button"
              onPress={() => updateFilters({ durationWeeks: Math.max(1, filters.durationWeeks - 1) })}
              style={styles.stepperButton}
            >
              <Text style={styles.stepperText}>-</Text>
            </Pressable>
            <Text style={styles.durationText}>{filters.durationWeeks} sem.</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => updateFilters({ durationWeeks: Math.min(52, filters.durationWeeks + 1) })}
              style={styles.stepperButton}
            >
              <Text style={styles.stepperText}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable accessibilityRole="button" onPress={onSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: 18,
    padding: 16,
  },
  fieldGroup: {
    gap: 10,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  chipRow: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: theme.colors.text,
    borderColor: theme.colors.text,
  },
  chipText: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  doubleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  controlBlock: {
    flex: 1,
    gap: 8,
  },
  inputLike: {
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  inputText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  stepper: {
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 44,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  stepperButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 40,
  },
  stepperText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  durationText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    paddingVertical: 14,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
});
