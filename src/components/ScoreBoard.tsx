import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { AnalysisResult } from '../types/analysis';
import { colors, fonts, radius, spacing } from '../theme';

type Props = {
  data: AnalysisResult;
};

type MetricCard = {
  title: string;
  score: number;
  label: string;
  explanation: string;
  tint: string;
};

export function ScoreBoard({ data }: Props) {
  const recoveryScore = Math.round((data.energy.score + data.valence.score + (100 - data.stress.score)) / 3);

  const detailCards: MetricCard[] = [
    { title: '에너지', score: data.energy.score, label: data.energy.label, explanation: data.energy.explanation, tint: colors.cyan },
    { title: '감정 톤', score: data.valence.score, label: data.valence.label, explanation: data.valence.explanation, tint: colors.violet },
    { title: '스트레스', score: data.stress.score, label: data.stress.label, explanation: data.stress.explanation, tint: colors.rose },
    { title: '회복 여력', score: recoveryScore, label: '종합 지표', explanation: data.mood.summary, tint: colors.amber },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>핵심 지표 시각화</Text>
        <Text style={styles.chartCaption}>높을수록 강한 신호를 의미합니다. 스트레스는 높을수록 부담 신호가 강합니다.</Text>
        <View style={styles.chartRow}>
          {detailCards.map((item) => (
            <View key={item.title} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${item.score}%`, backgroundColor: item.tint }]} />
              </View>
              <Text style={styles.barValue}>{item.score}</Text>
              <Text style={styles.barLabel}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.cardGrid}>
        {detailCards.map((item) => (
          <View key={item.title} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>{item.title}</Text>
              <View style={[styles.scoreBadge, { backgroundColor: item.tint }]}> 
                <Text style={styles.scoreBadgeText}>{item.score}</Text>
              </View>
            </View>
            <Text style={[styles.metricLabel, { color: item.tint }]}>{item.label}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${item.score}%`, backgroundColor: item.tint }]} />
            </View>
            <Text style={styles.metricExplanation}>{item.explanation}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.s16,
  },
  chartCard: {
    borderRadius: radius.xl,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 18,
    marginBottom: spacing.s8,
  },
  chartCaption: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.s16,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.s12,
    minHeight: 240,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.s8,
  },
  barTrack: {
    width: '100%',
    maxWidth: 56,
    height: 180,
    justifyContent: 'flex-end',
    borderRadius: radius.md,
    padding: spacing.s8,
    backgroundColor: colors.cardStrong,
    borderWidth: 1,
    borderColor: colors.border,
  },
  barFill: {
    width: '100%',
    borderRadius: radius.sm,
    minHeight: 8,
  },
  barValue: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 14,
  },
  barLabel: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  cardGrid: {
    gap: spacing.s16,
  },
  metricCard: {
    borderRadius: radius.lg,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.s12,
  },
  metricTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 17,
  },
  scoreBadge: {
    minWidth: 52,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    alignItems: 'center',
  },
  scoreBadgeText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 14,
  },
  metricLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  progressTrack: {
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.cardStrong,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
  },
  metricExplanation: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 14,
    lineHeight: 22,
  },
});
