import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WebLayout } from '../../src/components/WebLayout';
import { useAuth } from '../../src/context/AuthContext';
import { colors, fonts, radius, spacing } from '../../src/theme';

export default function SettingsScreen() {
  const { user, signInGoogle, signOut, usingMockAuth, googleConfigured, termsAccepted } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <WebLayout style={styles.content}>
          <View style={styles.headerCard}>
            <Text style={styles.headerEyebrow}>SETTINGS</Text>
            <Text style={styles.headerTitle}>계정 및 데모 환경 설정</Text>
            <Text style={styles.headerDescription}>현재는 Google OAuth가 없으면 mock auth로 자동 전환됩니다.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>계정</Text>
            {user ? (
              <>
                <Text style={styles.label}>로그인 사용자</Text>
                <Text style={styles.value}>{user.name}</Text>
                <Text style={styles.subvalue}>{user.email}</Text>
                <Pressable style={styles.secondaryButton} onPress={signOut}>
                  <Text style={styles.secondaryButtonText}>로그아웃</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.subvalue}>
                  {usingMockAuth
                    ? 'OAuth 클라이언트 ID가 없어 테스트 계정 로그인으로 시연합니다.'
                    : 'Google OAuth로 실제 로그인 흐름을 연결할 수 있습니다.'}
                </Text>
                <Pressable style={styles.primaryButton} onPress={() => void signInGoogle()}>
                  <Text style={styles.primaryButtonText}>{usingMockAuth ? '테스트 로그인' : 'Google로 로그인'}</Text>
                </Pressable>
              </>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>앱 상태</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>OAuth 구성</Text>
              <Text style={styles.statusValue}>{googleConfigured ? '설정됨' : '미설정'}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>이용약관 동의</Text>
              <Text style={styles.statusValue}>{termsAccepted ? '완료' : '대기'}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>결제 데모</Text>
              <Text style={styles.statusValue}>활성</Text>
            </View>
          </View>

          <Pressable style={styles.card} onPress={() => router.push('/pricing')}>
            <Text style={styles.cardTitle}>요금제 · 결제</Text>
            <Text style={styles.subvalue}>Free / Pro / Premium 3단계 요금제와 Toss · Stripe 테스트 플로우를 확인합니다.</Text>
            <Text style={styles.linkText}>결제 화면 열기 →</Text>
          </Pressable>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>주의</Text>
            <Text style={styles.subvalue}>이 앱은 교육용 데모입니다. 정신 건강 점수는 설명용 추정치이며 의료적 판단을 대체하지 않습니다.</Text>
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
    gap: spacing.s16,
  },
  headerCard: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  headerEyebrow: {
    fontFamily: fonts.bold,
    color: colors.cyan,
    fontSize: 11,
    letterSpacing: 1.6,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 28,
    lineHeight: 36,
  },
  headerDescription: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 18,
  },
  label: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 14,
  },
  value: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 24,
  },
  subvalue: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: spacing.s8,
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.cyan,
  },
  primaryButtonText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: spacing.s8,
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  secondaryButtonText: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusValue: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 14,
  },
  linkText: {
    fontFamily: fonts.bold,
    color: colors.cyan,
    fontSize: 15,
  },
});
