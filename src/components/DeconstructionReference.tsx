/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, AlertTriangle, BrainCircuit } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface DeconstructionReferenceProps {
  lang: "en" | "zh";
}

export default function DeconstructionReference({ lang }: DeconstructionReferenceProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm overflow-hidden relative">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
          <BookOpen className="w-5 h-5" id="ref-icon" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-base text-slate-800 tracking-tight">{t.ref_title}</h3>
          <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.ref_subtitle}</p>
        </div>
      </div>

      <div className="space-y-6 text-sm">
        {/* Deconstruction Rules */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            {t.ref_loose_decon}
          </h4>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 font-mono text-xs">
            <div>
              <p className="text-slate-800 font-bold border-b border-slate-200/60 pb-1 mb-1.5 uppercase tracking-wide text-[10px]">{t.ref_bakery_title}</p>
              <ul className="space-y-1 text-slate-600">
                <li><span className="text-emerald-700 font-semibold">{t.ref_bakery_hard}</span> {t.ref_bakery_hard_val}</li>
                <li><span className="text-emerald-700 font-semibold">{t.ref_bakery_soft}</span> {t.ref_bakery_soft_val}</li>
                <li><span className="text-emerald-700 font-semibold">{t.ref_bakery_pastry}</span> {t.ref_bakery_pastry_val}</li>
              </ul>
            </div>
            <div>
              <p className="text-slate-800 font-bold border-b border-slate-200/60 pb-1 mb-1.5 uppercase tracking-wide text-[10px]">{t.ref_ice_title}</p>
              <ul className="space-y-1 text-slate-600">
                <li><span className="text-emerald-700 font-semibold">{t.ref_ice_premium}</span> {t.ref_ice_premium_val}</li>
                <li><span className="text-emerald-700 font-semibold">{t.ref_ice_pops}</span> {t.ref_ice_pops_val}</li>
                <li><span className="text-emerald-700 font-semibold">{t.ref_ice_lowcal}</span> {t.ref_ice_lowcal_val}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Negative Boundary Rule */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            {t.ref_boundary_title}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed pl-6">
            {t.ref_boundary_desc}
          </p>
        </div>

        {/* Diagnostic Rules */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-emerald-600" />
            {t.ref_cognitive_title}
          </h4>
          <div className="space-y-3 pl-1">
            <div className="border-l-2 border-slate-200 pl-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide text-[10px]">{t.ref_rule_a}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                {t.ref_rule_a_desc}
              </p>
            </div>
            <div className="border-l-2 border-slate-200 pl-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide text-[10px]">{t.ref_rule_b}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                {t.ref_rule_b_desc}
              </p>
            </div>
            <div className="border-l-2 border-slate-200 pl-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide text-[10px]">{t.ref_rule_c}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                {t.ref_rule_c_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
