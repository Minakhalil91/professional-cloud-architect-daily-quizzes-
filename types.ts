
export enum PCASection {
  DESIGN_SOLUTION = 'Designing a solution architecture',
  MANAGE_PROVISION = 'Managing and provisioning infrastructure',
  DESIGN_SECURITY = 'Designing for security and compliance',
  ANALYZE_OPTIMIZE = 'Analyzing and optimizing processes',
  RELIABILITY = 'Designing for reliability'
}

export interface PCAQuestion {
  id: string;
  topic: string;
  section: PCASection;
  caseStudy?: string;
  scenario: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'Associate' | 'Professional' | 'Expert';
}

export interface UserProgress {
  totalAttempted: number;
  totalCorrect: number;
  streak: number;
  lastSolvedDate: string | null;
}

export interface CaseStudy {
  name: string;
  overview: string;
  businessGoals: string[];
  technicalRequirements: string[];
}
