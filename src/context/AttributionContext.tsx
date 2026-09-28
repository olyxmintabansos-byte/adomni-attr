'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdChannel,
  AttributionModelType,
  ChannelMetrics,
  ConversionEvent,
  AttributionContextType
} from '@/types/attribution';

const INITIAL_CHANNELS: Record<AdChannel, ChannelMetrics> = {
  META_ADS: {
    channel: 'META_ADS',
    name: 'Meta Advantage+ (FB/IG)',
    spendUSD: 42500,
    revenueUSD: 178500,
    roas: 4.20,
    conversions: 1840,
    cpaUSD: 23.10,
    impressions: 2450000,
    clicks: 68400,
    firstTouchWeight: 42,
    lastTouchWeight: 28,
    markovWeight: 36,
    colorHex: '#0668e1',
  },
  GOOGLE_SEARCH: {
    channel: 'GOOGLE_SEARCH',
    name: 'Google Ads (PMax & Brand)',
    spendUSD: 36000,
    revenueUSD: 198000,
    roas: 5.50,
    conversions: 2150,
    cpaUSD: 16.74,
    impressions: 1120000,
    clicks: 84200,
    firstTouchWeight: 18,
    lastTouchWeight: 44,
    markovWeight: 32,
    colorHex: '#ea4335',
  },
  TIKTOK_ADS: {
    channel: 'TIKTOK_ADS',
    name: 'TikTok Spark Ads & Shop',
    spendUSD: 21000,
    revenueUSD: 75600,
    roas: 3.60,
    conversions: 940,
    cpaUSD: 22.34,
    impressions: 3890000,
    clicks: 92400,
    firstTouchWeight: 26,
    lastTouchWeight: 12,
    markovWeight: 18,
    colorHex: '#fe2c55',
  },
  LINKEDIN_ADS: {
    channel: 'LINKEDIN_ADS',
    name: 'LinkedIn Sponsored InMail',
    spendUSD: 14500,
    revenueUSD: 49300,
    roas: 3.40,
    conversions: 310,
    cpaUSD: 46.77,
    impressions: 480000,
    clicks: 14200,
    firstTouchWeight: 8,
    lastTouchWeight: 9,
    markovWeight: 9,
    colorHex: '#0a66c2',
  },
  YOUTUBE_VIDEO: {
    channel: 'YOUTUBE_VIDEO',
    name: 'YouTube In-Stream Action',
    spendUSD: 12000,
    revenueUSD: 40800,
    roas: 3.40,
    conversions: 420,
    cpaUSD: 28.57,
    impressions: 1980000,
    clicks: 31800,
    firstTouchWeight: 6,
    lastTouchWeight: 7,
    markovWeight: 5,
    colorHex: '#ff0000',
  },
};

const INITIAL_CONVERSIONS: ConversionEvent[] = [
  { id: 'c-1', timestamp: '11:18:42', orderId: '#ORD-98214', orderValueUSD: 248.50, customerJourney: ['META_ADS', 'TIKTOK_ADS', 'GOOGLE_SEARCH'], attributedChannel: 'GOOGLE_SEARCH', location: 'San Francisco, US' },
  { id: 'c-2', timestamp: '11:17:15', orderId: '#ORD-98213', orderValueUSD: 89.00, customerJourney: ['TIKTOK_ADS', 'META_ADS'], attributedChannel: 'META_ADS', location: 'London, UK' },
  { id: 'c-3', timestamp: '11:15:30', orderId: '#ORD-98212', orderValueUSD: 520.00, customerJourney: ['LINKEDIN_ADS', 'GOOGLE_SEARCH', 'GOOGLE_SEARCH'], attributedChannel: 'GOOGLE_SEARCH', location: 'Singapore' },
  { id: 'c-4', timestamp: '11:12:08', orderId: '#ORD-98211', orderValueUSD: 145.20, customerJourney: ['META_ADS'], attributedChannel: 'META_ADS', location: 'Sydney, AU' },
  { id: 'c-5', timestamp: '11:09:55', orderId: '#ORD-98210', orderValueUSD: 310.00, customerJourney: ['YOUTUBE_VIDEO', 'META_ADS', 'GOOGLE_SEARCH'], attributedChannel: 'GOOGLE_SEARCH', location: 'Tokyo, JP' },
];

