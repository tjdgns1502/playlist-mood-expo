import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

import { colors, fonts, radius, spacing } from '../theme';

type Props = {
  markdown: string;
};

export function MarkdownReport({ markdown }: Props) {
  return (
    <View style={styles.box}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Markdown style={markdownStyles}>{markdown}</Markdown>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    maxHeight: 520,
    borderRadius: radius.xl,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    paddingBottom: spacing.s8,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 25,
  },
  heading1: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 26,
    marginTop: spacing.s8,
    marginBottom: spacing.s12,
  },
  heading2: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 22,
    marginTop: spacing.s16,
    marginBottom: spacing.s12,
  },
  heading3: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginTop: spacing.s12,
    marginBottom: spacing.s8,
  },
  paragraph: {
    marginBottom: spacing.s12,
    color: colors.subtext,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 25,
  },
  bullet_list: {
    marginBottom: spacing.s12,
  },
  ordered_list: {
    marginBottom: spacing.s12,
  },
  list_item: {
    color: colors.subtext,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  strong: {
    color: colors.text,
    fontFamily: fonts.bold,
  },
  em: {
    color: colors.cyan,
  },
  link: {
    color: colors.cyan,
    textDecorationLine: 'underline',
  },
  blockquote: {
    borderLeftColor: colors.violet,
    borderLeftWidth: 3,
    paddingLeft: spacing.s16,
    paddingVertical: spacing.s8,
    marginVertical: spacing.s8,
    backgroundColor: colors.violetSoft,
  },
  code_inline: {
    backgroundColor: colors.cardStrong,
    color: colors.cyan,
    fontFamily: fonts.regular,
    paddingHorizontal: spacing.s8,
    paddingVertical: spacing.s4,
    borderRadius: radius.sm,
  },
  fence: {
    backgroundColor: 'rgba(2,6,23,0.72)',
    color: colors.text,
    fontFamily: fonts.regular,
    padding: spacing.s16,
    borderRadius: radius.md,
    marginVertical: spacing.s12,
  },
  hr: {
    backgroundColor: colors.borderStrong,
    height: 1,
    marginVertical: spacing.s16,
  },
});
