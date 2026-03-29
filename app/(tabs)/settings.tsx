import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/context/AuthContext";
import { colors, fonts, spacing } from "../../src/theme";

export default function SettingsScreen() {
  const { user, signInGoogle, signOut, usingMockAuth } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <View style={styles.pad}>
        <Text style={styles.title}>계정</Text>
        <View style={styles.card}>
          {user ? (
            <>
              <Text style={styles.label}>로그인됨</Text>
              <Text style={styles.value}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Pressable style={styles.secondary} onPress={signOut}>
                <Text style={styles.secondaryText}>로그아웃</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.label}>
                {usingMockAuth ? "로그인 (목)" : "Google OAuth"}
              </Text>
              <Text style={styles.hint}>
                {usingMockAuth
                  ? "OAuth 키가 없어 테스트 계정으로 로그인합니다. ID/비밀번호는 저장하지 않습니다."
                  : "ID/비밀번호는 저장하지 않습니다. Google Cloud Console에서 OAuth 클라이언트를 설정한 뒤 EXPO_PUBLIC_* 환경 변수를 채워 주세요."}
              </Text>
              <Pressable
                style={styles.primary}
                onPress={() => void signInGoogle()}
              >
                <Text style={styles.primaryText}>
                  {usingMockAuth ? "테스트 로그인" : "Google로 로그인"}
                </Text>
              </Pressable>
            </>
          )}
        </View>

        <Text style={[styles.title, { marginTop: spacing.s32 }]}>요금제</Text>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/pricing")}
        >
          <Text style={styles.link}>요금제 보기 →</Text>
          <Text style={styles.hint}>
            데모용 더미 결제(Toss/Stripe WebView 스캐폴드)입니다.
          </Text>
        </Pressable>

        <Text style={[styles.title, { marginTop: spacing.s32 }]}>정보</Text>
        <View style={styles.card}>
          <Text style={styles.hint}>
            본 앱은 엔터테인먼트·교육 목적입니다. 음악 심리학 연구에 기반한
            추정이며 의학적 진단을 대체하지 않습니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  pad: { padding: spacing.s24 },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.s16,
  },
  card: {
    borderRadius: 16,
    padding: spacing.s24,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.s8,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.muted,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
  },
  email: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
  },
  primary: {
    marginTop: spacing.s8,
    paddingVertical: spacing.s16,
    borderRadius: 14,
    backgroundColor: colors.cyan,
    alignItems: "center",
  },
  primaryText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: "#042f2e",
  },
  secondary: {
    marginTop: spacing.s8,
    paddingVertical: spacing.s12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  secondaryText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.text,
  },
  link: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.cyan,
  },
});
