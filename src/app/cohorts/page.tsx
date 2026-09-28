'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Flame,
  TrendingUp,
  Sparkles,
  Download,
  RefreshCw,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Zap,
  BarChart3,
  Trash2,
  Plus
} from 'lucide-react';
import { useAttribution } from '@/context/AttributionContext';

interface CreativeItem {
  id: string;
  name: string;
  format: 'REEL_9X16' | 'CAROUSEL' | 'STATIC_HOOK' | 'FOUNDER_VIDEO';
  channel: string;
  spendUSD: number;
  roas: number;
  ctrPct: number;
  daysActive: number;
  frequency: number;
  status: 'SCALING' | 'REFRESH_HOOK' | 'FATIGUED_KILL';
}

const INITIAL_CREATIVES: CreativeItem[] = [
  { id: 'cr-1', name: 'UGC Hook: The 30-Second Solution', format: 'REEL_9X16', channel: 'TikTok Ads', spendUSD: 14200, roas: 4.80, ctrPct: 4.2, daysActive: 12, frequency: 1.8, status: 'SCALING' },
  { id: 'cr-2', name: 'Founder Story: Why We Built This', format: 'CAROUSEL', channel: 'Meta Ads', spendUSD: 18500, roas: 3.90, ctrPct: 3.1, daysActive: 28, frequency: 3.4, status: 'REFRESH_HOOK' },
  { id: 'cr-3', name: 'Direct Offer: 20% Off Holiday Bundle', format: 'STATIC_HOOK', channel: 'Meta Ads', spendUSD: 9800, roas: 2.10, ctrPct: 1.4, daysActive: 45, frequency: 5.2, status: 'FATIGUED_KILL' },
  { id: 'cr-4', name: 'Competitor Comparison Infographic', format: 'STATIC_HOOK', channel: 'Google PMax', spendUSD: 12100, roas: 5.10, ctrPct: 4.8, daysActive: 8, frequency: 1.4, status: 'SCALING' },
  { id: 'cr-5', name: 'Executive Whitepaper Case Study', format: 'FOUNDER_VIDEO', channel: 'LinkedIn', spendUSD: 6400, roas: 3.40, ctrPct: 2.2, daysActive: 35, frequency: 2.9, status: 'REFRESH_HOOK' },
];

const COHORT_DATA = [
  { cohort: 'Jan 2026', cac: '$24.50', m0: '1.00x', m1: '1.18x', m2: '1.34x', m3: '1.52x', m6: '1.92x', m12: '2.45x' },
  { cohort: 'Feb 2026', cac: '$22.80', m0: '1.00x', m1: '1.22x', m2: '1.40x', m3: '1.61x', m6: '2.05x', m12: '-' },
  { cohort: 'Mar 2026', cac: '$23.10', m0: '1.00x', m1: '1.19x', m2: '1.38x', m3: '1.58x', m6: '2.01x', m12: '-' },
  { cohort: 'Apr 2026', cac: '$21.40', m0: '1.00x', m1: '1.25x', m2: '1.46x', m3: '1.68x', m6: '-', m12: '-' },
  { cohort: 'May 2026', cac: '$20.90', m0: '1.00x', m1: '1.28x', m2: '1.50x', m3: '-', m6: '-', m12: '-' },
  { cohort: 'Jun 2026', cac: '$19.80', m0: '1.00x', m1: '1.31x', m2: '-', m3: '-', m6: '-', m12: '-' },
];

