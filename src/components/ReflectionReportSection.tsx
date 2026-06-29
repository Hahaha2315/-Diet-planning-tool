/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReflectionReport } from "../types";
import { 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  Flame, 
  Scale, 
  Sparkles, 
  UtensilsCrossed, 
  Timer
} from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface ReflectionReportSectionProps {
  report: ReflectionReport;
  lang: "en" | "zh";
}

export default function ReflectionReportSection({ report, lang }: ReflectionReportSectionProps) {
  const t = TRANSLATIONS[lang];
  const {
    daily_balance_sheet,
    biometric_insights,
    tomorrow_adaptive_plan,
    coach_feedback_msg,
    alerts = []
  } = report;

  // Formatting macro deviation with +/-
  const formatDiff = (num: number) => {
    return num > 0 ? `+${num}g` : `${num}g`;
  };

  const getServingName = (key: string) => {
    if (lang === "zh") {
      switch (key.toLowerCase()) {
        case "vegetables": return "蔬菜";
        case "fruits": return "水果";
        case "low_fat_milk": return "低脂牛奶";
        case "whole_grains": return "全谷物";
        case "meat": return "肉类 / 蛋白质";
        case "pure_oil": return "纯油脂";
        default: return key.replace('_', ' ');
      }
    }
    return key.replace('_', ' ');
  };

  return (
    <div className="space-y-6">
      {/* Alerts / Negative Boundary Alerts */}
      {alerts && alerts.length > 0 && (
        <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-900 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5 animate-bounce" id="alert-warning-icon" />
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-rose-800">
                {t.safety_alert}
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-rose-700 leading-relaxed font-sans">
                {alerts.map((alert, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <span className="text-rose-500">•</span>
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[10px] text-rose-600 uppercase font-bold tracking-wider">
                {t.safety_note}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Feedback & Coach Message */}
      <div className="bg-emerald-50 rounded-xl border-l-4 border-emerald-500 p-5 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">{t.behavior_reflection}</span>
        </div>

        <h3 className="font-sans font-bold text-sm text-emerald-950 mb-2 tracking-tight">{t.digital_nutrition_report}</h3>
        <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
          "{coach_feedback_msg}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Balance Sheet */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Scale className="w-5 h-5 text-emerald-600" />
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-slate-700">{t.daily_balance_sheet}</h4>
          </div>

          {/* Calorie Progress */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-bold text-[10px]">{t.planned_energy}</span>
              <span className="font-mono text-slate-600 font-bold">{daily_balance_sheet.planned_calories} kcal</span>
            </div>
            
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (daily_balance_sheet.actual_calories_estimated / (daily_balance_sheet.planned_calories || 1)) * 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-bold text-[10px]">{t.estimated_actual}</span>
              <span className="font-mono text-emerald-700 font-extrabold">{daily_balance_sheet.actual_calories_estimated} kcal</span>
            </div>
          </div>

          {/* Macro Deviations */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.macro_deviations}</span>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.carbs}</span>
                <span className={`font-mono text-xs font-bold ${daily_balance_sheet.macro_deviations.carb_g_diff > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {formatDiff(daily_balance_sheet.macro_deviations.carb_g_diff)}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.protein}</span>
                <span className={`font-mono text-xs font-bold ${daily_balance_sheet.macro_deviations.protein_g_diff < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {formatDiff(daily_balance_sheet.macro_deviations.protein_g_diff)}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.fat}</span>
                <span className={`font-mono text-xs font-bold ${daily_balance_sheet.macro_deviations.fat_g_diff > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {formatDiff(daily_balance_sheet.macro_deviations.fat_g_diff)}
                </span>
              </div>
            </div>
          </div>

          {/* Remaining Servings */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.carryover_servings}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(daily_balance_sheet.remaining_servings_carried_over).map(([key, val]) => (
                <div key={key} className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex justify-between items-center px-3">
                  <span className="text-[10px] text-slate-500 font-semibold capitalize">{getServingName(key)}</span>
                  <span className={`font-mono text-xs font-bold ${val < 0 ? 'text-rose-600 font-extrabold' : 'text-slate-800'}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Biometric Insights */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-slate-700">{t.physiological_analytics}</h4>
          </div>

          {/* Blood Sugar Badge */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.glucose_stability}</span>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                biometric_insights.blood_sugar_stability_status.toLowerCase().includes('volatile') || 
                biometric_insights.blood_sugar_stability_status.toLowerCase().includes('crash') ||
                biometric_insights.blood_sugar_stability_status.toLowerCase().includes('rollercoaster') ||
                biometric_insights.blood_sugar_stability_status.includes('波动') || 
                biometric_insights.blood_sugar_stability_status.includes('崩溃')
                  ? 'bg-rose-50 border border-rose-100 text-rose-700'
                  : 'bg-emerald-50 border border-emerald-100 text-emerald-800'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  biometric_insights.blood_sugar_stability_status.toLowerCase().includes('volatile') || 
                  biometric_insights.blood_sugar_stability_status.toLowerCase().includes('crash') ||
                  biometric_insights.blood_sugar_stability_status.toLowerCase().includes('rollercoaster') ||
                  biometric_insights.blood_sugar_stability_status.includes('波动') || 
                  biometric_insights.blood_sugar_stability_status.includes('崩溃')
                    ? 'bg-rose-500'
                    : 'bg-emerald-500'
                }`}></span>
                {biometric_insights.blood_sugar_stability_status}
              </span>
            </div>
          </div>

          {/* Stress-Energy Correlation */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.stress_cortisol}</span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              {biometric_insights.stress_energy_correlation}
            </p>
          </div>

          {/* Micronutrients gaps */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.micronutrient_gap}</span>
            <div className="flex flex-wrap gap-1.5">
              {biometric_insights.micronutrient_gap_detected.map((gap, idx) => (
                <span key={idx} className="bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-800">
                  ⚡ {gap}
                </span>
              ))}
              {biometric_insights.micronutrient_gap_detected.length === 0 && (
                <span className="text-xs text-slate-400 font-sans italic flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {t.no_gap_flagged}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tomorrow's Adaptive Plan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-5 relative">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-slate-700">{t.tomorrow_plan}</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider">{t.calorie_deficit}</span>
            </div>
            <p className="text-lg font-mono font-bold text-slate-800">
              {tomorrow_adaptive_plan.calorie_deficit_adjustment >= 0 ? "+" : ""}
              {tomorrow_adaptive_plan.calorie_deficit_adjustment} kcal
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">{t.relative_deficit_calib}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Timer className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">{t.timing_opt}</span>
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-normal">
              {tomorrow_adaptive_plan.timing_optimization}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <UtensilsCrossed className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">{t.cooking_mode}</span>
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-normal">
              {tomorrow_adaptive_plan.cooking_mode}
            </p>
          </div>
        </div>

        {/* Mandatory Food Swaps */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.mandatory_food_swaps}</span>
          <div className="space-y-2">
            {tomorrow_adaptive_plan.mandatory_food_swaps.map((swap, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="line-through text-slate-400 font-medium text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                    {swap.original}
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold text-xs bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                    {swap.swap_to}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {swap.reason}
                </p>
              </div>
            ))}
            {tomorrow_adaptive_plan.mandatory_food_swaps.length === 0 && (
              <p className="text-xs text-slate-400 font-sans italic">{t.no_food_swaps}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
