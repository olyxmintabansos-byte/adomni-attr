'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  Layers,
  ArrowDownRight,
  Filter,
  DollarSign,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Sliders,
  TrendingUp,
  PieChart,
  ArrowRight
} from 'lucide-react';
import { useAttribution } from '@/context/AttributionContext';
import { AdChannel } from '@/types/attribution';

interface FunnelStage {
  id: string;
  name: string;
  volume: number;
  conversionRate: number;
  dropOffRate: number;
  costPerEventUSD: number;
  lostRevenueUSD: number;
}

const BASE_STAGES: FunnelStage[] = [
  { id: 'imp', name: '01 // AD IMPRESSIONS', volume: 10920000, conversionRate: 100, dropOffRate: 0, costPerEventUSD: 0.011, lostRevenueUSD: 0 },
  { id: 'clk', name: '02 // QUALIFIED AD CLICKS', volume: 384000, conversionRate: 3.51, dropOffRate: 96.49, costPerEventUSD: 0.33, lostRevenueUSD: 145000 },
  { id: 'vst', name: '03 // LANDING PAGE VISITS', volume: 311040, conversionRate: 81.0, dropOffRate: 19.0, costPerEventUSD: 0.40, lostRevenueUSD: 68000 },
  { id: 'atc', name: '04 // ADD-TO-CART (ATC)', volume: 41680, conversionRate: 13.4, dropOffRate: 86.6, costPerEventUSD: 3.07, lostRevenueUSD: 285000 },
  { id: 'chk', name: '05 // INITIATED CHECKOUT', volume: 18420, conversionRate: 44.2, dropOffRate: 55.8, costPerEventUSD: 6.95, lostRevenueUSD: 192000 },
  { id: 'pur', name: '06 // COMPLETED PURCHASES', volume: 6720, conversionRate: 36.5, dropOffRate: 63.5, costPerEventUSD: 18.90, lostRevenueUSD: 0 },
];

