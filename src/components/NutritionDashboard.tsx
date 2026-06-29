/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, DailyLog, MealLog } from "../types";
import { TRANSLATIONS } from "../translations";
import { 
  Flame, 
  Dumbbell, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Sparkles
} from "lucide-react";

interface NutritionDashboardProps {
  profile: UserProfile;
  log: DailyLog;
  onUpdateLog: (updatedLog: DailyLog) => void;
  lang: "en" | "zh";
}

// Utility to parse a single meal's text log and deconstruct into macros
export function parseMealText(text: string): { 
  calories: number; 
  carbs: number; 
  protein: number; 
  fat: number; 
  unhealthy: boolean; 
  suggested_swap?: string; 
  swap_replacement?: string;
} {
  const lower = text.toLowerCase().trim();
  let calories = 0;
  let carbs = 0;
  let protein = 0;
  let fat = 0;
  let unhealthy = false;
  let suggested_swap = "";
  let swap_replacement = "";

  if (!text || lower === "") {
    return { calories, carbs, protein, fat, unhealthy };
  }

  let matched = false;

  if (lower.includes("gelato") || lower.includes("ice cream") || lower.includes("冰淇淋") || lower.includes("雪糕") || lower.includes("甜筒")) {
    calories += 250;
    carbs += 35;
    protein += 4;
    fat += 11;
    unhealthy = true;
    suggested_swap = "希腊酸奶配莓果 (Greek Yogurt 100g)";
    swap_replacement = "Greek Yogurt 100g with mixed berries";
    matched = true;
  }
  else if (lower.includes("croissant") || lower.includes("pastry") || lower.includes("牛角") || lower.includes("起酥") || lower.includes("泡芙")) {
    calories += 270;
    carbs += 30;
    protein += 5;
    fat += 15;
    unhealthy = true;
    suggested_swap = "低脂奶酪全麦贝果 (Whole Wheat Bagel)";
    swap_replacement = "Whole wheat bagel with light cream cheese";
    matched = true;
  }
  else if (lower.includes("soft brioche") || lower.includes("brioche") || lower.includes("布里欧") || lower.includes("软面包") || lower.includes("toast") || lower.includes("吐司") || lower.includes("white bread") || lower.includes("白吐司")) {
    calories += 160;
    carbs += 30;
    protein += 4;
    fat += 3;
    unhealthy = true;
    suggested_swap = "全麦酸面包 (Sourdough Bread)";
    swap_replacement = "Whole grain sourdough bread 35g";
    matched = true;
  }
  else if (lower.includes("french fries") || lower.includes("fries") || lower.includes("chips") || lower.includes("薯条") || lower.includes("薯片")) {
    calories += 220;
    carbs += 28;
    protein += 3;
    fat += 11;
    unhealthy = true;
    suggested_swap = "无油空气炸薯条 / 烤红薯 (Air-fried Sweet Potato)";
    swap_replacement = "Air-fried sweet potato wedges 100g";
    matched = true;
  }
  else if (lower.includes("baguette") || lower.includes("法棍") || lower.includes("bread") || lower.includes("面包")) {
    calories += 120;
    carbs += 25;
    protein += 4;
    fat += 1;
    matched = true;
  }
  else if (lower.includes("chicken") || lower.includes("鸡") || lower.includes("steak") || lower.includes("beef") || lower.includes("牛排") || lower.includes("牛肉") || lower.includes("肉") || lower.includes("pork") || lower.includes("猪肉")) {
    calories += 180;
    carbs += 0;
    protein += 25;
    fat += 8;
    matched = true;
  }
  else if (lower.includes("salmon") || lower.includes("鱼") || lower.includes("fish") || lower.includes("三文鱼") || lower.includes("虾") || lower.includes("shrimp") || lower.includes("seafood")) {
    calories += 160;
    carbs += 0;
    protein += 20;
    fat += 9;
    matched = true;
  }
  else if (lower.includes("salad") || lower.includes("broccoli") || lower.includes("蔬菜") || lower.includes("西兰花") || lower.includes("沙拉") || lower.includes("黄瓜") || lower.includes("西红柿") || lower.includes("tomato") || lower.includes("cucumber") || lower.includes("veg")) {
    calories += 40;
    carbs += 8;
    protein += 1.5;
    fat += 0;
    matched = true;
  }
  else if (lower.includes("rice") || lower.includes("米饭") || lower.includes("brown rice") || lower.includes("糙米") || lower.includes("糙米饭")) {
    calories += 140;
    carbs += 30;
    protein += 3;
    fat += 0.5;
    matched = true;
  }
  else if (lower.includes("oats") || lower.includes("燕麦") || lower.includes("oatmeal") || lower.includes("noodle") || lower.includes("面条")) {
    calories += 130;
    carbs += 26;
    protein += 4;
    fat += 1.5;
    matched = true;
  }
  else if (lower.includes("almonds") || lower.includes("坚果") || lower.includes("mixed almonds") || lower.includes("巴旦木") || lower.includes("peanut") || lower.includes("nut")) {
    calories += 120;
    carbs += 3;
    protein += 3;
    fat += 11;
    matched = true;
  }
  else if (lower.includes("avocado") || lower.includes("牛油果")) {
    calories += 160;
    carbs += 6;
    protein += 1.5;
    fat += 15;
    matched = true;
  }
  else if (lower.includes("yogurt") || lower.includes("酸奶") || lower.includes("milk") || lower.includes("牛奶")) {
    calories += 100;
    carbs += 10;
    protein += 7;
    fat += 3;
    matched = true;
  }
  else if (lower.includes("egg") || lower.includes("鸡蛋") || lower.includes("煎蛋")) {
    calories += 75;
    carbs += 0.5;
    protein += 6;
    fat += 5;
    matched = true;
  }

  // Smart fallback estimate if there is some text logged but no matches
  if (!matched && text.trim().length > 0) {
    calories = 110;
    carbs = 14;
    protein = 6;
    fat = 3;
  }

  return { calories, carbs, protein, fat, unhealthy, suggested_swap, swap_replacement };
}

