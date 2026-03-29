import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { colors, fonts, spacing } from "../src/theme";

const TIERS = [
  {
    name: "Free",
    title: "무료",
    price: "₩0",
    bullets: ["월 3회 분석", "기본 스코어 카드", "캐시 저장"],
  },
  {
    name: "Pro",
    title: "프로",
    price: "₩4,900/월",
    bullets: ["무제한 분석", "마크다운 리포트 확장", "프로젝터 모드 UI"],
    highlight: true,
  },
  {
    name: "Premium",
    title: "프리미엄",
    price: "₩9,900/월",
    bullets: ["프로 전체", "우선 응답(데모)", "팀 공유 링크(더미)"],
  },
];

export default function PricingScreen() {
  const [payOpen, setPayOpen] = useState(false);
  const [provider, setProvider] = useState<"toss" | "stripe">("toss");

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <View style={styles.pad}>
        <Text style={styles.lead}>
          결제는 데모용 스캐폴드입니다. 실제 과금되지 않습니다.
        </Text>
        {TIERS.map((t) => (
          <View
            key={t.name}
            style={[styles.tier, t.highlight && styles.tierHi]}
          >
            <Text style={styles.tierTitle}>{t.title}</Text>
            <Text style={styles.price}>{t.price}</Text>
            {t.bullets.map((b) => (
              <Text key={b} style={styles.bullet}>
                · {b}
              </Text>
            ))}
            <Pressable
              style={styles.payBtn}
              onPress={() => {
                setProvider(t.name === "Premium" ? "stripe" : "toss");
                setPayOpen(true);
              }}
            >
              <Text style={styles.payText}>결제하기 (더미)</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <Modal visible={payOpen} animationType="slide">
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {provider === "toss" ? "Toss Payments (문서)" : "Stripe (문서)"}
            </Text>
            <Pressable onPress={() => setPayOpen(false)}>
              <Text style={styles.close}>닫기</Text>
            </Pressable>
          </View>
          <WebView
            source={{
              uri:
                provider === "toss"
                  ? "https://docs.tosspayments.com/guides/v2/get-started"
                  : "https://stripe.com/docs/testing",
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  pad: { padding: spacing.s24, gap: spacing.s16, paddingBottom: spacing.s32 },
  lead: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
    marginBottom: spacing.s8,
  },
  tier: {
    borderRadius: 16,
    padding: spacing.s24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.04)",
    gap: spacing.s8,
  },
  tierHi: {
    borderColor: "rgba(34,211,238,0.45)",
    backgroundColor: "rgba(34,211,238,0.08)",
  },
  tierTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.cyan,
    marginBottom: spacing.s8,
  },
  bullet: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.muted,
  },
  payBtn: {
    marginTop: spacing.s16,
    paddingVertical: spacing.s12,
    borderRadius: 12,
    backgroundColor: colors.violet,
    alignItems: "center",
  },
  payText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: "#0b1020",
  },
  modalSafe: { flex: 1, backgroundColor: colors.bg },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
  },
  close: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.cyan,
  },
});
