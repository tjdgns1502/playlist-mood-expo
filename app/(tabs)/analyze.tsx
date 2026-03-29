import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnalysis } from "../../src/context/AnalysisContext";
import { colors, fonts, spacing } from "../../src/theme";

const PLACEHOLDER = `곡 제목 — 아티스트 (한 줄에 하나씩)
예: Spring Day — BTS`;

export default function AnalyzeScreen() {
  const [text, setText] = useState("");
  const { analyzePlaylist, loading, error } = useAnalysis();

  const onSubmit = async () => {
    const ok = await analyzePlaylist(text);
    if (ok) router.push("/report");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>플레이리스트 입력</Text>
        <Text style={styles.desc}>
          최근에 자주 들은 곡을 입력하세요. 분석 결과는 기기에 캐시되어 동일
          플레이리스트 재분석 시 API를 호출하지 않습니다.
        </Text>
        <TextInput
          style={styles.input}
          multiline
          value={text}
          onChangeText={setText}
          placeholder={PLACEHOLDER}
          placeholderTextColor="rgba(148,163,184,0.7)"
          textAlignVertical="top"
        />
        {error ? (
          <Text style={styles.error} accessibilityRole="alert">
            {error}
          </Text>
        ) : null}
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            (loading || pressed) && { opacity: loading ? 0.65 : 0.9 },
          ]}
          onPress={() => void onSubmit()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#042f2e" />
          ) : (
            <Text style={styles.btnText}>분석하기</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    padding: spacing.s24,
    paddingBottom: spacing.s32,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.s8,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
    marginBottom: spacing.s16,
  },
  input: {
    minHeight: 200,
    borderRadius: 16,
    padding: spacing.s16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.04)",
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  error: {
    marginTop: spacing.s16,
    padding: spacing.s16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(251,113,133,0.45)",
    backgroundColor: "rgba(251,113,133,0.1)",
    color: "#fecdd3",
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  btn: {
    marginTop: spacing.s24,
    paddingVertical: spacing.s16,
    borderRadius: 14,
    backgroundColor: colors.cyan,
    alignItems: "center",
  },
  btnText: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: "#042f2e",
  },
});
