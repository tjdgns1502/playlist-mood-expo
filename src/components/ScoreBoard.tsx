import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import type { AnalysisResult } from "../types/analysis";
import { colors, fonts, spacing } from "../theme";

type Props = {
  data: AnalysisResult;
};

function MetricBar({
  title,
  badge,
  score,
  explanation,
  tint,
}: {
  title: string;
  badge: string;
  score: number;
  explanation: string;
  tint: string;
}) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricHead}>
        <View style={{ flex: 1, paddingRight: spacing.s8 }}>
          <Text style={styles.metricTitle}>{title}</Text>
          <Text style={styles.metricBadge}>{badge}</Text>
        </View>
        <Text style={[styles.metricScore, { color: tint }]}>{score}</Text>
      </View>
      <View style={styles.barTrack}>
        <View
          style={[styles.barFill, { width: `${score}%`, backgroundColor: tint }]}
        />
      </View>
      <Text style={styles.metricExpl}>{explanation}</Text>
    </View>
  );
}

export function ScoreBoard({ data }: Props) {
  const chartH = 220;
  const chartW = Math.min(Dimensions.get("window").width - 48, 720);
  const energyBars = [
    {
      value: data.energy.score,
      label: "에너지",
      frontColor: colors.cyan,
    },
  ];

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>에너지 · {data.energy.label}</Text>
        <View style={{ height: chartH }}>
          <BarChart
            width={chartW}
            height={chartH}
            data={energyBars}
            isAnimated={false}
            barWidth={28}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: colors.muted, fontFamily: fonts.regular }}
            xAxisLabelTextStyle={{
              color: colors.muted,
              fontFamily: fonts.regular,
              fontSize: 12,
            }}
            maxValue={100}
            noOfSections={4}
            yAxisColor={colors.border}
            xAxisColor={colors.border}
            backgroundColor="transparent"
          />
        </View>
        <Text style={styles.metricExpl}>{data.energy.explanation}</Text>
      </View>

      <MetricBar
        title="감정 톤"
        badge={data.valence.label}
        score={data.valence.score}
        explanation={data.valence.explanation}
        tint={colors.violet}
      />
      <MetricBar
        title="스트레스 지수"
        badge={data.stress.label}
        score={data.stress.score}
        explanation={data.stress.explanation}
        tint={colors.rose}
      />
      <MetricBar
        title="종합 무드"
        badge={data.mood.headline}
        score={Math.round(
          (data.energy.score + data.valence.score + (100 - data.stress.score)) /
            3,
        )}
        explanation={data.mood.summary}
        tint={colors.amber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.s16 },
  card: {
    borderRadius: 16,
    padding: spacing.s16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.s8,
  },
  metric: {
    borderRadius: 16,
    padding: spacing.s16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.s8,
  },
  metricTitle: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.text,
  },
  metricBadge: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },
  metricScore: {
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  barTrack: {
    height: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 8,
  },
  metricExpl: {
    marginTop: spacing.s8,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
});
