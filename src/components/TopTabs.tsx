import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '../theme';

const ITEMS: Array<{ href: '/'; label: string; icon: keyof typeof Ionicons.glyphMap } | { href: '/analyze' | '/report' | '/settings'; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { href: '/', label: '홈', icon: 'home' },
  { href: '/analyze', label: '분석', icon: 'analytics' },
  { href: '/report', label: '리포트', icon: 'document-text' },
  { href: '/settings', label: '설정', icon: 'settings' },
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable style={[styles.item, active && styles.itemActive]}>
                <Ionicons name={item.icon} size={16} color={active ? colors.black : colors.muted} />
                <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.s16,
    paddingHorizontal: spacing.s16,
    paddingBottom: spacing.s8,
    backgroundColor: colors.bg,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.s8,
    gap: spacing.s8,
  },
  item: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.s8,
  },
  itemActive: {
    backgroundColor: colors.cyan,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.muted,
  },
  labelActive: {
    color: colors.black,
  },
});
