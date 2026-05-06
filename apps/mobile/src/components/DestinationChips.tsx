import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { Destination } from '../types/domain';

interface DestinationChipsProps {
  destinations: Destination[];
  selectedId: string;
  onSelect: (destinationId: string) => void;
}

export function DestinationChips({ destinations, selectedId, onSelect }: DestinationChipsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinos favoritos dos estudantes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <Chip label="Todos" selected={selectedId === 'all'} onPress={() => onSelect('all')} />
        {destinations.map((destination) => (
          <Chip
            key={destination.id}
            label={`${destination.countryCode} ${destination.country}`}
            selected={selectedId === destination.id}
            onPress={() => onSelect(destination.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
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
  container: {
    gap: 12,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  row: {
    gap: 10,
    paddingRight: 8,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipSelected: {
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: theme.colors.primary,
  },
});
