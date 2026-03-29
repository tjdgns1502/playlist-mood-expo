import React, { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WebLayout } from '../src/components/WebLayout';
import { colors, fonts, radius, shadow, spacing } from '../src/theme';

type Provider = 'toss' | 'stripe';
type TierKey = 'Free' | 'Pro' | 'Premium';

const TIERS: Array<{
  key: TierKey;
  title: string;
  price: string;
  monthlyLabel: string;
  description: string;
  features: string[];
  accent: string;
  accentText: string;
  recommended?: boolean;
}> = [
  {
    key: 'Free',
    title: '무료',
    price: '₩0',
    monthlyLabel: '기본 체험',
    description: '발표 전 기능 확인용으로 적당한 무료 플랜입니다.',
    features: ['월 3회 분석', '기본 스코어 카드', '기기 캐시 저장'],
    accent: colors.card,
    accentText: colors.text,
  },
  {
    key: 'Pro',
    title: '프로',
    price: '₩4,900',
    monthlyLabel: '월간',
    description: '수업 발표 데모에 가장 적합한 구성입니다.',
    features: ['무제한 분석', '확장 마크다운 리포트', '프로젝터 최적화 UI'],
    accent: colors.cyanSoft,
    accentText: colors.cyan,
    recommended: true,
  },
  {
    key: 'Premium',
    title: '프리미엄',
    price: '₩9,900',
    monthlyLabel: '월간',
    description: '추가 공유 기능을 붙일 때 확장하기 좋은 데모 플랜입니다.',
    features: ['Pro 전체 포함', '우선 응답(데모)', '공유 링크/팀 기능 예정'],
    accent: colors.violetSoft,
    accentText: colors.violet,
  },
];

const PROVIDERS: Array<{ key: Provider; title: string; subtitle: string }> = [
  { key: 'toss', title: 'Toss Payments', subtitle: '국내 결제 플로우 데모' },
  { key: 'stripe', title: 'Stripe', subtitle: '글로벌 결제 플로우 데모' },
];

