/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DailyLog, MealLog } from "../types";
import { ClipboardList, HeartPulse, Sparkles, Check, RefreshCw } from "lucide-react";
import { TRANSLATIONS } from "../translations";
import { parseMealText } from "./NutritionDashboard";

interface DailyLogSectionProps {
  log: DailyLog;
  onChange: (updatedLog: DailyLog) => void;
  onApplyPreset: (presetName: string) => void;
  lang: "en" | "zh";
}

export default function DailyLogSection({ log, onChange, onApplyPreset, lang }: DailyLogSectionProps) {
  const t = TRANSLATIONS[lang];

  const BODY_SIGNALS_OPTIONS = [
    { value: "muscle_cramps", label: t.muscle_cramps },
    { value: "poor_sleep", label: t.poor_sleep },
    { value: "acne", label: t.acne },
    { value: "mild_hunger_signal", label: t.mild_hunger_signal },
    { value: "bloated", label: t.bloating_indigestion },
    { value: "muscle_soreness", label: t.muscle_soreness },
    { value: "fatigue", label: t.fatigue }
  ];

  const PRE_FEEL_OPTIONS = [
    { value: "routine", label: t.routine },
    { value: "extreme_hunger", label: t.extreme_hunger },
    { value: "emotional_craving", label: t.emotional_craving }
  ];

  const POST_FEEL_OPTIONS = [
    { value: "satisfied_energetic", label: t.satisfied_energetic },
    { value: "sluggish_somnolent", label: t.sluggish_somnolent },
    { value: "sugar_craving", label: t.sugar_craving },
    { value: "bloated", label: t.bloated }
  ];

  const MOOD_OPTIONS = [
    { value: "peaceful", label: t.peaceful },
    { value: "anxious", label: t.anxious },
    { value: "irritable", label: t.irritable },
    { value: "low", label: t.low }
  ] as const;

  const handleMealChange = (index: number, updatedMeal: Partial<MealLog>) => {
    const updatedMeals = [...log.meals];
    updatedMeals[index] = { ...updatedMeals[index], ...updatedMeal } as MealLog;
    onChange({
      ...log,
      meals: updatedMeals
    });
  };

  const toggleBodySignal = (signal: string) => {
    const isPresent = log.end_of_day_state.body_signals.includes(signal);
    const updated = isPresent
      ? log.end_of_day_state.body_signals.filter((s) => s !== signal)
      : [...log.end_of_day_state.body_signals, signal];

    onChange({
      ...log,
      end_of_day_state: {
        ...log.end_of_day_state,
        body_signals: updated
      }
    });
  };

  const getMealNameLabel = (name: string) => {
    if (lang === "zh") {
      switch (name) {
        case "Breakfast": return "早餐";
        case "Lunch": return "午餐";
        case "Dinner": return "晚餐";
        case "Snack": return "加餐 / 零食";
        default: return name;
      }
    }
    return name;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <ClipboardList className="w-5 h-5" id="log-list-icon" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-base text-slate-800 tracking-tight">{t.log_title}</h3>
            <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.log_subtitle}</p>
          </div>
        </div>

        {/* Execution Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl p-1 self-start sm:self-auto">
          <button
            onClick={() => onChange({ ...log, execution_mode: "Strict" })}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${log.execution_mode === "Strict" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
            id="mode-strict-btn"
          >
            {t.mode_strict}
          </button>
          <button
            onClick={() => onChange({ ...log, execution_mode: "Loose" })}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${log.execution_mode === "Loose" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
            id="mode-loose-btn"
          >
            {t.mode_loose}
          </button>
        </div>
      </div>

      {/* Preset Fast-Fills */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.preset_title}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onApplyPreset("blood_sugar")}
            className="bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 rounded-xl p-2.5 text-left transition-all cursor-pointer"
            id="preset-sugar-btn"
          >
            <p className="text-xs font-bold text-slate-800">{t.preset_sugar}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{t.preset_sugar_sub}</p>
          </button>
          <button
            onClick={() => onApplyPreset("cortisol")}
            className="bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 rounded-xl p-2.5 text-left transition-all cursor-pointer"
            id="preset-cortisol-btn"
          >
            <p className="text-xs font-bold text-slate-800">{t.preset_cortisol}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{t.preset_cortisol_sub}</p>
          </button>
          <button
            onClick={() => onApplyPreset("micronutrients")}
            className="bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 rounded-xl p-2.5 text-left transition-all cursor-pointer"
            id="preset-micro-btn"
          >
            <p className="text-xs font-bold text-slate-800">{t.preset_micro}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{t.preset_micro_sub}</p>
          </button>
          <button
            onClick={() => onApplyPreset("negative_boundary")}
            className="bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 rounded-xl p-2.5 text-left transition-all cursor-pointer"
            id="preset-boundary-btn"
          >
            <p className="text-xs font-bold text-slate-800">{t.preset_boundary}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{t.preset_boundary_sub}</p>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Log Modes Notice */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex gap-3 text-xs leading-relaxed text-slate-600">
          <HeartPulse className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          {log.execution_mode === "Strict" ? (
            <p>
              <strong className="text-slate-800">{t.mode_strict}:</strong> {t.strict_notice}
            </p>
          ) : (
            <p>
              <strong className="text-slate-800">{t.mode_loose}:</strong> {t.loose_notice}
            </p>
          )}
        </div>

        {/* Meals Logs */}
        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            {t.logged_meals}
          </label>
          
          {log.meals.map((meal, idx) => {
            const stats = log.execution_mode === "Loose" ? parseMealText(meal.food_logged) : null;
            const isChecked = !!meal.is_checked;

            return (
              <div 
                key={meal.meal_name} 
                className={`border rounded-xl p-4 space-y-3 transition-all ${
                  log.execution_mode === "Strict" && isChecked
                    ? "bg-emerald-50/30 border-emerald-400 shadow-2xs"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-700">
                    {getMealNameLabel(meal.meal_name)}
                  </span>
                  <div className="flex items-center gap-2">
                    {log.execution_mode === "Strict" && (
                      <button
                        type="button"
                        onClick={() => handleMealChange(idx, { is_checked: !isChecked })}
                        className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase cursor-pointer transition-all flex items-center gap-1 ${
                          isChecked
                            ? "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                            : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                        }`}
                        id={`meal-${meal.meal_name.toLowerCase()}-check-btn`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5" />}
                        {isChecked ? t.strict_checked : t.strict_unchecked}
                      </button>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">{t.meal_num} #{idx + 1}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {log.execution_mode === "Strict" 
                      ? (lang === "zh" ? "食物描述 (选填，仅供背景追踪，不计入额外能量)" : "Food description (Optional)")
                      : t.what_did_you_eat
                    }
                  </label>
                  <input
                    type="text"
                    placeholder={
                      log.execution_mode === "Loose"
                        ? t.placeholder_loose
                        : t.placeholder_strict
                    }
                    value={meal.food_logged}
                    onChange={(e) => handleMealChange(idx, { food_logged: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    id={`meal-${meal.meal_name.toLowerCase()}-food`}
                  />
                </div>

                {/* Loose Mode: Agent Real-time Deconstruction and Quick Swap */}
                {log.execution_mode === "Loose" && meal.food_logged.trim().length > 0 && stats && (
                  <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-lg p-2.5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {t.deconstruct_result}
                      </span>
                      <span className="font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        +{stats.calories} kcal
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-emerald-700 font-mono">
                      <div>{t.carbs}: <strong className="text-emerald-900">+{stats.carbs}g</strong></div>
                      <div>{t.protein}: <strong className="text-emerald-900">+{stats.protein}g</strong></div>
                      <div>{t.fat}: <strong className="text-emerald-900">+{stats.fat}g</strong></div>
                    </div>

                    {/* Quick Swap Trigger */}
                    {stats.unhealthy && stats.suggested_swap && (
                      <div className="bg-amber-50 border border-amber-200 rounded p-2 text-[10px] text-amber-800 space-y-1.5 leading-normal mt-1">
                        <p className="font-semibold flex items-center gap-1 text-amber-900">
                          ⚠️ {lang === "zh" ? "检测到非不合规食物，建议一键替换：" : "Detected item needing replacement:"}
                        </p>
                        <p className="font-sans text-[11px] font-bold text-emerald-800">✨ {stats.suggested_swap}</p>
                        <button
                          type="button"
                          onClick={() => handleMealChange(idx, { food_logged: stats.swap_replacement || "" })}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded text-[9px] flex items-center gap-1 shadow-2xs mt-1 transition-all cursor-pointer"
                          id={`meal-${meal.meal_name.toLowerCase()}-swap-btn`}
                        >
                          <RefreshCw className="w-2.5 h-2.5" />
                          {t.loose_swap_btn}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t.pre_meal_feel}</label>
                    <select
                      value={meal.pre_meal_feel}
                      onChange={(e) => handleMealChange(idx, { pre_meal_feel: e.target.value as any })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                      id={`meal-${meal.meal_name.toLowerCase()}-pre`}
                    >
                      {PRE_FEEL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t.post_meal_feel}</label>
                    <select
                      value={meal.post_meal_feel}
                      onChange={(e) => handleMealChange(idx, { post_meal_feel: e.target.value as any })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                      id={`meal-${meal.meal_name.toLowerCase()}-post`}
                    >
                      {POST_FEEL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End of Day State */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <span className="font-sans font-semibold text-sm text-slate-800">{t.end_of_day_title}</span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t.energy_level_label}</label>
              <span className="font-mono text-xs font-bold text-slate-800">{log.end_of_day_state.energy_level}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={log.end_of_day_state.energy_level}
              onChange={(e) =>
                onChange({
                  ...log,
                  end_of_day_state: {
                    ...log.end_of_day_state,
                    energy_level: parseInt(e.target.value) || 5
                  }
                })
              }
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              id="energy-range"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.daily_mood}</label>
              <div className="grid grid-cols-2 gap-2">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() =>
                      onChange({
                        ...log,
                        end_of_day_state: {
                          ...log.end_of_day_state,
                          mood: mood.value
                        }
                      })
                    }
                    className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${log.end_of_day_state.mood === mood.value ? "bg-emerald-600 border-emerald-500 text-white shadow-xs" : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"}`}
                    id={`mood-${mood.value}-btn`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.physiological_signals}</label>
              <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {BODY_SIGNALS_OPTIONS.map((sig) => {
                  const checked = log.end_of_day_state.body_signals.includes(sig.value);
                  return (
                    <button
                      key={sig.value}
                      onClick={() => toggleBodySignal(sig.value)}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-colors cursor-pointer ${checked ? 'bg-emerald-50 border-emerald-100 text-emerald-800 font-semibold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      id={`signal-${sig.value}-btn`}
                    >
                      <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center font-bold text-[9px] ${checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                        {checked && "✓"}
                      </span>
                      <span className="text-[11px] font-medium">{sig.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
