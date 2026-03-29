import * as Crypto from "expo-crypto";

export async function hashPlaylist(text: string): Promise<string> {
  const normalized = text.trim();
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    normalized,
  );
}
