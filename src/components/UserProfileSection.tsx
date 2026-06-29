/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { UserProfile, Servings } from "../types";
import { User, ShieldAlert, Heart, Plus, X, Flame } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface UserProfileSectionProps {
  profile: UserProfile;
  onChange: (updatedProfile: UserProfile) => void;
  lang: "en" | "zh";
}

const PRESET_HEALTH_TAGS_MAP: Record<string, { en: string; zh: string }> = {
  "Insulin Resistant": { en: "Insulin Resistant", zh: "胰岛素抵抗" },
  "High Stress": { en: "High Stress", zh: "高压力状态" },
  "Active Runner": { en: "Active Runner", zh: "活跃跑者" },
  "Sedentary": { en: "Sedentary", zh: "久坐不动" },
  "Night Owl": { en: "Night Owl", zh: "夜猫子一族" },
  "Muscle Gain Intent": { en: "Muscle Gain Intent", zh: "有增肌意向" },
  "Athletic": { en: "Athletic", zh: "专业运动型" },
  "Hypothyroid": { en: "Hypothyroid", zh: "甲状腺功能减退" }
};

export default function UserProfileSection({ profile, onChange, lang }: UserProfileSectionProps) {
  const [newTag, setNewTag] = useState("");
  const t = TRANSLATIONS[lang];

  const PRESET_HEALTH_TAGS = Object.keys(PRESET_HEALTH_TAGS_MAP).map(key => 
    lang === "zh" ? PRESET_HEALTH_TAGS_MAP[key].zh : PRESET_HEALTH_TAGS_MAP[key].en
  );

  const updateServings = (key: keyof Servings, val: number) => {
    const updated = { ...profile.baseline_servings, [key]: Math.max(0, val) };
    onChange({
      ...profile,
      baseline_servings: updated
    });
  };

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !profile.health_tags.includes(clean)) {
      onChange({
        ...profile,
        health_tags: [...profile.health_tags, clean]
      });
    }
  };

  const removeTag = (tag: string) => {
    onChange({
      ...profile,
      health_tags: profile.health_tags.filter((t) => t !== tag)
    });
  };

  // Standard serving calculations
  const calculateCalculatedCalories = () => {
    const s = profile.baseline_servings;
    return (
      (s.vegetables || 0) * 25 +
      (s.fruits || 0) * 60 +
      (s.low_fat_milk || 0) * 120 +
      (s.whole_grains || 0) * 70 +
      (s.meat || 0) * 75 +
      (s.pure_oil || 0) * 45
    );
  };

  const calculatedCals = calculateCalculatedCalories();
  const calDifference = calculatedCals - profile.calorie_target;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
          <User className="w-5 h-5" id="profile-user-icon" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-base text-slate-800 tracking-tight">{t.profile_title}</h3>
          <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.profile_subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Calorie Targets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.calorie_goal}
            </label>
            <div className="relative">
              <input
                type="number"
                value={profile.calorie_target}
                onChange={(e) => onChange({ ...profile, calorie_target: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                id="calorie-target-input"
              />
              <Flame className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">{t.exchange_sum}</span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-slate-800">{calculatedCals}</span>
              <span className="text-xs text-slate-400 font-medium">kcal</span>
            </div>
            <p className={`text-[10px] font-sans mt-1 ${Math.abs(calDifference) <= 50 ? 'text-emerald-600 font-semibold' : calDifference > 50 ? 'text-amber-600 font-semibold' : 'text-rose-600 font-semibold'}`}>
              {Math.abs(calDifference) <= 50 
                ? t.balanced_target 
                : `${calDifference > 0 ? '+' : ''}${calDifference} ${t.calorie_dev}`}
            </p>
          </div>
        </div>

        {/* Servings Plan */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            {t.baseline_allocation}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { key: "vegetables", label: t.vegetables, val: 25, color: "text-emerald-600" },
              { key: "fruits", label: t.fruits, val: 60, color: "text-orange-600" },
              { key: "low_fat_milk", label: t.low_fat_milk, val: 120, color: "text-blue-600" },
              { key: "whole_grains", label: t.whole_grains, val: 70, color: "text-amber-600" },
              { key: "meat", label: t.meat, val: 75, color: "text-rose-600" },
              { key: "pure_oil", label: t.pure_oil, val: 45, color: "text-yellow-600" },
            ].map(({ key, label, val, color }) => {
              const itemKey = key as keyof Servings;
              return (
                <div key={key} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-700">{label}</span>
                    <span className={`text-[9px] font-mono font-bold ${color}`}>{val} c/s</span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <button
                      onClick={() => updateServings(itemKey, profile.baseline_servings[itemKey] - 0.5)}
                      className="w-7 h-7 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-mono text-sm transition-colors shadow-xs cursor-pointer"
                      id={`dec-${key}`}
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-slate-800">
                      {profile.baseline_servings[itemKey]}
                    </span>
                    <button
                      onClick={() => updateServings(itemKey, profile.baseline_servings[itemKey] + 0.5)}
                      className="w-7 h-7 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-mono text-sm transition-colors shadow-xs cursor-pointer"
                      id={`inc-${key}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health Tags */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.health_tags_title}
          </label>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {profile.health_tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:bg-emerald-100 rounded-full p-0.5"
                  id={`remove-tag-${tag.replace(/\s+/g, '-')}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {profile.health_tags.length === 0 && (
              <span className="text-xs text-slate-400 font-sans italic">{t.no_tags}</span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.add_custom_tag}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(newTag);
                  setNewTag("");
                }
              }}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
              id="tag-input"
            />
            <button
              onClick={() => {
                addTag(newTag);
                setNewTag("");
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
              id="add-tag-btn"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3.5">
            <p className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">{t.common_presets}</p>
            <div className="flex flex-wrap gap-1">
              {PRESET_HEALTH_TAGS.filter((t) => !profile.health_tags.includes(t)).map((preset) => (
                <button
                  key={preset}
                  onClick={() => addTag(preset)}
                  className="bg-slate-50 hover:bg-slate-100 text-[10px] border border-slate-200 text-slate-600 rounded-lg px-2 py-1 transition-colors cursor-pointer"
                  id={`preset-${preset.replace(/\s+/g, '-')}`}
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
