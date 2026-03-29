import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { MarkdownReport } from '../../src/components/MarkdownReport';
import { ScoreBoard } from '../../src/components/ScoreBoard';
import { WebLayout } from '../../src/components/WebLayout';
import { useAnalysis } from '../../src/context/AnalysisContext';
import { colors, fonts, radius, spacing } from '../../src/theme';

export default function ReportScreen() {
  const { result, cacheHit } = useAnalysis();

  if (!result) {
    return (
      <SafeAreaView style={styles.safe} edges={['left', 'right']}>
        <WebLayout style={styles.emptyWrap}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>아직 생성된 리포트가 없습니다</Text>
            <Text style={styles.emptyDescription}>분석 탭에서 플레이리스트를 입력한 뒤 리포트를 생성해 주세요.</Text>
            <Pressable style={styles.emptyButton} onPress={() => router.push('/analyze')}>
              <Text style={styles.emptyButtonText}>분석 화면으로 이동</Text>
            </Pressable>
          </View>
        </WebLayout>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <WebLayout style={styles.content}>
          <View style={styles.heroCard}>
            {cacheHit ? (
              <View style={styles.cacheBadge}>
                <Text style={styles.cacheBadgeText}>캐시된 결과 재사용</Text>
              </View>
            ) : null}
            <Text style={styles.heroEyebrow}>REPORT</Text>
            <Text style={styles.heroTitle}>{result.mood.headline}</Text>
            <Text style={styles.heroSummary}>{result.mood.summary}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>스코어 카드</Text>
            <Text style={styles.sectionCaption}>0~100 추정치 · 설명용 분석</Text>
          </View>
          <ScoreBoard data={result} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>상세 해석 리포트</Text>
            <Text style={styles.sectionCaption}>마크다운 렌더링</Text>
          </View>
          <MarkdownReport markdown={result.report} />
        </WebLayout>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    paddingTop: spacing.s24,
    paddingBottom: spacing.s40,
  },
  content: {
    gap: spacing.s24,
  },
  heroCard: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  cacheBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    borderRadius: radius.pill,
    backgroundColor: colors.amberSoft,
    marginBottom: spacing.s8,
  },
  cacheBadgeText: {
    fontFamily: fonts.bold,
    color: colors.amber,
    fontSize: 12,
  },
  heroEyebrow: {
    fontFamily: fonts.bold,
    color: colors.violet,
    fontSize: 11,
    letterSpacing: 1.6,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 30,
    lineHeight: 38,
  },
  heroSummary: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 16,
    lineHeight: 25,
  },
  sectionHeader: {
    gap: spacing.s8,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 20,
  },
  sectionCaption: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 13,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: spacing.s24,
  },
  emptyCard: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    gap: spacing.s16,
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 24,
    lineHeight: 32,
  },
  emptyDescription: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  emptyButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    paddingHorizontal: spacing.s20,
    paddingVertical: spacing.s16,
    backgroundColor: colors.cyan,
  },
  emptyButtonText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 16,
  },
});
