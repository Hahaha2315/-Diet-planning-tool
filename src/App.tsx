/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { UserProfile, DailyLog, ReflectionReport } from "./types";
import UserProfileSection from "./components/UserProfileSection";
import DailyLogSection from "./components/DailyLogSection";
import ReflectionReportSection from "./components/ReflectionReportSection";
import HistorySection from "./components/HistorySection";
import DeconstructionReference from "./components/DeconstructionReference";
import NutritionDashboard from "./components/NutritionDashboard";
import { 
  Sparkles, 
  Settings2, 
  Play, 
  AlertCircle,
  Clock,
  Moon
} from "lucide-react";
import { TRANSLATIONS } from "./translations";

const INITIAL_PROFILE: UserProfile = {
  calorie_target: 1800,
  health_tags: ["Insulin Resistant", "High Stress"],
  baseline_servings: {
    vegetables: 4,
    fruits: 3,
    low_fat_milk: 1,
    whole_grains: 5,
    meat: 4,
    pure_oil: 3
  }
};

const INITIAL_LOG: DailyLog = {
  execution_mode: "Loose",
  meals: [
    { meal_name: "Breakfast", food_logged: "Baguette 35g with sliced avocado", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
    { meal_name: "Lunch", food_logged: "Grilled chicken salad with oil-vinegar dressing", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
    { meal_name: "Dinner", food_logged: "Salmon with steamed broccoli and brown rice", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
    { meal_name: "Snack", food_logged: "Handful of mixed almonds", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" }
  ],
  end_of_day_state: {
    energy_level: 6,
    mood: "peaceful",
    body_signals: []
  }
};

export default function App() {
  const [lang, setLang] = useState<"en" | "zh">(() => {
    const saved = localStorage.getItem("life_os_diet_lang");
    return (saved === "zh" || saved === "en") ? saved : "en";
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("life_os_diet_profile");
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [log, setLog] = useState<DailyLog>(() => {
    const saved = localStorage.getItem("life_os_diet_log");
    return saved ? JSON.parse(saved) : INITIAL_LOG;
  });

  const [reports, setReports] = useState<ReflectionReport[]>(() => {
    const saved = localStorage.getItem("life_os_diet_reports");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeReportId, setActiveReportId] = useState<string | undefined>(() => {
    const saved = localStorage.getItem("life_os_active_report_id");
    return saved || undefined;
  });

  const [activeTab, setActiveTab] = useState<"log" | "profile">("log");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Time ticker
  const [currentTime, setCurrentTime] = useState("");

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-US", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("life_os_diet_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("life_os_diet_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("life_os_diet_log", JSON.stringify(log));
  }, [log]);

  useEffect(() => {
    localStorage.setItem("life_os_diet_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    if (activeReportId) {
      localStorage.setItem("life_os_active_report_id", activeReportId);
    } else {
      localStorage.removeItem("life_os_active_report_id");
    }
  }, [activeReportId]);

  // Loading indicator messages (English and Chinese versions)
  const LOADING_STEPS_EN = [
    "Ingesting health profile and food exchange servings...",
    "Scanning food logs for Loose Mode deconstruction rules...",
    "Detecting Bakery and premium Gelato meal modifiers...",
    "Enforcing Negative Boundary protection on muscle protein...",
    "Correlating pre-meal states and post-meal glucose stability...",
    "Applying cognitive loops: stabilizing insulin, calibrating cortisol...",
    "Assembling Life OS tomorrow adaptive prescription..."
  ];

  const LOADING_STEPS_ZH = [
    "正在摄入健康画像与每餐交换份计划...",
    "正在扫描食物日志以匹配松散模式下的拆解规则...",
    "正在检测烘焙点心与高端意式冰淇淋的膳食修正系数...",
    "正在执行针对肌肉蛋白的负向边界安全保护机制...",
    "正在关联分析餐前状态与餐后血糖稳定度...",
    "正在应用认知反馈回路：稳定胰岛素、校准皮质醇...",
    "正在组装 Life OS 明日自适应饮食处方计划..."
  ];

  const LOADING_STEPS = lang === "zh" ? LOADING_STEPS_ZH : LOADING_STEPS_EN;

  // Rotate loading steps
  useEffect(() => {
    if (!loading) return;
    setLoadingStep(LOADING_STEPS[0]);
    let idx = 1;
    const interval = setInterval(() => {
      setLoadingStep(LOADING_STEPS[idx % LOADING_STEPS.length]);
      idx++;
    }, 1800);
    return () => clearInterval(interval);
  }, [loading, lang]);

  const activeReport = reports.find((r) => r.id === activeReportId);

  // Diagnostic Presets Application
  const applyPreset = (presetName: string) => {
    setError(null);
    if (presetName === "blood_sugar") {
      setLog({
        execution_mode: "Loose",
        meals: [
          { meal_name: "Breakfast", food_logged: lang === "zh" ? "软面包 70g (2片白吐司) 涂草莓酱" : "Soft Bread 70g (2 slices of white toast) with strawberry jam", pre_meal_feel: "routine", post_meal_feel: "sluggish_somnolent" },
          { meal_name: "Lunch", food_logged: lang === "zh" ? "高端意式 Gelato 冰淇淋 100g (带甜筒)" : "Premium Gelato 100g in a sugar cone", pre_meal_feel: "routine", post_meal_feel: "sugar_craving" },
          { meal_name: "Dinner", food_logged: lang === "zh" ? "法棍面包 35g 涂巧克力酱" : "Baguette 35g with Nutella", pre_meal_feel: "routine", post_meal_feel: "sluggish_somnolent" },
          { meal_name: "Snack", food_logged: lang === "zh" ? "软质布里欧面包 35g 带甜面层" : "Soft Brioche 35g with sweet glaze", pre_meal_feel: "routine", post_meal_feel: "sugar_craving" }
        ],
        end_of_day_state: {
          energy_level: 3,
          mood: "low",
          body_signals: ["fatigue"]
        }
      });
      setActiveTab("log");
    } else if (presetName === "cortisol") {
      setLog({
        execution_mode: "Loose",
        meals: [
          { meal_name: "Breakfast", food_logged: lang === "zh" ? "仅饮用纯黑咖啡" : "Black coffee only", pre_meal_feel: "emotional_craving", post_meal_feel: "sugar_craving" },
          { meal_name: "Lunch", food_logged: lang === "zh" ? "极简黄瓜沙拉配少许柠檬汁" : "Small cucumber salad with splash of lemon", pre_meal_feel: "emotional_craving", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Dinner", food_logged: lang === "zh" ? "蔬菜素汤" : "Vegetable broth soup", pre_meal_feel: "emotional_craving", post_meal_feel: "sugar_craving" },
          { meal_name: "Snack", food_logged: lang === "zh" ? "单根西芹条" : "A single celery stick", pre_meal_feel: "emotional_craving", post_meal_feel: "sugar_craving" }
        ],
        end_of_day_state: {
          energy_level: 2,
          mood: "anxious",
          body_signals: ["fatigue", "poor_sleep"]
        }
      });
      // Aggressive calorie target to demonstrate gap
      setProfile({
        ...profile,
        calorie_target: 1900,
        health_tags: lang === "zh" ? ["高压力状态", "极限热量缺口目标"] : ["High Stress", "Aggressive Deficit Target"]
      });
      setActiveTab("log");
    } else if (presetName === "micronutrients") {
      setLog({
        execution_mode: "Loose",
        meals: [
          { meal_name: "Breakfast", food_logged: lang === "zh" ? "软面包 35g 配黄油" : "Soft Bread 35g and butter", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Lunch", food_logged: lang === "zh" ? "精制白米饭配小块牛排" : "White rice and steak slice", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Dinner", food_logged: lang === "zh" ? "炸鸡柳和炸薯条" : "Chicken strips and French fries", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Snack", food_logged: lang === "zh" ? "油炸薯片 50g" : "Potato chips 50g", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" }
        ],
        end_of_day_state: {
          energy_level: 5,
          mood: "peaceful",
          body_signals: ["muscle_cramps", "poor_sleep"]
        }
      });
      setActiveTab("log");
    } else if (presetName === "negative_boundary") {
      setLog({
        execution_mode: "Loose",
        meals: [
          { meal_name: "Breakfast", food_logged: lang === "zh" ? "起酥面包 (牛角包 70g)" : "Pastry (Croissant 70g)", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Lunch", food_logged: lang === "zh" ? "高端 Gelato 冰淇淋 150g" : "Premium Gelato 150g", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Dinner", food_logged: lang === "zh" ? "高端 Gelato 冰淇淋 100g 和红豆沙包 70g" : "Premium Gelato 100g and Red Bean Bun 70g", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" },
          { meal_name: "Snack", food_logged: lang === "zh" ? "软面包 (布里欧 70g)" : "Soft Brioche 70g", pre_meal_feel: "routine", post_meal_feel: "satisfied_energetic" }
        ],
        end_of_day_state: {
          energy_level: 4,
          mood: "irritable",
          body_signals: ["bloated"]
        }
      });
      setActiveTab("log");
    }
  };

  const handleGenerateReflection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/reflect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_profile: profile,
          daily_log: log,
          lang: lang
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || (lang === "zh" ? "无法生成反思报告，请确保服务器处于活跃状态。" : "Failed to generate reflection report. Ensure server is active."));
      }

      const reportJson = await response.json();
      
      const newReport: ReflectionReport = {
        ...reportJson,
        id: "rep_" + Date.now(),
        date: new Date().toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
      };

      setReports((prev) => [newReport, ...prev]);
      setActiveReportId(newReport.id);
    } catch (err: any) {
      console.error(err);
      setError(err.message || (lang === "zh" ? "发生未知错误。" : "An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    if (activeReportId === id) {
      setActiveReportId(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/10 selection:text-emerald-950">
      {/* Header Bar */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-700 animate-fade-in">
              <Sparkles className="w-5 h-5" id="logo-icon" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-base text-slate-800 tracking-tight flex items-center gap-2">
                {t.app_title} <span className="text-emerald-600">{t.app_subtitle}</span>
              </h1>
              <p className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t.session_id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(l => l === "en" ? "zh" : "en")}
              className="flex items-center gap-1.5 font-sans text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer active:scale-95"
              id="lang-toggle-btn"
            >
              🌐 {lang === "en" ? "简体中文" : "English Mode"}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.utc}: {currentTime || "..."}</span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>{t.agent_connected}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: PROFILE & LOG WORKSPACE (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="bg-slate-200/50 border border-slate-200 rounded-2xl p-1 flex gap-1.5">
              <button
                onClick={() => setActiveTab("log")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "log" 
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
                id="tab-log-btn"
              >
                {t.tab_log}
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "profile" 
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
                id="tab-profile-btn"
              >
                {t.tab_profile}
              </button>
            </div>

            {/* Configured Section View */}
            {activeTab === "profile" ? (
              <UserProfileSection profile={profile} onChange={setProfile} lang={lang} />
            ) : (
              <DailyLogSection log={log} onChange={setLog} onApplyPreset={applyPreset} lang={lang} />
            )}

            {/* Global Execution Trigger */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-start gap-3">
                <Settings2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-700">{t.analysis_dispatch}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                    {t.dispatch_sub}
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl p-3 flex gap-2 text-xs leading-relaxed animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <button
                onClick={handleGenerateReflection}
                disabled={loading}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  loading 
                    ? "bg-emerald-600/50 text-emerald-100/80 cursor-wait" 
                    : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-sm shadow-emerald-600/20"
                }`}
                id="generate-reflection-btn"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                {loading ? t.generating_btn : t.generate_reflection_btn}
              </button>
            </div>

            {/* Archive List */}
            <HistorySection 
              reports={reports} 
              selectedId={activeReportId} 
              onSelect={setActiveReportId} 
              onDelete={handleDeleteReport} 
              lang={lang}
            />

          </div>

          {/* RIGHT SIDE: REPORT VIEWER & REFERENCES (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Real-time Calories, Carbs, Protein, and Fat Dashboard */}
            <NutritionDashboard 
              profile={profile} 
              log={log} 
              onUpdateLog={setLog} 
              lang={lang} 
            />
            
            {loading ? (
              // Loading Workspace
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-6 shadow-sm flex flex-col items-center justify-center min-h-[500px]">
                
                <div className="relative flex items-center justify-center w-16 h-16">
                  {/* Rotating spinner */}
                  <div className="absolute w-12 h-12 border-2 border-slate-100 rounded-full"></div>
                  <div className="absolute w-12 h-12 border-t-2 border-emerald-600 rounded-full animate-spin"></div>
                  <Moon className="w-5 h-5 text-emerald-600 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-semibold text-slate-800">{t.reflecting_today}</h3>
                  <p className="text-xs text-slate-400 font-mono">{t.agent_thinking}</p>
                </div>

                {/* Micro Steps Slider */}
                <div className="max-w-xs bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
                  <p className="text-[11px] font-sans text-emerald-800 leading-relaxed text-center min-h-[34px] flex items-center justify-center font-medium animate-pulse">
                    "{loadingStep}"
                  </p>
                </div>

                <p className="text-[10px] text-slate-400 font-mono">{t.thinking_time}</p>
              </div>
            ) : activeReport ? (
              // Actual reflection report
              <ReflectionReportSection report={activeReport} lang={lang} />
            ) : (
              // Empty/Reference Workspace
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
                  
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                    <Sparkles className="w-6 h-6" id="empty-protocol-icon" />
                  </div>
                  
                  <div className="space-y-1 max-w-sm">
                    <h3 className="font-sans font-semibold text-slate-800 text-sm">{t.empty_title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.empty_sub}
                    </p>
                  </div>
                </div>

                <DeconstructionReference lang={lang} />
              </div>
            )}

            {/* Reference is always visible at bottom if a report is active */}
            {activeReport && <DeconstructionReference lang={lang} />}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-slate-400 text-[10px] font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Life OS Ecosystem • Digital Nutrition Agent v2.4.0</span>
          <span>© 2026 Behavioral Intelligence Systems. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}
