import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AppHeader({ title = 'Exchange Trip', subtitle }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.brandGroup}>
        <Text style={styles.brand}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.actions}>
        <Pressable accessibilityRole="button" onPress={() => router.push('/cart')} style={styles.actionButton}>
          <Text style={styles.actionText}>Carrinho</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.push('/profile')} style={styles.actionButton}>
          <Text style={styles.actionText}>Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  brandGroup: {
    flex: 1,
  },
  brand: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
});
