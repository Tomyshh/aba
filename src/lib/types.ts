export type JobStatus = "pending" | "processing" | "completed" | "failed";

export type JobProgress = {
  current: number;
  total: number;
};

export type JobResponse = {
  id: string;
  // Backend may send a string we normalize at the UI boundary
  status: string;
  progress?: JobProgress;
  error?: string | null;
  output?: {
    docxPath?: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GlossaryEntry = {
  source: string;
  target: string;
};

export type GlossaryResponse = {
  entries: GlossaryEntry[];
};

export type TranslateResponse = {
  jobId: string;
};

export type HistoryItem = {
  jobId: string;
  filename: string;
  targetLanguage: string;
  createdAt: string;
  status?: JobStatus;
};


