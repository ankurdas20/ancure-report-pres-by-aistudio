export enum AppMode {
  PRESCRIPTION = 'PRESCRIPTION',
  REPORT = 'REPORT'
}

export interface AnalysisState {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

export interface UploadedFile {
  file: File;
  previewUrl: string;
}
