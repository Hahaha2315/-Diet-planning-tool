/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReflectionReport } from "../types";
import { History, Calendar, Trash2 } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface HistorySectionProps {
  reports: ReflectionReport[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  lang: "en" | "zh";
}

export default function HistorySection({ reports, selectedId, onSelect, onDelete, lang }: HistorySectionProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <History className="w-5 h-5" id="history-icon" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-base text-slate-800 tracking-tight">{t.report_archives}</h3>
            <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.track_multi_day}</p>
          </div>
        </div>
        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg animate-fade-in">
          {reports.length} {t.logs_saved}
        </span>
      </div>

      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {reports.map((r) => {
          const isSelected = selectedId === r.id;
          return (
            <div
              key={r.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                isSelected 
                  ? "bg-emerald-50 border-emerald-500 text-slate-800 shadow-xs" 
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-100/50"
              }`}
              onClick={() => r.id && onSelect(r.id)}
              id={`history-item-${r.id}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Calendar className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold text-slate-800">
                    {r.date}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">
                    {lang === "zh" ? "模式" : "Mode"}: <span className="text-slate-600">{r.tomorrow_adaptive_plan?.cooking_mode || "Standard"}</span> • {lang === "zh" ? "卡路里" : "Cal"}: <span className="font-bold text-slate-600">{r.daily_balance_sheet?.actual_calories_estimated} kcal</span>
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (r.id) onDelete(r.id);
                }}
                className="p-1.5 bg-transparent text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title={t.delete_log_title}
                id={`delete-history-${r.id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

        {reports.length === 0 && (
          <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <p className="text-xs font-sans text-slate-400">{t.no_archives}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{t.no_archives_sub}</p>
          </div>
        )}
      </div>
    </div>
  );
}
