
export interface CustomAssessmentItem {
  id: number;
  label: string;
  score: number;
}

export interface Initiative {
  id: number;
  description: string;
}

export interface InitiativesData {
  initiatives: Initiative[];
}

export interface OverallEvaluationData {
  achievements: string;
  challenges: string;
  nextWeekGoals: string;
}

export interface BarChartData {
  name: string;
  '稼働時間': number;
}

export interface RadarChartData {
  subject: string;
  score: number;
  fullMark: number;
}

export interface Task {
  id: number;
  description: string;
  time: number;
}