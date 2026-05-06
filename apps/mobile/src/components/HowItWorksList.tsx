import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface StepItem {
  id: string;
  title: string;
  description: string;
}

interface HowItWorksListProps {
  steps: StepItem[];
}

export function HowItWorksList({ steps }: HowItWorksListProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Como funciona</Text>
      <View style={styles.list}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.item}>
            <View style={styles.indexBadge}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.description}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>
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
  list: {
    gap: 16,
  },
  item: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  indexBadge: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  indexText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
