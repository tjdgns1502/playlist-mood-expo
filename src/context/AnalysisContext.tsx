import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { AnalysisResult } from "../types/analysis";
import { getCachedAnalysis, setCachedAnalysis } from "../lib/cache";
import { fetchPlaylistAnalysis } from "../lib/claude";
import { hashPlaylist } from "../lib/hash";

type AnalysisContextValue = {
  result: AnalysisResult | null;
  cacheHit: boolean;
  loading: boolean;
  error: string | null;
  lastPlaylist: string;
  analyzePlaylist: (text: string) => Promise<boolean>;
  clearResult: () => void;
};

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cacheHit, setCacheHit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPlaylist, setLastPlaylist] = useState("");

  const analyzePlaylist = useCallback(async (text: string): Promise<boolean> => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("플레이리스트를 입력해 주세요.");
      return false;
    }

    const apiKey =
      process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY?.trim() ?? "";

    setError(null);
    setLoading(true);
    setCacheHit(false);
    setLastPlaylist(trimmed);

    try {
      const hash = await hashPlaylist(trimmed);
      const cached = await getCachedAnalysis(hash);
      if (cached) {
        const parsed = JSON.parse(cached) as AnalysisResult;
        setResult(parsed);
        setCacheHit(true);
        return true;
      }

      const data = await fetchPlaylistAnalysis(trimmed, apiKey);
      await setCachedAnalysis(hash, JSON.stringify(data));
      setResult(data);
      setCacheHit(false);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "분석에 실패했습니다.");
      setResult(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setCacheHit(false);
    setError(null);
    setLastPlaylist("");
  }, []);

  const value = useMemo(
    () => ({
      result,
      cacheHit,
      loading,
      error,
      lastPlaylist,
      analyzePlaylist,
      clearResult,
    }),
    [
      result,
      cacheHit,
      loading,
      error,
      lastPlaylist,
      analyzePlaylist,
      clearResult,
    ],
  );

  return (
    <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextValue {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within AnalysisProvider");
  return ctx;
}
