import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MarkdownReport } from "../../src/components/MarkdownReport";
import { ScoreBoard } from "../../src/components/ScoreBoard";
import { useAnalysis } from "../../src/context/AnalysisContext";
import { colors, fonts, spacing } from "../../src/theme";

export default function ReportScreen() {
  const { result, cacheHit } = useAnalysis();

  if (!result) {
    return (
      <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>아직 리포트가 없습니다</Text>
          <Text style={styles.emptySub}>
            「분석」 탭에서 플레이리스트를 입력하고 분석하기를 눌러 주세요.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {cacheHit ? (
          <View style={styles.cacheBanner}>
            <Text style={styles.cacheText}>캐시된 결과입니다 ⚡</Text>
          </View>
        ) : null}

        <Text style={styles.kicker}>당신의 플레이리스트가 말해요</Text>
        <Text style={styles.headline}>“{result.mood.headline}”</Text>
        <Text style={styles.summary}>{result.mood.summary}</Text>

        <Text style={styles.sectionTitle}>정신 건강 스코어 카드</Text>
        <Text style={styles.sectionHint}>
          점수는 0–100 추정치이며 의학적 진단이 아닙니다.
        </Text>

        <ScoreBoard data={result} />

        <Text style={[styles.sectionTitle, { marginTop: spacing.s24 }]}>
          상세 마크다운 리포트
        </Text>
        <MarkdownReport markdown={result.report} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    padding: spacing.s24,
    paddingBottom: spacing.s32,
  },
  cacheBanner: {
    alignSelf: "flex-start",
    marginBottom: spacing.s16,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.45)",
    backgroundColor: "rgba(251,191,36,0.12)",
  },
  cacheText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.amber,
  },
  kicker: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.violet,
    textTransform: "uppercase",
    marginBottom: spacing.s8,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 34,
    color: colors.text,
    marginBottom: spacing.s16,
  },
  summary: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
    marginBottom: spacing.s24,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.s8,
  },
  sectionHint: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
    marginBottom: spacing.s16,
  },
  empty: {
    flex: 1,
    padding: spacing.s24,
    justifyContent: "center",
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.s8,
  },
  emptySub: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
  },
});