export default function PricingScreen() {
  const [provider, setProvider] = useState<Provider>('toss');
  const [selectedTier, setSelectedTier] = useState<TierKey>('Pro');
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => TIERS.find((tier) => tier.key === selectedTier) ?? TIERS[0], [selectedTier]);

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <WebLayout style={styles.content}>
          <View style={styles.heroCard}>
            <Text style={styles.heroEyebrow}>PAYMENT DEMO</Text>
            <Text style={styles.heroTitle}>웹과 모바일에서 같은 결제 데모 플로우를 시연할 수 있습니다</Text>
            <Text style={styles.heroDescription}>
              실제 과금은 일어나지 않는 테스트용 흐름입니다. 발표에서는 플랜 선택 → 결제 모달 → 성공 설명까지 보여주면 충분합니다.
            </Text>
          </View>

          <View style={styles.providerCard}>
            <Text style={styles.sectionTitle}>결제 제공자 선택</Text>
            <View style={styles.providerRow}>
              {PROVIDERS.map((item) => {
                const active = provider === item.key;
                return (
                  <Pressable
                    key={item.key}
                    style={[styles.providerOption, active && styles.providerOptionActive]}
                    onPress={() => setProvider(item.key)}
                  >
                    <Text style={[styles.providerTitle, active && styles.providerTitleActive]}>{item.title}</Text>
                    <Text style={styles.providerSubtitle}>{item.subtitle}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.tierList}>
            {TIERS.map((tier) => {
              const active = tier.key === selectedTier;
              return (
                <Pressable
                  key={tier.key}
                  style={[styles.tierCard, active && styles.tierCardActive]}
                  onPress={() => setSelectedTier(tier.key)}
                >
                  <View style={styles.tierHeader}>
                    <View style={[styles.tierBadge, { backgroundColor: tier.accent }] }>
                      <Text style={[styles.tierBadgeText, { color: tier.accentText }]}>{tier.title}</Text>
                    </View>
                    {tier.recommended ? (
                      <View style={styles.recommendedBadge}>
                        <Text style={styles.recommendedBadgeText}>추천</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.tierPrice}>{tier.price}</Text>
                  <Text style={styles.tierMonthly}>{tier.monthlyLabel}</Text>
                  <Text style={styles.tierDescription}>{tier.description}</Text>
                  {tier.features.map((feature) => (
                    <Text key={feature} style={styles.featureItem}>• {feature}</Text>
                  ))}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.checkoutCard}>
            <Text style={styles.sectionTitle}>선택한 결제 요약</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>플랜</Text>
              <Text style={styles.summaryValue}>{selected.title}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>제공자</Text>
              <Text style={styles.summaryValue}>{provider === 'toss' ? 'Toss Payments' : 'Stripe'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>결제 상태</Text>
              <Text style={styles.summaryValue}>테스트 모드</Text>
            </View>
            <Pressable style={styles.checkoutButton} onPress={() => setOpen(true)}>
              <Text style={styles.checkoutButtonText}>결제 화면 열기</Text>
            </Pressable>
          </View>
        </WebLayout>
      </ScrollView>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{provider === 'toss' ? 'Toss Payments 테스트 결제' : 'Stripe 테스트 결제'}</Text>
            <Text style={styles.modalDescription}>이 창은 실제 SDK 연결 전 단계의 더미 결제 흐름입니다.</Text>

            <View style={styles.modalSteps}>
              <View style={styles.modalStep}><Text style={styles.modalStepIndex}>1</Text><Text style={styles.modalStepText}>플랜 확인: {selected.title}</Text></View>
              <View style={styles.modalStep}><Text style={styles.modalStepIndex}>2</Text><Text style={styles.modalStepText}>결제 금액: {selected.price}</Text></View>
              <View style={styles.modalStep}><Text style={styles.modalStepIndex}>3</Text><Text style={styles.modalStepText}>테스트 승인 후 성공 화면 연출 가능</Text></View>
            </View>

            <View style={styles.modalActionRow}>
              <Pressable style={styles.modalSecondaryButton} onPress={() => setOpen(false)}>
                <Text style={styles.modalSecondaryButtonText}>취소</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={() => setOpen(false)}>
                <Text style={styles.modalPrimaryButtonText}>테스트 승인</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    gap: spacing.s20,
  },
  heroCard: {
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  heroEyebrow: {
    fontFamily: fonts.bold,
    color: colors.cyan,
    fontSize: 11,
    letterSpacing: 1.6,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 28,
    lineHeight: 36,
  },
  heroDescription: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
  },
  providerCard: {
    borderRadius: radius.lg,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s16,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 19,
  },
  providerRow: {
    gap: spacing.s12,
  },
  providerOption: {
    borderRadius: radius.md,
    padding: spacing.s16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s4,
  },
  providerOptionActive: {
    borderColor: colors.cyan,
    backgroundColor: colors.cyanSoft,
  },
  providerTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 16,
  },
  providerTitleActive: {
    color: colors.cyan,
  },
  providerSubtitle: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 13,
  },
  tierList: {
    gap: spacing.s16,
  },
  tierCard: {
    borderRadius: radius.xl,
    padding: spacing.s20,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  tierCardActive: {
    borderColor: colors.cyan,
    ...shadow.glow,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.s12,
  },
  tierBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
  },
  tierBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  recommendedBadge: {
    borderRadius: radius.pill,
    backgroundColor: colors.cyan,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
  },
  recommendedBadgeText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 12,
  },
  tierPrice: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 30,
  },
  tierMonthly: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 14,
  },
  tierDescription: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
  },
  featureItem: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 14,
    lineHeight: 22,
  },
  checkoutCard: {
    borderRadius: radius.xl,
    padding: spacing.s20,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.s12,
  },
  summaryLabel: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 14,
  },
  summaryValue: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 15,
  },
  checkoutButton: {
    marginTop: spacing.s8,
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.cyan,
  },
  checkoutButtonText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.s24,
  },
  modalCard: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 480 : 420,
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    gap: spacing.s16,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 24,
    lineHeight: 32,
  },
  modalDescription: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
  },
  modalSteps: {
    gap: spacing.s12,
  },
  modalStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s12,
    borderRadius: radius.md,
    padding: spacing.s12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalStepIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 28,
    backgroundColor: colors.cyanSoft,
    color: colors.cyan,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  modalStepText: {
    flex: 1,
    color: colors.subtext,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: spacing.s12,
  },
  modalSecondaryButton: {
    flex: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  modalSecondaryButtonText: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 15,
  },
  modalPrimaryButton: {
    flex: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.cyan,
  },
  modalPrimaryButtonText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 15,
  },
});
