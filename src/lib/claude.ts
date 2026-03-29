import type { AnalysisResult } from "../types/analysis";

const MODEL = "claude-sonnet-4-20250514";

/** 빈 값이거나 `"mock"`이면 실제 Anthropic 호출 없이 고정 응답 사용 */
export function isAnthropicMockMode(apiKey: string | undefined): boolean {
  const k = apiKey?.trim() ?? "";
  return k === "" || k === "mock";
}

const SYSTEM = `You are a music psychology assistant. Output must be a single valid JSON object only (no markdown code fences). The "report" value must be a JSON string containing Markdown with \\n for line breaks.`;

/** Exact analysis prompt (playlist body appended after this paragraph). */
const USER_PROMPT = (playlist: string) =>
  `다음 플레이리스트를 음악 심리학 및 의생명 관점에서 분석해줘. 각 지표(에너지/각성도, 감정 밸런스, 스트레스 지수, 종합 무드)에 대해 0-100 점수와 설명을 제공하고, 마지막에 풍부한 마크다운 리포트를 작성해줘. JSON 형식으로만 응답: {energy: {score, label, explanation}, valence: {score, label, explanation}, stress: {score, label, explanation}, mood: {headline, summary}, report: '## 분석 리포트\n...(rich markdown)'}

${playlist.trim()}`;

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed);
  if (fence) return JSON.parse(fence[1].trim());
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
  return JSON.parse(trimmed);
}

function clamp(n: unknown): number {
  const x = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(x)) return 50;
  return Math.min(100, Math.max(0, Math.round(x)));
}

function normalizeMetric(
  raw: Record<string, unknown> | undefined,
  fallbackLabel: string,
): AnalysisResult["energy"] {
  return {
    score: clamp(raw?.score),
    label: typeof raw?.label === "string" ? raw.label : fallbackLabel,
    explanation:
      typeof raw?.explanation === "string"
        ? raw.explanation
        : "설명을 불러오지 못했습니다.",
  };
}

export function parseAnalysisResult(data: unknown): AnalysisResult {
  if (!data || typeof data !== "object") {
    throw new Error("분석 결과 형식이 올바르지 않습니다.");
  }
  const o = data as Record<string, unknown>;
  const report =
    typeof o.report === "string"
      ? o.report
      : "## 분석 리포트\n\n리포트 본문을 불러오지 못했습니다.";
  const moodRaw = o.mood as Record<string, unknown> | undefined;
  return {
    energy: normalizeMetric(o.energy as Record<string, unknown>, "에너지"),
    valence: normalizeMetric(o.valence as Record<string, unknown>, "감정 톤"),
    stress: normalizeMetric(o.stress as Record<string, unknown>, "스트레스"),
    mood: {
      headline:
        typeof moodRaw?.headline === "string"
          ? moodRaw.headline
          : "오늘의 플레이리스트 무드",
      summary:
        typeof moodRaw?.summary === "string"
          ? moodRaw.summary
          : "요약을 불러오지 못했습니다.",
    },
    report,
  };
}

const MOCK_RESPONSE_RAW = {
  energy: {
    score: 72,
    label: "활기참",
    explanation:
      "빠른 템포의 곡이 많아 교감신경이 활성화된 상태입니다.",
  },
  valence: {
    score: 45,
    label: "복합적",
    explanation:
      "장조와 단조가 혼재하여 감정이 복잡한 상태를 반영합니다.",
  },
  stress: {
    score: 61,
    label: "주의 필요",
    explanation:
      "반복 재생 패턴이 스트레스 회피 행동과 연관될 수 있습니다.",
  },
  mood: {
    headline: "당신은 지금 카페인과 향수로 달리고 있어요 ☕",
    summary:
      "에너지는 높지만 내면은 복잡한 감정을 처리 중인 상태입니다.",
  },
  report:
    "## 분석 리포트\n\n### 에너지 지수\n빠른 BPM의 곡들이 교감신경을 자극하고 있습니다...\n\n### 감정 밸런스\n단조 비율이 높아 감정적 처리가 활발한 상태입니다...",
} as const;

export function getMockAnalysisResult(): AnalysisResult {
  return parseAnalysisResult(MOCK_RESPONSE_RAW);
}

export async function fetchPlaylistAnalysis(
  playlistText: string,
  apiKey: string,
): Promise<AnalysisResult> {
  if (isAnthropicMockMode(apiKey)) {
    return getMockAnalysisResult();
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      system: SYSTEM,
      messages: [{ role: "user", content: USER_PROMPT(playlistText) }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    let detail = errText;
    try {
      const j = JSON.parse(errText) as { error?: { message?: string } };
      if (j.error?.message) detail = j.error.message;
    } catch {
      /* ignore */
    }
    throw new Error(`API 오류 (${res.status}): ${detail}`);
  }

  const body = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
  };
  const text = body.content?.find((c) => c.type === "text")?.text;
  if (!text) throw new Error("응답에 텍스트가 없습니다.");

  const parsed = extractJson(text);
  return parseAnalysisResult(parsed);
}