export default function AsymmetricFunnelPage() {
  const { channels, totalRevenueUSD, blendedROAS } = useAttribution();
  const [selectedChannel, setSelectedChannel] = useState<string>('ALL');
  const [checkoutOptimizationLift, setCheckoutOptimizationLift] = useState<number>(5);

  const recoveredPurchases = Math.round(18420 * (checkoutOptimizationLift / 100));
  const recoveredRevenueUSD = Math.round(recoveredPurchases * 82.5);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 font-mono">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#0d0d12] px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-indigo-400 mb-1">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>CONVERSION LEAKAGE & TOUCHPOINT DYNAMICS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              ASYMMETRIC <span className="text-indigo-400">DROP-OFF FUNNEL</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Identify marketing budget hemorrhage between first ad view and final Shopify/Stripe settlement.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/cohorts/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase rounded-lg shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <span>COHORT LTV & CREATIVE FATIGUE →</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Top Funnel Metrics KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="asym-grid-tile rounded-xl p-5 border-l-4 border-l-indigo-500">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">FULL-FUNNEL CONVERSION</span>
            <strong className="text-2xl font-extrabold text-white block mt-1">0.061%</strong>
            <span className="text-xs text-zinc-400">From 10.9M impressions</span>
          </div>

          <div className="asym-grid-tile rounded-xl p-5 border-l-4 border-l-emerald-500">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">CLICK-TO-PURCHASE</span>
            <strong className="text-2xl font-extrabold text-emerald-400 block mt-1">1.75%</strong>
            <span className="text-xs text-zinc-400">6,720 / 384,000 clicks</span>
          </div>

          <div className="asym-grid-tile rounded-xl p-5 border-l-4 border-l-rose-500">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">TOTAL LEAKED VALUE</span>
            <strong className="text-2xl font-extrabold text-rose-400 block mt-1">$690,000</strong>
            <span className="text-xs text-zinc-400">High friction at ATC stage</span>
          </div>

          <div className="asym-grid-tile rounded-xl p-5 border-l-4 border-l-amber-500">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">BLENDED BLAC/CPA</span>
            <strong className="text-2xl font-extrabold text-amber-400 block mt-1">$18.90</strong>
            <span className="text-xs text-zinc-400">Target CPA: &lt; $25.00</span>
          </div>
        </div>

        {/* 6-Stage Asymmetrical Funnel Visualization */}
        <div className="asym-grid-tile rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                STAGE-BY-STAGE PROGRESSION & ATTRITION ARCHITECTURE
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Volumetric narrowing across marketing, site UX, and checkout gateways.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">CHANNEL:</span>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="bg-black border border-zinc-700 rounded text-xs px-2.5 py-1 text-white"
              >
                <option value="ALL">All Omnichannel Unified</option>
                <option value="META">Meta Ads Advantage+</option>
                <option value="GOOGLE">Google Search / PMax</option>
                <option value="TIKTOK">TikTok Spark Ads</option>
                <option value="LINKEDIN">LinkedIn B2B InMail</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {BASE_STAGES.map((st, idx) => {
              const widthPct = Math.max(8, Math.round((st.volume / BASE_STAGES[0].volume) * 100));

              return (
                <div key={st.id} className="p-4 bg-black/40 rounded-lg border border-zinc-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{st.name}</span>
                      <span className="text-[10px] text-zinc-400">
                        (${st.costPerEventUSD} / unit)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-zinc-400">
                        VOLUME: <strong className="text-white">{st.volume.toLocaleString()}</strong>
                      </span>
                      {st.dropOffRate > 0 && (
                        <span className="text-rose-400 font-bold">
                          -{st.dropOffRate}% DROP-OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Asymmetrical Progress Bar */}
                  <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden flex items-center">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        idx === 0
                          ? 'bg-zinc-500'
                          : idx === 1
                          ? 'bg-indigo-500'
                          : idx === 2
                          ? 'bg-blue-500'
                          : idx === 3
                          ? 'bg-amber-500'
                          : idx === 4
                          ? 'bg-purple-500'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.max(2, Math.pow(widthPct / 100, 0.4) * 100)}%` }}
                    />
                  </div>

                  {st.lostRevenueUSD > 0 && (
                    <div className="mt-2 flex justify-between text-[10px] text-zinc-500">
                      <span>STEP FRICTION FACTOR</span>
                      <span className="text-rose-400 font-bold">
                        LEAKAGE IMPACT: ~${(st.lostRevenueUSD / 1000).toFixed(0)}k OPEX WASTE
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive "Plug-the-Leak" Recovery Simulator */}
        <div className="asym-grid-tile rounded-xl p-6 bg-gradient-to-r from-[#12121c] to-[#0c0c14] border-l-4 border-l-emerald-400">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHECKOUT RECOVERY REVENUE SIMULATOR</span>
              </div>
              <h3 className="text-xl font-bold text-white">PLUG CHECKOUT ABANDONMENT LEAK</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Simulate net revenue lift if checkout step friction is reduced via 1-click Shop Pay / Apple Pay.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-500 uppercase block">PROJECTED REVENUE RECOVERY</span>
              <strong className="text-2xl font-extrabold text-emerald-400 block mt-0.5">
                +${recoveredRevenueUSD.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                <span>CHECKOUT CONVERSION LIFT SIMULATION:</span>
                <strong className="text-emerald-400 font-bold">+{checkoutOptimizationLift}% LIFT</strong>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={checkoutOptimizationLift}
                onChange={(e) => setCheckoutOptimizationLift(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-black/40 p-3 rounded-lg border border-zinc-800">
              <div>
                <span className="text-zinc-500 block">RECOVERED ORDERS:</span>
                <strong className="text-white">+{recoveredPurchases.toLocaleString()} Orders</strong>
              </div>
              <div>
                <span className="text-zinc-500 block">NEW BLENDED ROAS:</span>
                <strong className="text-emerald-400">{(blendedROAS + checkoutOptimizationLift * 0.08).toFixed(2)}x ROAS</strong>
              </div>
              <div>
                <span className="text-zinc-500 block">IMPLEMENTATION:</span>
                <strong className="text-indigo-400">Headless 1-Click Checkout</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
