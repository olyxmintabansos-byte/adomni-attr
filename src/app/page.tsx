'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Zap,
  Globe,
  Activity,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useAttribution } from '@/context/AttributionContext';
import { AdChannel } from '@/types/attribution';

export default function OmnichannelCockpitPage() {
  const {
    channels,
    totalSpendUSD,
    totalRevenueUSD,
    blendedROAS,
    merRatio,
    recentConversions,
    activeModel,
    reallocateBudget
  } = useAttribution();

  const channelList: AdChannel[] = ['META_ADS', 'GOOGLE_SEARCH', 'TIKTOK_ADS', 'LINKEDIN_ADS', 'YOUTUBE_VIDEO'];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      {/* Asymmetric Hero Grid Banner */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-r from-[#0d0d12] via-[#12121a] to-[#09090b] px-4 py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Title & Asymmetric Macro Stats */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>MARKOV REMOVAL-EFFECT ATTRIBUTION ACTIVE</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              REAL-TIME <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">OMNICHANNEL</span> ROAS ATTRIBUTION
            </h1>

            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Eliminate platform reporting double-counting. Synthesize Meta, Google, TikTok, and LinkedIn ad touchpoints through unified algorithmic attribution.
            </p>
          </div>

          {/* Asymmetric Offset KPI Block */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="asym-grid-tile rounded-xl p-5 border-l-4 border-l-emerald-500">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">BLENDED ROAS</span>
              <div className="text-4xl font-extrabold text-white mt-1 tracking-tight flex items-baseline gap-1">
                {blendedROAS}<span className="text-emerald-400 text-2xl font-bold">x</span>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs Last Period
              </span>
            </div>

            <div className="asym-grid-tile rounded-xl p-5 border-l-4 border-l-indigo-500">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">MARKETING EFFICIENCY (MER)</span>
              <div className="text-4xl font-extrabold text-white mt-1 tracking-tight flex items-baseline gap-1">
                {merRatio}<span className="text-indigo-400 text-2xl font-bold">x</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono mt-1 block">
                Total Ad Spend: ${(totalSpendUSD / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Asymmetrical Channel Allocation Matrix */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">AD CHANNEL PERFORMANCE BREAKDOWN</h2>
              <p className="text-xs text-zinc-400 font-mono">Attributed under active model: {activeModel}</p>
            </div>
            <Link
              href="/models/"
              className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>COMPARE TO LAST-TOUCH MODEL</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {channelList.map((chKey) => {
              const ch = channels[chKey];
              const shareOfRevenue = Math.round((ch.revenueUSD / totalRevenueUSD) * 100);

              return (
                <div key={chKey} className="asym-grid-tile rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.colorHex }} />
                        <h3 className="text-sm font-bold text-white">{ch.name}</h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {shareOfRevenue}% REVENUE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-4 font-mono">
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/80">
                        <span className="text-[10px] text-zinc-500 uppercase block">SPEND</span>
                        <strong className="text-base text-white font-bold block mt-0.5">
                          ${ch.spendUSD.toLocaleString()}
                        </strong>
                      </div>
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/80">
                        <span className="text-[10px] text-zinc-500 uppercase block">ATTRIBUTED REVENUE</span>
                        <strong className="text-base text-emerald-400 font-bold block mt-0.5">
                          ${ch.revenueUSD.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono text-zinc-400">
                      <div>
                        <span>ROAS:</span>
                        <strong className="block text-white font-bold">{ch.roas}x</strong>
                      </div>
                      <div>
                        <span>CPA:</span>
                        <strong className="block text-white font-bold">${ch.cpaUSD}</strong>
                      </div>
                      <div>
                        <span>CONV:</span>
                        <strong className="block text-white font-bold">{ch.conversions}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Micro Reallocate Controls */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">BUDGET PACING:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => reallocateBudget(chKey, -2500)}
                        className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 cursor-pointer"
                      >
                        -$2.5k
                      </button>
                      <button
                        onClick={() => reallocateBudget(chKey, 2500)}
                        className="px-2 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 rounded border border-indigo-700 cursor-pointer"
                      >
                        +$2.5k
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Multi-Touch Conversion Ingestion Stream */}
        <div className="asym-grid-tile rounded-xl p-6 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  REAL-TIME MULTI-TOUCH JOURNEY STREAM
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Live customer purchase events resolved across all upstream marketing touchpoints.
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 bg-black px-2.5 py-1 rounded border border-zinc-800">
              SOCKET STATUS: 124 EVENTS/SEC INGESTION
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] text-zinc-500 uppercase border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">TIMESTAMP</th>
                  <th className="py-2.5 px-3">ORDER ID</th>
                  <th className="py-2.5 px-3">VALUE</th>
                  <th className="py-2.5 px-3">MULTI-TOUCH PATHWAY</th>
                  <th className="py-2.5 px-3">ALGORITHMIC ATTRIBUTION</th>
                  <th className="py-2.5 px-3">GEOGRAPHY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {recentConversions.map((conv) => (
                  <tr key={conv.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-3 text-zinc-400">{conv.timestamp}</td>
                    <td className="py-3 px-3 font-bold text-white">{conv.orderId}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">${conv.orderValueUSD.toFixed(2)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {conv.customerJourney.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300">
                              {step.replace('_', ' ')}
                            </span>
                            {idx < conv.customerJourney.length - 1 && (
                              <span className="text-zinc-600">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                        {conv.attributedChannel.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-400">{conv.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