const LOCAL_STORAGE_KEY = 'adomni_attribution_state_v1';

const AttributionContext = createContext<AttributionContextType | undefined>(undefined);

export function AttributionProvider({ children }: { children: React.ReactNode }) {
  const [channels, setChannels] = useState<Record<AdChannel, ChannelMetrics>>(INITIAL_CHANNELS);
  const [activeModel, setActiveModel] = useState<AttributionModelType>('MARKOV_DATA_DRIVEN');
  const [recentConversions, setRecentConversions] = useState<ConversionEvent[]>(INITIAL_CONVERSIONS);

  // Load persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.channels) setChannels(parsed.channels);
        if (parsed.activeModel) setActiveModel(parsed.activeModel);
      }
    } catch {}
  }, []);

  // Save persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ channels, activeModel }));
    } catch {}
  }, [channels, activeModel]);

  // Real-time conversion simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const channelKeys: AdChannel[] = ['META_ADS', 'GOOGLE_SEARCH', 'TIKTOK_ADS', 'LINKEDIN_ADS', 'YOUTUBE_VIDEO'];
      const randomChannel = channelKeys[Math.floor(Math.random() * channelKeys.length)];
      const randomVal = parseFloat((45 + Math.random() * 350).toFixed(2));
      const newEvt: ConversionEvent = {
        id: `c-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        orderId: `#ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        orderValueUSD: randomVal,
        customerJourney: [
          channelKeys[Math.floor(Math.random() * channelKeys.length)],
          randomChannel,
        ],
        attributedChannel: randomChannel,
        location: ['New York, US', 'Berlin, DE', 'Toronto, CA', 'Paris, FR', 'Melbourne, AU'][
          Math.floor(Math.random() * 5)
        ],
      };

      setRecentConversions((prev) => [newEvt, ...prev.slice(0, 14)]);
      setChannels((prev) => {
        const cur = prev[randomChannel];
        const newRev = cur.revenueUSD + randomVal;
        const newConv = cur.conversions + 1;
        return {
          ...prev,
          [randomChannel]: {
            ...cur,
            revenueUSD: newRev,
            conversions: newConv,
            roas: parseFloat((newRev / cur.spendUSD).toFixed(2)),
          },
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const reallocateBudget = (channel: AdChannel, deltaSpend: number) => {
    setChannels((prev) => {
      const cur = prev[channel];
      const newSpend = Math.max(1000, cur.spendUSD + deltaSpend);
      return {
        ...prev,
        [channel]: {
          ...cur,
          spendUSD: newSpend,
          roas: parseFloat((cur.revenueUSD / newSpend).toFixed(2)),
        },
      };
    });
  };

  const totalSpendUSD = Object.values(channels).reduce((s, c) => s + c.spendUSD, 0);
  const totalRevenueUSD = Object.values(channels).reduce((s, c) => s + c.revenueUSD, 0);
  const blendedROAS = parseFloat((totalRevenueUSD / totalSpendUSD).toFixed(2));
  const merRatio = parseFloat((totalRevenueUSD / totalSpendUSD).toFixed(2));

  return (
    <AttributionContext.Provider
      value={{
        channels,
        activeModel,
        setActiveModel,
        recentConversions,
        totalSpendUSD,
        totalRevenueUSD,
        blendedROAS,
        merRatio,
        reallocateBudget,
      }}
    >
      {children}
    </AttributionContext.Provider>
  );
}

export function useAttribution() {
  const context = useContext(AttributionContext);
  if (!context) throw new Error('useAttribution must be used within an AttributionProvider');
  return context;
}
