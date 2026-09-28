'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Layers,
  PieChart,
  GitCommit,
  Activity,
  Flame,
  Zap,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useAttribution } from '@/context/AttributionContext';

export function Navbar() {
  const pathname = usePathname();
  const { blendedROAS, totalRevenueUSD, activeModel, setActiveModel } = useAttribution();

  const navLinks = [
    { href: '/', label: 'OMNICHANNEL COCKPIT', sub: 'PERFORMANCE ATTRIBUTION' },
    { href: '/models/', label: 'ATTRIBUTION LAB', sub: 'MARKOV VS LAST-TOUCH' },
    { href: '/funnel/', label: 'ASYMMETRIC FUNNEL', sub: 'JOURNEY DROP-OFF' },
    { href: '/cohorts/', label: 'COHORT LTV', sub: 'CREATIVE FATIGUE' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800">
      {/* Top Asymmetric Ticker */}
      <div className="bg-[#121217] border-b border-zinc-800/80 px-4 py-1 text-xs flex flex-wrap items-center justify-between text-zinc-400 font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>ATTRIBUTION ENGINE LIVE</span>
          </div>
          <span className="hidden sm:inline-block text-zinc-700">|</span>
          <span className="hidden sm:inline-block text-[11px]">
            TOTAL REVENUE TRACKED: <strong className="text-white">${totalRevenueUSD.toLocaleString()}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
            <span className="text-zinc-500">BLENDED ROAS:</span>
            <span className="font-extrabold text-emerald-400">{blendedROAS}x</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
            <span className="text-zinc-500">MODEL:</span>
            <span className="font-bold text-indigo-400">{activeModel.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-all">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                AD<span className="text-indigo-400">OMNI</span>
                <span className="text-[10px] tracking-wider px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded">
                  TITAN #40
                </span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                ASYMMETRICAL ATTRIBUTION ENGINE
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 font-mono">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col px-3.5 py-1.5 rounded-lg transition-all border ${
                    isActive
                      ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/50 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border-transparent'
                  }`}
                >
                  <span className="text-xs font-bold tracking-wider">{item.label}</span>
                  <span className="text-[9px] text-zinc-500 tracking-tight">{item.sub}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 font-mono">
            <select
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value as any)}
              className="bg-black border border-zinc-800 rounded-lg text-xs text-zinc-300 px-2.5 py-1.5 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              <option value="MARKOV_DATA_DRIVEN">Markov Data-Driven</option>
              <option value="FIRST_TOUCH">First Touch</option>
              <option value="LAST_TOUCH">Last Touch</option>
              <option value="TIME_DECAY">Time Decay</option>
              <option value="LINEAR">Linear Multi-Touch</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
