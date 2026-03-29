import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, fonts, spacing } from "../theme";
import { useAuth } from "../context/AuthContext";

export function TermsModal() {
  const { needsTermsModal, completeTerms } = useAuth();
  const [tos, setTos] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const canProceed = tos && privacy;

  return (
    <Modal
      visible={needsTermsModal}
      animationType="slide"
      transparent
      onRequestClose={() => {
        /* 동의 완료 전에는 닫지 않음 */
      }}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>약관 동의</Text>
          <Text style={styles.sub}>
            서비스 이용을 위해 아래 약관에 동의해 주세요. (첫 로그인 시 1회)
          </Text>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.legal}>
              {`서비스 이용약관 (요약)\n\n· 본 앱은 교육·발표 목적의 데모입니다.\n· 분석 결과는 의학적 진단이 아닙니다.\n· Google 계정으로 로그인하며 비밀번호는 저장하지 않습니다.\n`}
            </Text>
            <Text style={styles.legal}>
              {`개인정보 처리방침 (요약)\n\n· OAuth로 받은 최소 프로필 정보는 기기 메모리에만 유지됩니다.\n· 플레이리스트 분석 결과는 AsyncStorage에 캐시될 수 있습니다.\n`}
            </Text>
          </ScrollView>

          <Pressable
            style={[styles.row, tos && styles.rowOn]}
            onPress={() => setTos(!tos)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: tos }}
          >
            <Text style={styles.cb}>{tos ? "☑" : "☐"}</Text>
            <Text style={styles.rowText}>서비스 이용약관에 동의합니다 (필수)</Text>
          </Pressable>
          <Pressable
            style={[styles.row, privacy && styles.rowOn]}
            onPress={() => setPrivacy(!privacy)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: privacy }}
          >
            <Text style={styles.cb}>{privacy ? "☑" : "☐"}</Text>
            <Text style={styles.rowText}>개인정보 처리방침에 동의합니다 (필수)</Text>
          </Pressable>

          <Pressable
            style={[styles.cta, !canProceed && styles.ctaDisabled]}
            disabled={!canProceed}
            onPress={() => void completeTerms()}
          >
            <Text style={styles.ctaText}>동의하고 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    padding: spacing.s24,
  },
  sheet: {
    borderRadius: 20,
    padding: spacing.s24,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: "90%",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.s8,
  },
  sub: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
    marginBottom: spacing.s16,
  },
  scroll: { maxHeight: 220, marginBottom: spacing.s16 },
  legal: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.muted,
    marginBottom: spacing.s16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s8,
    padding: spacing.s16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.s8,
  },
  rowOn: { borderColor: colors.cyan, backgroundColor: "rgba(34,211,238,0.08)" },
  cb: { fontSize: 18, color: colors.text },
  rowText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
  },
  cta: {
    marginTop: spacing.s8,
    paddingVertical: spacing.s16,
    borderRadius: 14,
    backgroundColor: colors.cyan,
    alignItems: "center",
  },
  ctaDisabled: { opacity: 0.45 },
  ctaText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: "#042f2e",
  },
});
