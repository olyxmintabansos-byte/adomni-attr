'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  GitCommit,
  ArrowRight,
  TrendingUp,
  Info,
  CheckCircle2,
  Sliders,
  Sparkles,
  PieChart
} from 'lucide-react';
import { useAttribution } from '@/context/AttributionContext';
import { AdChannel, AttributionModelType } from '@/types/attribution';

export default function AttributionModelingLabPage() {
  const { channels, activeModel, setActiveModel } = useAttribution();

  const models: { type: AttributionModelType; label: string; desc: string }[] = [
    {
      type: 'MARKOV_DATA_DRIVEN',
      label: 'Markov Chain (Removal Effect)',
      desc: 'Calculates the probabilistic removal effect of removing a channel from historical pathways. Most accurate for multi-touch omnichannel brands.',
    },
    {
      type: 'FIRST_TOUCH',
      label: 'First-Touch Attribution',
      desc: 'Gives 100% credit to the very first top-of-funnel impression or click. Biased heavily toward high-reach discovery channels (Meta, TikTok).',
    },
    {
      type: 'LAST_TOUCH',
      label: 'Last-Touch Attribution (Default GA4)',
      desc: 'Gives 100% credit to the final converting click. Ignores all brand awareness and severely overvalues Brand Search and Retargeting.',
    },
    {
      type: 'TIME_DECAY',
      label: 'Time-Decay Exponential',
      desc: 'Credits touchpoints closest to conversion exponentially more than earlier interactions. Good for short sales cycle D2C.',
    },
    {
      type: 'LINEAR',
      label: 'Linear Even Split',
      desc: 'Distributes conversion credit equally across every touchpoint regardless of position.',
    },
  ];

  const channelKeys: AdChannel[] = ['META_ADS', 'GOOGLE_SEARCH', 'TIKTOK_ADS', 'LINKEDIN_ADS', 'YOUTUBE_VIDEO'];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#0d0d12] px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>ALGORITHMIC LAB & REMOVAL EFFECTS SIMULATOR</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              ATTRIBUTION <span className="text-indigo-400">MODELING LAB</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Compare First-Touch, Last-Touch, and Markov Chain models side-by-side to expose ad channel cannibalization.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              href="/"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg cursor-pointer"
            >
              <span>← OMNICHANNEL COCKPIT</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 font-mono">
        {/* Model Switcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {models.map((m) => {
            const isSelected = activeModel === m.type;
            return (
              <div
                key={m.type}
                onClick={() => setActiveModel(m.type)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-950/40'
                    : 'bg-[#121217] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <h3 className="text-xs font-bold text-white">{m.label}</h3>
                  <p className="text-[10px] text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-indigo-400 font-bold' : 'text-zinc-500'}>
                    {isSelected ? '● ACTIVE MODEL' : 'SELECT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Head-to-Head Model Discrepancy Table */}
        <div className="asym-grid-tile rounded-xl p-6">
          <div className="border-b border-zinc-800/80 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-emerald-400" />
                <span>CHANNEL WEIGHT DISCREPANCY (MARKOV VS LAST-TOUCH)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Notice how Last-Touch over-attributes Google Brand Search while starving Meta & TikTok discovery stages.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-500/40">
              OPTIMIZED AD REALLOCATION OPPORTUNITY: +18.4% ROAS LIFT
            </span>
          </div>

          <div className="space-y-6">
            {channelKeys.map((k) => {
              const ch = channels[k];
              const markov = ch.markovWeight;
              const lastTouch = ch.lastTouchWeight;
              const diff = markov - lastTouch;

              return (
                <div key={k} className="p-4 bg-black/40 rounded-lg border border-zinc-800/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.colorHex }} />
                      <span className="text-sm font-bold text-white">{ch.name}</span>
                    </div>
                    <div className="text-xs font-bold">
                      {diff > 0 ? (
                        <span className="text-emerald-400">+{diff}% UNDERVALUED BY LAST-TOUCH</span>
                      ) : diff < 0 ? (
                        <span className="text-rose-400">{diff}% OVER-CREDITED BY LAST-TOUCH</span>
                      ) : (
                        <span className="text-zinc-500">EQUAL VALUATION</span>
                      )}
                    </div>
                  </div>

                  {/* Dual Comparison Weight Bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <span>MARKOV DATA-DRIVEN WEIGHT:</span>
                        <strong className="text-indigo-400">{markov}%</strong>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all"
                          style={{ width: `${markov * 2}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <span>LAST-TOUCH ATTRIBUTION WEIGHT:</span>
                        <strong className="text-zinc-300">{lastTouch}%</strong>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-500 rounded-full transition-all"
                          style={{ width: `${lastTouch * 2}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
