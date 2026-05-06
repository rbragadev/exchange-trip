import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { ProgramMode } from '../types/domain';

interface ProgramModeToggleProps {
  value: ProgramMode;
  onChange: (value: ProgramMode) => void;
}

const options: Array<{ value: ProgramMode; label: string }> = [
  { value: 'study_holiday', label: 'Estudar e férias' },
  { value: 'study_work', label: 'Estudar e trabalhar' },
];

export function ProgramModeToggle({ value, onChange }: ProgramModeToggleProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <Pressable
            accessibilityRole="button"
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected && styles.optionSelected]}
          >
            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 6,
  },
  option: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
});
