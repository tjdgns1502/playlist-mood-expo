import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts, spacing } from "../../src/theme";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#070a12", "#0f172a", "#070a12"]}
        style={styles.gradient}
      >
        <View style={[styles.inner, isWide && styles.innerWide]}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Biomed · Music Psychology</Text>
          </View>
          <Text style={[styles.headline, isWide && styles.headlineWide]}>
            내 플레이리스트가 말하는{"\n"}나의 심리 상태
          </Text>
          <Text style={styles.sub}>
            BPM·조성·가사 감성을 바탕으로 한 각성, 정서, 스트레스 신호를
            점수와 리포트로 정리합니다.{"\n"}
            강의실 스크린·프로젝터에 맞춘 고대비 다크 UI입니다.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.92 }]}
            onPress={() => router.push("/analyze")}
          >
            <Text style={styles.ctaText}>분석 시작하기</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  gradient: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.s24,
    paddingTop: spacing.s32,
    paddingBottom: spacing.s32,
    justifyContent: "center",
  },
  innerWide: {
    paddingHorizontal: spacing.s32,
    maxWidth: 960,
    alignSelf: "center",
    width: "100%",
  },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.35)",
    backgroundColor: "rgba(34,211,238,0.1)",
    marginBottom: spacing.s24,
  },
  pillText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.cyan,
    textTransform: "uppercase",
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 34,
    lineHeight: 42,
    color: colors.text,
    marginBottom: spacing.s16,
  },
  headlineWide: {
    fontSize: 44,
    lineHeight: 52,
  },
  sub: {
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 26,
    color: colors.muted,
    marginBottom: spacing.s32,
  },
  cta: {
    alignSelf: "flex-start",
    paddingVertical: spacing.s16,
    paddingHorizontal: spacing.s32,
    borderRadius: 16,
    backgroundColor: colors.cyan,
    shadowColor: colors.cyan,
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  ctaText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: "#042f2e",
  },
});
