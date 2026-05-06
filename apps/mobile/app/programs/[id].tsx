import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, EmptyState, Screen } from '../../src/components';
import { exchangePackages } from '../../src/mocks/catalog';
import { useFavorites } from '../../src/providers/FavoritesProvider';
import { theme } from '../../src/theme';
import { formatCurrencyBRL } from '../../src/utils/formatters';
import { firstParam } from '../../src/utils/searchFilters';

export default function ProgramDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const packageId = firstParam(params.id);
  const item = exchangePackages.find((current) => current.id === packageId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!item) {
    return (
      <Screen>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
        <EmptyState
          title="Programa não encontrado"
          description="O pacote selecionado não existe nos mocks da fase 1."
          actionLabel="Buscar cursos"
          onAction={() => router.push('/search')}
        />
      </Screen>
    );
  }

  const favorite = isFavorite(item.id);

  return (
    <Screen>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>

      <AppHeader title="Detalhes do programa" subtitle={`${item.city}, ${item.country}`} />

      <View style={[styles.hero, { backgroundColor: item.imageTone }]}>
        <Text style={styles.badge}>{item.badge}</Text>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroSubtitle}>{item.school}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>
        <Text style={styles.bodyText}>
          {item.schedule} · {item.weeklyHours} horas por semana · {item.durationWeeks} semanas
        </Text>
        <Text style={styles.price}>{formatCurrencyBRL(item.priceFromCents)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inclui</Text>
        {item.included.map((included) => (
          <Text key={included} style={styles.included}>
            + {included}
          </Text>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => toggleFavorite(item.id)}
          style={[styles.secondaryButton, favorite && styles.secondaryButtonActive]}
        >
          <Text style={[styles.secondaryButtonText, favorite && styles.secondaryButtonTextActive]}>
            {favorite ? 'Remover favorito' : 'Salvar favorito'}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/cart', params: { packageId: item.id } })}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Adicionar ao carrinho</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
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
  hero: {
    borderRadius: theme.radius.lg,
    gap: 8,
    padding: 20,
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
  heroTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  heroSubtitle: {
    color: theme.colors.muted,
    fontSize: 16,
    fontWeight: '800',
  },
  section: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  bodyText: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 21,
  },
  price: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  included: {
    color: '#047857',
    fontSize: 15,
    fontWeight: '700',
  },
  actions: {
    gap: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    paddingVertical: 13,
  },
  secondaryButtonActive: {
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButtonTextActive: {
    color: theme.colors.primary,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
});
