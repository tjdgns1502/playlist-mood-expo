export interface MetricBlock {
  score: number;
  label: string;
  explanation: string;
}

export interface AnalysisResult {
  energy: MetricBlock;
  valence: MetricBlock;
  stress: MetricBlock;
  mood: {
    headline: string;
    summary: string;
  };
  report: string;
}
