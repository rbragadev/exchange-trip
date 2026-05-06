import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, EmptyState, Screen } from '../../src/components';
import { tripSummaries } from '../../src/mocks/catalog';
import { theme } from '../../src/theme';
import { formatDateLabel } from '../../src/utils/formatters';

export default function TripsScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader title="Viagens" subtitle="Rascunhos e próximos passos" />
      {tripSummaries.length ? (
        <View style={styles.list}>
          {tripSummaries.map((trip) => (
            <View key={trip.id} style={styles.card}>
              <Text style={styles.status}>Rascunho</Text>
              <Text style={styles.title}>{trip.title}</Text>
              <Text style={styles.destination}>{trip.destinationName}</Text>
              <Text style={styles.meta}>Início previsto: {formatDateLabel(trip.startDate)}</Text>
              <Text style={styles.nextStep}>{trip.nextStep}</Text>
              <Pressable accessibilityRole="button" onPress={() => router.push('/search')} style={styles.button}>
                <Text style={styles.buttonText}>Continuar planejando</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          title="Nenhuma viagem criada"
          description="Quando um pacote for selecionado, o plano da viagem aparecerá aqui."
          actionLabel="Buscar cursos"
          onAction={() => router.push('/search')}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 8,
    padding: 18,
  },
  status: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    borderRadius: theme.radius.sm,
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: theme.colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  destination: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  nextStep: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.sm,
    marginTop: 6,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
});
