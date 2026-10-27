export interface ScenarioOption {
  id: string;
  textAr: string;
  textEn: string;
  isBest: boolean;
  score: number; // 0 - 100
  pedagogicalRationaleAr: string;
  pedagogicalRationaleEn: string;
  studentReactionAr: string;
  studentReactionEn: string;
  category: 'direct_instruction' | 'scaffolding' | 'inquiry' | 'authoritative';
}

export interface ScenarioScoreResult {
  score: number;
  levelAr: string;
  levelEn: string;
  feedbackAr: string;
  feedbackEn: string;
}

export function evaluateTeacherResponse(option: ScenarioOption): ScenarioScoreResult {
  const score = option.score;

  let levelAr = 'معلم ممارس متقدم';
  let levelEn = 'Master Practitioner';

  if (score >= 90) {
    levelAr = 'معلم متميز خبير';
    levelEn = 'Master Teacher';
  } else if (score >= 70) {
    levelAr = 'مستوى متقدم وكفء';
    levelEn = 'Proficient';
  } else if (score >= 50) {
    levelAr = 'مستوى في طور النمو';
    levelEn = 'Developing';
  } else {
    levelAr = 'يحتاج إلى مراجعة استراتيجية';
    levelEn = 'Needs Scaffolding';
  }

  return {
    score,
    levelAr,
    levelEn,
    feedbackAr: option.pedagogicalRationaleAr,
    feedbackEn: option.pedagogicalRationaleEn,
  };
}