export default function NutritionDashboard({ profile, log, onUpdateLog, lang }: NutritionDashboardProps) {
  const t = TRANSLATIONS[lang];

  // 1. Calculate Target Carbs, Protein, Fat, Calories
  const { vegetables = 0, fruits = 0, whole_grains = 0, meat = 0, pure_oil = 0, low_fat_milk = 0 } = profile.baseline_servings;
  
  const targetCarbs = (whole_grains * 15) + (fruits * 15) + (vegetables * 5) + (low_fat_milk * 12);
  const targetProtein = (meat * 7) + (vegetables * 1) + (whole_grains * 2) + (low_fat_milk * 8);
  const targetFat = (pure_oil * 5) + (meat * 5) + (low_fat_milk * 2);
  const targetCalories = profile.calorie_target;

  // 2. Calculate Actual Intake based on Mode
  let actualCalories = 0;
  let actualCarbs = 0;
  let actualProtein = 0;
  let actualFat = 0;

  if (log.execution_mode === "Strict") {
    // Strict Mode: Meal Check-in (打卡)
    // We distribute daily targets: Breakfast 25%, Lunch 35%, Dinner 30%, Snack 10%
    log.meals.forEach((meal) => {
      if (meal.is_checked) {
        let pct = 0.25;
        if (meal.meal_name === "Lunch") pct = 0.35;
        else if (meal.meal_name === "Dinner") pct = 0.30;
        else if (meal.meal_name === "Snack") pct = 0.10;

        actualCalories += Math.round(targetCalories * pct);
        actualCarbs += Math.round(targetCarbs * pct);
        actualProtein += Math.round(targetProtein * pct);
        actualFat += Math.round(targetFat * pct);
      }
    });
  } else {
    // Loose Mode: Automatic text deconstruction
    log.meals.forEach((meal) => {
      const stats = parseMealText(meal.food_logged);
      actualCalories += stats.calories;
      actualCarbs += stats.carbs;
      actualProtein += stats.protein;
      actualFat += stats.fat;
    });
  }

  // Progress Percentages
  const calPercent = Math.min(100, Math.round((actualCalories / (targetCalories || 1)) * 100));
  const carbPercent = Math.min(100, Math.round((actualCarbs / (targetCarbs || 1)) * 100));
  const proteinPercent = Math.min(100, Math.round((actualProtein / (targetProtein || 1)) * 100));
  const fatPercent = Math.min(100, Math.round((actualFat / (targetFat || 1)) * 100));

  // Toggling meal check-in
  const toggleCheckIn = (idx: number) => {
    const updatedMeals = [...log.meals];
    updatedMeals[idx] = { 
      ...updatedMeals[idx], 
      is_checked: !updatedMeals[idx].is_checked 
    };
    onUpdateLog({
      ...log,
      meals: updatedMeals
    });
  };

  // Quick Swap replacement
  const applyQuickSwap = (idx: number, replacementText: string) => {
    const updatedMeals = [...log.meals];
    updatedMeals[idx] = { 
      ...updatedMeals[idx], 
      food_logged: lang === "zh" 
        ? parseMealText(updatedMeals[idx].food_logged).suggested_swap || replacementText 
        : replacementText 
    };
    onUpdateLog({
      ...log,
      meals: updatedMeals
    });
  };

  const getMealLabelZh = (name: string) => {
    switch (name) {
      case "Breakfast": return "早餐";
      case "Lunch": return "午餐";
      case "Dinner": return "晚餐";
      case "Snack": return "加餐 / 零食";
      default: return name;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm relative overflow-hidden space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 animate-pulse">
          <Activity className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} id="board-live-icon" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-base text-slate-800 tracking-tight">{t.board_title}</h3>
          <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.board_subtitle}</p>
        </div>
      </div>

      {/* Grid: 4 Metric Boards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Calories Circle Display */}
        <div className="md:col-span-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">{t.board_calories}</span>
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-slate-200 fill-none"
                strokeWidth="5"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-emerald-600 fill-none transition-all duration-500"
                strokeWidth="5"
                strokeDasharray="213.6"
                strokeDashoffset={213.6 - (213.6 * calPercent) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="font-mono text-xs font-black text-slate-800">{actualCalories}</span>
              <span className="text-[9px] text-slate-400 block border-t border-slate-100 pt-0.5">/{targetCalories}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 mt-2">{calPercent}%</span>
        </div>

        {/* Macros Bars */}
        <div className="md:col-span-3 space-y-3.5 flex flex-col justify-center">
          
          {/* Carbs */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-bold text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {t.board_carbs}
              </span>
              <span className="font-mono text-slate-600 text-[11px]">
                <strong className="text-slate-800">{actualCarbs}g</strong> / {targetCarbs}g ({carbPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${carbPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Protein */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-bold text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                {t.board_protein}
              </span>
              <span className="font-mono text-slate-600 text-[11px]">
                <strong className="text-slate-800">{actualProtein}g</strong> / {targetProtein}g ({proteinPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${proteinPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Fat */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-bold text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                {t.board_fat}
              </span>
              <span className="font-mono text-slate-600 text-[11px]">
                <strong className="text-slate-800">{actualFat}g</strong> / {targetFat}g ({fatPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-rose-50 h-full rounded-full transition-all duration-500 bg-rose-500" 
                style={{ width: `${fatPercent}%` }}
              ></div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Conditional System: Strict Mode check-ins or Loose Mode Replacements */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4.5 space-y-3.5">
        
        {log.execution_mode === "Strict" ? (
          // STRICT MODE: MEAL CHECK-IN CHECKLIST
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">{t.strict_checkin_title}</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal mb-2">{t.strict_checkin_desc}</p>
            
            <div className="grid grid-cols-2 gap-2">
              {log.meals.map((meal, idx) => {
                const isChecked = !!meal.is_checked;
                return (
                  <button
                    key={meal.meal_name}
                    onClick={() => toggleCheckIn(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all text-xs font-bold cursor-pointer ${
                      isChecked 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-2xs' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50'
                    }`}
                    id={`board-checkin-${meal.meal_name.toLowerCase()}`}
                  >
                    <span>{lang === "zh" ? getMealLabelZh(meal.meal_name) : meal.meal_name}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] uppercase font-mono ${isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {isChecked ? t.strict_checked : t.strict_unchecked}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          // LOOSE MODE: INTELLIGENT COMPLIANCE REPLACEMENTS
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">{t.loose_swap_title}</span>
            </div>
            
            {/* Find matching replacement triggers */}
            {log.meals.some(m => parseMealText(m.food_logged).unhealthy) ? (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 leading-normal">{t.loose_swap_desc}</p>
                
                {log.meals.map((meal, idx) => {
                  const stats = parseMealText(meal.food_logged);
                  if (!stats.unhealthy) return null;

                  return (
                    <div key={meal.meal_name} className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-normal">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-extrabold tracking-wider text-rose-500 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded">
                          {lang === "zh" ? getMealLabelZh(meal.meal_name) : meal.meal_name}
                        </span>
                        <p className="font-mono text-slate-800 font-bold mt-1 line-through decoration-rose-500/60">
                          {meal.food_logged}
                        </p>
                        <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                          ✨ {stats.suggested_swap}
                        </p>
                      </div>

                      <button
                        onClick={() => applyQuickSwap(idx, stats.swap_replacement || "")}
                        className="self-start sm:self-auto bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                        id={`board-swap-btn-${meal.meal_name.toLowerCase()}`}
                      >
                        <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                        {t.loose_swap_btn}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-2 flex gap-2.5 items-start text-xs text-slate-600 leading-relaxed font-sans bg-emerald-50/50 border border-emerald-100 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>{t.loose_no_swaps}</p>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