export default function CohortLTVPage() {
  const [creatives, setCreatives] = useState<CreativeItem[]>(INITIAL_CREATIVES);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleCreativeStatus = (id: string) => {
    setCreatives((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus =
          c.status === 'SCALING'
            ? 'REFRESH_HOOK'
            : c.status === 'REFRESH_HOOK'
            ? 'FATIGUED_KILL'
            : 'SCALING';
        return { ...c, status: nextStatus };
      })
    );
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify({ creatives, cohorts: COHORT_DATA }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adomni_cohort_creative_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('EXPORTED ANALYTICS REPORT TO JSON');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 font-mono">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#0d0d12] px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 mb-1">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>RETENTION DYNAMICS & PAYBACK HORIZONS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              COHORT LTV & <span className="text-emerald-400">CREATIVE FATIGUE</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track customer repeat purchase expansion curves and eliminate creative burnout before ROAS collapses.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={exportJSON}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>EXPORT REPORT</span>
            </button>
            <Link
              href="/funnel/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase rounded-lg cursor-pointer"
            >
              <span>← ASYMMETRIC FUNNEL</span>
            </Link>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="bg-emerald-950/80 border-b border-emerald-500 text-emerald-300 text-xs py-2 px-4 text-center sticky top-16 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* 12-Month Cohort LTV Payback Heatmap */}
        <div className="asym-grid-tile rounded-xl p-6">
          <div className="border-b border-zinc-800 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>CUSTOMER COHORT CUMULATIVE LTV / CAC MULTIPLIER</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Shows net return on initial ad spend (CAC) as customers repurchase over 12 months.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-500/40">
              AVERAGE MONTH-6 PAYBACK: 2.01x BLENDED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-zinc-500 uppercase border-b border-zinc-800 bg-black/40">
                <tr>
                  <th className="py-2.5 px-3">COHORT</th>
                  <th className="py-2.5 px-3">INITIAL CAC</th>
                  <th className="py-2.5 px-3">MONTH 0</th>
                  <th className="py-2.5 px-3">MONTH 1</th>
                  <th className="py-2.5 px-3">MONTH 2</th>
                  <th className="py-2.5 px-3">MONTH 3</th>
                  <th className="py-2.5 px-3">MONTH 6</th>
                  <th className="py-2.5 px-3">MONTH 12</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {COHORT_DATA.map((row) => (
                  <tr key={row.cohort} className="hover:bg-zinc-900/30">
                    <td className="py-3 px-3 font-bold text-white">{row.cohort}</td>
                    <td className="py-3 px-3 text-zinc-400">{row.cac}</td>
                    <td className="py-3 px-3 font-bold text-zinc-400">{row.m0}</td>
                    <td className="py-3 px-3 font-bold text-indigo-400">{row.m1}</td>
                    <td className="py-3 px-3 font-bold text-blue-400">{row.m2}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">{row.m3}</td>
                    <td className="py-3 px-3 font-bold text-emerald-300">{row.m6}</td>
                    <td className="py-3 px-3 font-bold text-[#d4ff00]">{row.m12}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ad Creative Fatigue & Decay Monitor */}
        <div className="asym-grid-tile rounded-xl p-6">
          <div className="border-b border-zinc-800 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>AD CREATIVE FATIGUE & FREQUENCY DECAY RADAR</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Automatically detect frequency saturation (Frequency &gt; 3.5) and CTR degradation.
              </p>
            </div>
            <span className="text-xs text-zinc-500">
              {creatives.length} ACTIVE CREATIVES MONITORED
            </span>
          </div>

          <div className="space-y-4">
            {creatives.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-black/40 rounded-lg border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{c.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {c.format.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-zinc-500">({c.channel})</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
                    <span>SPEND: <strong className="text-white">${c.spendUSD.toLocaleString()}</strong></span>
                    <span>ROAS: <strong className="text-emerald-400">{c.roas}x</strong></span>
                    <span>CTR: <strong className="text-white">{c.ctrPct}%</strong></span>
                    <span>FREQUENCY: <strong className={c.frequency > 3.0 ? 'text-rose-400' : 'text-zinc-300'}>{c.frequency}x</strong></span>
                    <span>ACTIVE: <strong className="text-zinc-300">{c.daysActive} days</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase ${
                      c.status === 'SCALING'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                        : c.status === 'REFRESH_HOOK'
                        ? 'bg-amber-950 text-amber-400 border-amber-500/40'
                        : 'bg-rose-950 text-rose-400 border-rose-500/40'
                    }`}
                  >
                    {c.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => toggleCreativeStatus(c.id)}
                    className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 rounded border border-zinc-700 cursor-pointer"
                  >
                    CYCLE ACTION
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
