import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WebLayout } from '../../src/components/WebLayout';
import { useAnalysis } from '../../src/context/AnalysisContext';
import { colors, fonts, radius, shadow, spacing } from '../../src/theme';

const EXAMPLE_PLAYLIST = [
  'Spring Day — BTS',
  '밤편지 — 아이유',
  'Blueming — 아이유',
  'Ditto — NewJeans',
  'Event Horizon — 윤하',
  'ETA — NewJeans',
].join('\n');

export default function AnalyzeScreen() {
  const [text, setText] = useState('');
  const { analyzePlaylist, loading, error, lastPlaylist } = useAnalysis();

  const lineCount = useMemo(
    () => text.split('\n').map((line) => line.trim()).filter(Boolean).length,
    [text],
  );

  const onSubmit = async () => {
    const ok = await analyzePlaylist(text);
    if (ok) {
      router.push('/report');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <WebLayout style={styles.content}>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>ANALYZE</Text>
            <Text style={styles.title}>플레이리스트를 붙여 넣고 바로 분석하세요</Text>
            <Text style={styles.description}>
              한 줄에 하나씩 입력하면 됩니다. mock API 모드에서도 전체 흐름을 시연할 수 있습니다.
            </Text>
            <View style={styles.inlineStats}>
              <View style={styles.inlineStatCard}>
                <Text style={styles.inlineStatLabel}>입력된 곡 수</Text>
                <Text style={styles.inlineStatValue}>{lineCount}</Text>
              </View>
              <View style={styles.inlineStatCard}>
                <Text style={styles.inlineStatLabel}>최근 분석</Text>
                <Text style={styles.inlineStatValueSmall}>{lastPlaylist ? '있음' : '없음'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>곡 목록</Text>
              <Pressable style={({ pressed }) => [styles.ghostButton, pressed && styles.pressed]} onPress={() => setText(EXAMPLE_PLAYLIST)}>
                <Text style={styles.ghostButtonText}>예시 채우기</Text>
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              multiline
              value={text}
              onChangeText={setText}
              placeholder={'곡 제목 — 아티스트\n예: Spring Day — BTS'}
              placeholderTextColor="rgba(147,164,195,0.78)"
              textAlignVertical="top"
              autoCapitalize="none"
            />

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Pressable
              style={({ pressed }) => [styles.primaryButton, (pressed || loading) && styles.pressed]}
              onPress={() => void onSubmit()}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color={colors.black} /> : <Text style={styles.primaryButtonText}>리포트 생성하기</Text>}
            </Pressable>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>입력 팁</Text>
            <Text style={styles.tipItem}>• 최근 10~30곡 정도면 발표 시연에 적당합니다.</Text>
            <Text style={styles.tipItem}>• 동일한 목록은 AsyncStorage 캐시를 재사용합니다.</Text>
            <Text style={styles.tipItem}>• 분석 결과는 의학적 진단이 아니라 설명용 추정치입니다.</Text>
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
  heroCard: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  eyebrow: {
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: colors.cyan,
    marginBottom: spacing.s12,
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 28,
    lineHeight: 36,
    marginBottom: spacing.s12,
  },
  description: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.s20,
  },
  inlineStats: {
    flexDirection: 'row',
    gap: spacing.s12,
  },
  inlineStatCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.s16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inlineStatLabel: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 13,
    marginBottom: spacing.s8,
  },
  inlineStatValue: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 28,
  },
  inlineStatValueSmall: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 20,
  },
  sectionCard: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.s12,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
  },
  ghostButton: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    backgroundColor: colors.violetSoft,
  },
  ghostButtonText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.violet,
  },
  input: {
    minHeight: 260,
    borderRadius: radius.lg,
    padding: spacing.s16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(5,8,22,0.72)',
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  errorBox: {
    borderRadius: radius.md,
    padding: spacing.s16,
    backgroundColor: colors.roseSoft,
    borderWidth: 1,
    borderColor: 'rgba(251,113,133,0.35)',
  },
  errorText: {
    fontFamily: fonts.regular,
    color: colors.danger,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.cyan,
    ...shadow.glow,
  },
  primaryButtonText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
  },
  tipCard: {
    borderRadius: radius.lg,
    padding: spacing.s20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  tipTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 18,
  },
  tipItem: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  pressed: { opacity: 0.92 },
});
