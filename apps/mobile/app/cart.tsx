import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, EmptyState, Screen } from '../src/components';
import { exchangePackages } from '../src/mocks/catalog';
import { theme } from '../src/theme';
import { formatCurrencyBRL } from '../src/utils/formatters';
import { firstParam } from '../src/utils/searchFilters';

export default function CartScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const packageId = firstParam(params.packageId);
  const item = exchangePackages.find((current) => current.id === packageId);

  return (
    <Screen>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
      <AppHeader title="Carrinho" subtitle="Resumo temporário da fase 1" />

      {item ? (
        <View style={styles.card}>
          <Text style={styles.label}>Pacote selecionado</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.school} · {item.city}, {item.country}
          </Text>
          <Text style={styles.price}>{formatCurrencyBRL(item.priceFromCents)}</Text>
          <Text style={styles.note}>Checkout real, pagamento e contrato entram em uma fase posterior.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.push('/trips')} style={styles.button}>
            <Text style={styles.buttonText}>Criar rascunho de viagem</Text>
          </Pressable>
        </View>
      ) : (
        <EmptyState
          title="Carrinho vazio"
          description="Adicione um pacote pelos detalhes para visualizar o resumo aqui."
          actionLabel="Explorar pacotes"
          onAction={() => router.push('/search')}
        />
      )}
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
  card: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  label: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 29,
  },
  meta: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '700',
  },
  price: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  note: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    marginTop: 8,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
});
