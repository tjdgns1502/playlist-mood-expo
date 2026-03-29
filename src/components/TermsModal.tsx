import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { colors, fonts, radius, spacing } from '../theme';

export function TermsModal() {
  const { needsTermsModal, completeTerms } = useAuth();

  return (
    <Modal visible={needsTermsModal} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>이용 안내</Text>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.body}>
              PlaylistMood는 교육용 데모 앱입니다. 입력된 플레이리스트를 바탕으로 음악 심리학 및 의생명 관점의 해석을 제공하지만, 의료적 진단이나 치료 권고를 대신하지 않습니다.
            </Text>
            <Text style={styles.body}>
              분석 결과는 기기에 캐시될 수 있으며, mock 로그인 및 테스트 결제는 실제 서비스와 연결되지 않습니다.
            </Text>
          </ScrollView>
          <Pressable style={styles.button} onPress={() => void completeTerms()}>
            <Text style={styles.buttonText}>동의하고 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.s24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    borderRadius: radius.xl,
    padding: spacing.s24,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    gap: spacing.s16,
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 22,
  },
  scroll: {
    maxHeight: 260,
  },
  body: {
    fontFamily: fonts.regular,
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.s12,
  },
  button: {
    borderRadius: radius.md,
    paddingVertical: spacing.s16,
    alignItems: 'center',
    backgroundColor: colors.cyan,
  },
  buttonText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 16,
  },
});
