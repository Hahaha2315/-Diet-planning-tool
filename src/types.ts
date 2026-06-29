/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Servings {
  vegetables: number;
  fruits: number;
  whole_grains: number;
  meat: number;
  pure_oil: number;
  low_fat_milk: number;
}

export interface UserProfile {
  calorie_target: number;
  health_tags: string[];
  baseline_servings: Servings;
}

export interface MealLog {
  meal_name: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  food_logged: string;
  pre_meal_feel: "extreme_hunger" | "routine" | "emotional_craving";
  post_meal_feel: "satisfied_energetic" | "sluggish_somnolent" | "sugar_craving" | "bloated";
  is_checked?: boolean;
}

export interface DailyLog {
  execution_mode: "Strict" | "Loose";
  meals: MealLog[];
  end_of_day_state: {
    energy_level: number;
    mood: "peaceful" | "anxious" | "irritable" | "low";
    body_signals: string[];
  };
}

export interface MacroDeviations {
  carb_g_diff: number;
  protein_g_diff: number;
  fat_g_diff: number;
}

export interface FoodSwap {
  original: string;
  swap_to: string;
  reason: string;
}

export interface ReflectionReport {
  id?: string;
  date: string;
  daily_balance_sheet: {
    planned_calories: number;
    actual_calories_estimated: number;
    macro_deviations: MacroDeviations;
    remaining_servings_carried_over: {
      vegetables: number;
      fruits: number;
      whole_grains: number;
      meat: number;
      pure_oil: number;
      low_fat_milk?: number; // optionally tracked
    };
  };
  biometric_insights: {
    blood_sugar_stability_status: string;
    stress_energy_correlation: string;
    micronutrient_gap_detected: string[];
  };
  tomorrow_adaptive_plan: {
    calorie_deficit_adjustment: number;
    mandatory_food_swaps: FoodSwap[];
    timing_optimization: string;
    cooking_mode: string;
  };
  coach_feedback_msg: string;
  alerts?: string[]; // Custom alerts for Negative Boundary Rule violations
}
