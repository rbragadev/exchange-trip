import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { ExchangePackage } from '../types/domain';
import { PackageCard } from './PackageCard';

interface PackageCarouselProps {
  title: string;
  subtitle?: string;
  packages: ExchangePackage[];
  onOpenPackage: (packageId: string) => void;
}

export function PackageCarousel({ title, subtitle, packages, onOpenPackage }: PackageCarouselProps) {
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {packages.map((item) => (
          <PackageCard key={item.id} item={item} onOpen={onOpenPackage} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
  },
  heading: {
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 21,
  },
  row: {
    gap: 14,
    paddingRight: 8,
  },
});
