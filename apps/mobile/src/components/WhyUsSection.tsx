import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface WhyUsItem {
  id: string;
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  items: WhyUsItem[];
}

export function WhyUsSection({ items }: WhyUsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Por que usar o app?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  row: {
    gap: 14,
    paddingRight: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 10,
    minHeight: 132,
    padding: 18,
    width: 220,
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
