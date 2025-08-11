export interface Criteria {
  id: number;
  category: string;
  points: number;
  description: string;
  isDisqualifying: boolean;
}

export interface CriteriaGroup {
  idFirstSemester: number | null;
  idSecondSemester: number | null;
  name: string;
  gradeWeightFirstSemester: number;
  gradeWeightSecondSemester: number;
  criteria: Criteria[];
}

export interface CriteriaSection {
  idFirstSemester: number;
  idSecondSemester: number;
  name: string;
  isDefenseSection: boolean;
  criteriaSectionGradeWeightFirstSemester: number;
  criteriaSectionGradeWeightSecondSemester: number;
  criteriaGroups: CriteriaGroup[];
}

export interface CriteriaData {
  studyYear: string;
  minPointsThresholdFirstSemester: number;
  minPointsThresholdSecondSemester: number;
  criteriaSections: CriteriaSection[];
} 