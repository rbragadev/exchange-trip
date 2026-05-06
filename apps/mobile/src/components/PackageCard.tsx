import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../providers/FavoritesProvider';
import { theme } from '../theme';
import type { ExchangePackage } from '../types/domain';
import { formatCurrencyBRL } from '../utils/formatters';

interface PackageCardProps {
  item: ExchangePackage;
  onOpen: (packageId: string) => void;
}

export function PackageCard({ item, onOpen }: PackageCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  return (
    <View style={styles.card}>
      <Pressable accessibilityRole="button" onPress={() => onOpen(item.id)} style={styles.mainArea}>
        <View style={[styles.media, { backgroundColor: item.imageTone }]}>
          <Text style={styles.badge}>{item.badge}</Text>
          <Text style={styles.mediaText}>{item.country}</Text>
        </View>

        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.school}>
            {item.school}, {item.city}
          </Text>
          <Text style={styles.meta}>
            {item.schedule} · {item.weeklyHours} horas/semana
          </Text>
          <View style={styles.includedList}>
            {item.included.slice(0, 3).map((included) => (
              <Text key={included} numberOfLines={1} style={styles.included}>
                + {included}
              </Text>
            ))}
          </View>
        </View>
      </Pressable>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>A partir de</Text>
          <Text style={styles.price}>{formatCurrencyBRL(item.priceFromCents)}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => toggleFavorite(item.id)}
            style={[styles.secondaryButton, favorite && styles.secondaryButtonActive]}
          >
            <Text style={[styles.secondaryButtonText, favorite && styles.secondaryButtonTextActive]}>
              {favorite ? 'Favorito' : 'Favoritar'}
            </Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => onOpen(item.id)} style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Detalhes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    width: 280,
  },
  mainArea: {
    gap: 0,
  },
  media: {
    height: 132,
    justifyContent: 'space-between',
    padding: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  mediaText: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  content: {
    gap: 7,
    padding: 14,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  school: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  includedList: {
    gap: 3,
  },
  included: {
    color: '#047857',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    gap: 12,
    padding: 14,
  },
  priceLabel: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  price: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  secondaryButtonActive: {
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryButtonTextActive: {
    color: theme.colors.primary,
  },
  detailButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.sm,
    flex: 1,
    paddingVertical: 10,
  },
  detailButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
});
