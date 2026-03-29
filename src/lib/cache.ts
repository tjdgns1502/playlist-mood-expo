import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "pm_analysis_";

export function cacheStorageKey(playlistHash: string): string {
  return `${PREFIX}${playlistHash}`;
}

export async function getCachedAnalysis(
  playlistHash: string,
): Promise<string | null> {
  return AsyncStorage.getItem(cacheStorageKey(playlistHash));
}

export async function setCachedAnalysis(
  playlistHash: string,
  json: string,
): Promise<void> {
  await AsyncStorage.setItem(cacheStorageKey(playlistHash), json);
}
