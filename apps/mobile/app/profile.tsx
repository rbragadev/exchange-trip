import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, Screen } from '../src/components';
import { theme } from '../src/theme';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
      <AppHeader title="Perfil" subtitle="Conta e suporte" />

      <View style={styles.card}>
        <Text style={styles.title}>Área do estudante</Text>
        <Text style={styles.description}>
          Autenticação, dados pessoais, preferências, consultor e suporte ficam reservados para próximas fases.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Suporte</Text>
        <Text style={styles.description}>
          Este placeholder representa o ponto de entrada para atendimento humano e dúvidas frequentes.
        </Text>
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
  card: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 8,
    padding: 18,
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  description: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 21,
  },
});
