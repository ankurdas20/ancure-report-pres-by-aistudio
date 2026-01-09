export enum AppMode {
  PRESCRIPTION = 'PRESCRIPTION',
  REPORT = 'REPORT'
}

export type Language = 'English' | 'Hindi' | 'Bengali';

export interface Medicine {
  name: string;
  details: string; // Strength, Form, Frequency combined or separate
  purpose: string;
}

export interface Ingredient {
  medicine: string;
  active_ingredient: string;
  note: string;
}

export interface SideEffect {
  medicine: string;
  effects: string;
  note: string;
}

export interface ReportTest {
  test_name: string;
  value: string;
  status: 'Normal' | 'Abnormal' | 'Unknown';
  significance: string;
}

export interface AnalysisResponse {
  mode: 'PRESCRIPTION' | 'REPORT';
  // Shared
  main_summary: string;
  final_summary_native: string; // In English, Hindi or Bengali
  
  // Prescription Specific
  medicines?: Medicine[];
  active_ingredients?: Ingredient[];
  side_effects?: SideEffect[];
  
  // Report Specific
  lab_tests?: ReportTest[];
  doctor_perspective?: string;
}

export interface UploadedFile {
  file: File;
  previewUrl: string;
}