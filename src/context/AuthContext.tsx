import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const TERMS_KEY = "pm_terms_accepted_v1";

export type AuthUser = {
  email: string;
  name: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  termsAccepted: boolean;
  needsTermsModal: boolean;
  signInGoogle: () => Promise<void>;
  completeTerms: () => Promise<void>;
  signOut: () => void;
  googleConfigured: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID ?? "";
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  const googleConfigured = Boolean(
    expoClientId || webClientId || iosClientId || androidClientId,
  );

  const [, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoClientId || undefined,
    iosClientId: iosClientId || undefined,
    androidClientId: androidClientId || undefined,
    webClientId: webClientId || undefined,
  });

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem(TERMS_KEY);
      setTermsAccepted(t === "true");
      setStorageReady(true);
    })();
  }, []);

  useEffect(() => {
    if (response?.type !== "success") return;

    const token =
      response.authentication?.accessToken ??
      (response.params as { access_token?: string } | undefined)?.access_token;

    if (!token) {
      setUser({ email: "google-user", name: "Google 사용자" });
      return;
    }

    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((j: { email?: string; name?: string }) => {
        setUser({
          email: j.email ?? "unknown",
          name: j.name ?? "Google 사용자",
        });
      })
      .catch(() => {
        setUser({ email: "google-user", name: "Google 사용자" });
      });
  }, [response]);

  const signInGoogle = useCallback(async () => {
    if (!googleConfigured) return;
    await promptAsync();
  }, [googleConfigured, promptAsync]);

  const completeTerms = useCallback(async () => {
    await AsyncStorage.setItem(TERMS_KEY, "true");
    setTermsAccepted(true);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const needsTermsModal = Boolean(
    storageReady && user && !termsAccepted,
  );

  const value = useMemo(
    () => ({
      user,
      termsAccepted,
      needsTermsModal,
      signInGoogle,
      completeTerms,
      signOut,
      googleConfigured,
    }),
    [
      user,
      termsAccepted,
      needsTermsModal,
      signInGoogle,
      completeTerms,
      signOut,
      googleConfigured,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
