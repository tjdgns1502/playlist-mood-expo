import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WebLayout } from '../../src/components/WebLayout';
import { colors, fonts, radius, shadow, spacing } from '../../src/theme';

const HERO_METRICS = [
  { label: '분석 리포트', value: '3축 + 무드' },
  { label: '관점', value: '음악심리 · 의생명' },
  { label: '발표 모드', value: '고대비 다크 UI' },
];

const FEATURE_CARDS = [
  {
    title: '플레이리스트 기반 추정',
    description: '곡 목록만 넣으면 감정 밸런스, 에너지, 스트레스 패턴을 바로 정리합니다.',
    accent: colors.cyanSoft,
    accentText: colors.cyan,
  },
  {
    title: '발표용 리포트 설계',
    description: '점수 카드와 마크다운 보고서를 한 화면에 보여줘 시연하기 쉽습니다.',
    accent: colors.violetSoft,
    accentText: colors.violet,
  },
  {
    title: '캐시와 목 API 지원',
    description: '같은 플레이리스트는 기기 캐시를 재사용하고, mock 키로도 전체 데모가 가능합니다.',
    accent: colors.amberSoft,
    accentText: colors.amber,
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 768;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <WebLayout style={styles.content}>
          <LinearGradient colors={['#0a1023', '#111938', '#07101d']} style={[styles.hero, wide && styles.heroWide]}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>PLAYLISTMOOD · 발표 시연용 프로토타입</Text>
            </View>
            <Text style={[styles.heroTitle, wide && styles.heroTitleWide]}>
              플레이리스트가 드러내는{`\n`}심리 건강 신호를{`\n`}한 번에 보여줍니다.
            </Text>
            <Text style={styles.heroSubtitle}>
              최근에 들은 노래 목록을 입력하면 음악 심리학과 의생명 관점을 결합한 분석 결과를
              다크 테마 리포트로 시각화합니다.
            </Text>

            <View style={[styles.metricRow, wide && styles.metricRowWide]}>
              {HERO_METRICS.map((metric) => (
                <View key={metric.label} style={styles.metricCard}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.ctaRow}>
              <Pressable style={({ pressed }) => [styles.primaryCta, pressed && styles.pressed]} onPress={() => router.push('/analyze')}>
                <Text style={styles.primaryCtaText}>분석 시작하기</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.secondaryCta, pressed && styles.pressed]} onPress={() => router.push('/pricing')}>
                <Text style={styles.secondaryCtaText}>요금제 보기</Text>
              </Pressable>
            </View>
          </LinearGradient>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>WHAT IT SHOWS</Text>
            <Text style={styles.sectionTitle}>웹과 모바일을 같은 코드베이스로 시연할 수 있습니다</Text>
            <Text style={styles.sectionDescription}>
              홈 → 분석 → 리포트 → 결제 데모까지 한 흐름으로 시연할 수 있도록 화면을 정리했습니다.
            </Text>
          </View>

          <View style={[styles.featureGrid, wide && styles.featureGridWide]}>
            {FEATURE_CARDS.map((item) => (
              <View key={item.title} style={styles.featureCard}>
                <View style={[styles.featureChip, { backgroundColor: item.accent }]}>
                  <Text style={[styles.featureChipText, { color: item.accentText }]}>{item.title}</Text>
                </View>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
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
  hero: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow.soft,
  },
  heroWide: {
    padding: spacing.s32,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    backgroundColor: colors.cyanSoft,
    marginBottom: spacing.s24,
  },
  heroBadgeText: {
    fontFamily: fonts.bold,
    color: colors.cyan,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 34,
    lineHeight: 42,
    marginBottom: spacing.s16,
  },
  heroTitleWide: {
    fontSize: 48,
    lineHeight: 58,
    maxWidth: 720,
  },
  heroSubtitle: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: spacing.s24,
  },
  metricRow: {
    gap: spacing.s12,
    marginBottom: spacing.s24,
  },
  metricRowWide: {
    flexDirection: 'row',
  },
  metricCard: {
    flex: 1,
    minHeight: 88,
    borderRadius: radius.lg,
    padding: spacing.s16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 13,
    marginBottom: spacing.s8,
  },
  metricValue: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.s12,
    flexWrap: 'wrap',
  },
  primaryCta: {
    backgroundColor: colors.cyan,
    paddingHorizontal: spacing.s24,
    paddingVertical: spacing.s16,
    borderRadius: radius.md,
    ...shadow.glow,
  },
  secondaryCta: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.s24,
    paddingVertical: spacing.s16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  primaryCtaText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 16,
  },
  secondaryCtaText: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 16,
  },
  pressed: { opacity: 0.92 },
  sectionHeader: {
    gap: spacing.s8,
  },
  sectionEyebrow: {
    fontFamily: fonts.bold,
    color: colors.violet,
    fontSize: 11,
    letterSpacing: 1.6,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 24,
    lineHeight: 32,
  },
  sectionDescription: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  featureGrid: {
    gap: spacing.s16,
  },
  featureGridWide: {
    flexDirection: 'row',
  },
  featureCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s16,
  },
  featureChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    borderRadius: radius.pill,
  },
  featureChipText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  featureDescription: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
  },
});
