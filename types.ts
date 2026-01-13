
export type Language = 'en' | 'es';

export interface UserData {
  sex: 'male' | 'female' | '';
  age: number | '';
  weight: number | '';
  weight_unit: 'lbs' | 'kg';
  target_weight: number | '';
  height_ft: number | '';
  height_in: number | '';
  height_cm: number | '';
  height_unit: 'ft' | 'cm';
  goal: 'Lose weight' | 'Build strength / muscle' | 'Both (lose fat and gain/maintain muscle)' | 'Maintain weight' | '';
  carb_preference: 'Very Low (0–30 g/day)' | 'Low (30–70 g/day)' | 'Moderate (70–100 g/day)' | 'High Carb (Recommended for Athletes)' | 'Not Sure — Recommend for Me' | 'No Restriction / Whole-Foods Approach' | '';
  selected_proteins: string[];
  food_preferences: string; // Kept for specific allergies/dislikes text area
}

export interface FormData {
  user: UserData;
  language: Language;
}

export interface DailyTargets {
  calories: number;
  protein_goal: number;
  carb_limit: number;
  explanation: string;
}

export interface GoalTimeline {
  estimated_goal_date: string;
}

export interface Meal {
  name: string;
  description: string;
  protein: number;
  carbs: number;
  calories: number; // Added calories to individual meal for consistency
}

export interface DailyPlan {
  day: string;
  meals: Meal[];
}

export interface MealPlanResponse {
  disclaimer: string;
  daily_targets: DailyTargets;
  goal_timeline: GoalTimeline;
  three_day_plan: DailyPlan[];
}
