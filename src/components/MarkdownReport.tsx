import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { colors, fonts } from "../theme";

type Props = {
  markdown: string;
};

export function MarkdownReport({ markdown }: Props) {
  return (
    <View style={styles.box}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <Markdown style={markdownStyles}>{markdown}</Markdown>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    maxHeight: 420,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  heading1: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 24,
    marginTop: 8,
    marginBottom: 12,
  },
  heading2: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 20,
    marginTop: 8,
    marginBottom: 10,
  },
  heading3: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 17,
    marginTop: 6,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 10,
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  bullet_list: {
    marginBottom: 8,
  },
  ordered_list: {
    marginBottom: 8,
  },
  list_item: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  strong: {
    color: colors.text,
    fontFamily: fonts.bold,
  },
  link: {
    color: colors.cyan,
    textDecorationLine: "underline",
  },
  blockquote: {
    borderLeftColor: colors.cyan,
    borderLeftWidth: 3,
    paddingLeft: 12,
    marginVertical: 8,
    color: colors.muted,
  },
  code_inline: {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: colors.cyan,
    fontFamily: fonts.regular,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  fence: {
    backgroundColor: "rgba(255,255,255,0.06)",
    color: colors.text,
    fontFamily: fonts.regular,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
});
