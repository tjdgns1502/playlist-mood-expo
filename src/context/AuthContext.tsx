import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const TERMS_KEY = "pm_terms_accepted_v1";

export type AuthUser = {
  email: string;
  name: string;
};

const MOCK_USER: AuthUser = {
  name: "테스트 유저",
  email: "test@test.com",
};

type AuthContextValue = {
  user: AuthUser | null;
  termsAccepted: boolean;
  needsTermsModal: boolean;
  signInGoogle: () => Promise<void>;
  completeTerms: () => Promise<void>;
  signOut: () => void;
  /** true if any Google OAuth client ID env is set */
  googleConfigured: boolean;
  /** true when OAuth keys are missing and mock sign-in is used */
  usingMockAuth: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function trimEnv(v: string | undefined): string | undefined {
  const t = v?.trim();
  return t ? t : undefined;
}

export function areGoogleOAuthClientIdsConfigured(): boolean {
  return Boolean(
    trimEnv(process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID) ||
      trimEnv(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID) ||
      trimEnv(process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID) ||
      trimEnv(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID),
  );
}

/** OAuth 미설정 시: useAuthRequest 호출 없이 목 로그인만 제공 */
function AuthProviderMock({ children }: { children: React.ReactNode }) {
  const warned = useRef(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    if (!warned.current) {
      warned.current = true;
      console.warn(
        "Google OAuth not configured - using mock auth",
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem(TERMS_KEY);
      setTermsAccepted(t === "true");
      setStorageReady(true);
    })();
  }, []);

  const signInGoogle = useCallback(async () => {
    setUser({ ...MOCK_USER });
  }, []);

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
      googleConfigured: false,
      usingMockAuth: true,
    }),
    [
      user,
      termsAccepted,
      needsTermsModal,
      signInGoogle,
      completeTerms,
      signOut,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/** 최소 하나의 클라이언트 ID가 있을 때만 마운트 → 훅 순서 고정 */
function AuthProviderGoogle({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  const expoClientId = trimEnv(process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID);
  const iosClientId = trimEnv(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);
  const androidClientId = trimEnv(
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  );
  const webClientId = trimEnv(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);

  const [, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
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
    await promptAsync();
  }, [promptAsync]);

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
      googleConfigured: true,
      usingMockAuth: false,
    }),
    [
      user,
      termsAccepted,
      needsTermsModal,
      signInGoogle,
      completeTerms,
      signOut,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (areGoogleOAuthClientIdsConfigured()) {
    return <AuthProviderGoogle>{children}</AuthProviderGoogle>;
  }
  return <AuthProviderMock>{children}</AuthProviderMock>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
