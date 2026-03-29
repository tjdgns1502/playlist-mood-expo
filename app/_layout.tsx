import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../src/context/AuthContext";
import { AnalysisProvider } from "../src/context/AnalysisContext";
import { TermsModal } from "../src/components/TermsModal";
import { colors } from "../src/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, fontError] = useFonts({
    Pretendard: require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
  });

  useEffect(() => {
    if (loaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, fontError]);

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
            headerTitleStyle: { fontFamily: "Pretendard-Bold" },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="pricing"
            options={{
              presentation: "modal",
              title: "요금제",
            }}
          />
        </Stack>
        <TermsModal />
      </AnalysisProvider>
    </AuthProvider>
  );
}
