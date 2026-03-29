import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TermsModal } from '../src/components/TermsModal';
import { AnalysisProvider } from '../src/context/AnalysisContext';
import { AuthProvider } from '../src/context/AuthContext';
import { colors, fonts } from '../src/theme';

if (Platform.OS !== 'web') {
  void SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const [loaded, fontError] = useFonts({
    Pretendard: require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.documentElement.style.backgroundColor = colors.bg;
      document.body.style.backgroundColor = colors.bg;
      document.body.style.margin = '0';
      document.title = 'PlaylistMood';
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web' && (loaded || fontError)) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, loaded]);

  if (!loaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <AnalysisProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerTintColor: colors.text,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: fonts.bold,
              fontSize: 18,
            },
            contentStyle: { backgroundColor: colors.bg },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="pricing"
            options={{
              title: '요금제 및 결제',
              presentation: Platform.OS === 'web' ? 'card' : 'modal',
            }}
          />
        </Stack>
        <TermsModal />
      </AnalysisProvider>
    </AuthProvider>
  );
}
