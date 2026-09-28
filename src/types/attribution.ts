export type AdChannel = 'META_ADS' | 'GOOGLE_SEARCH' | 'TIKTOK_ADS' | 'LINKEDIN_ADS' | 'YOUTUBE_VIDEO';
export type AttributionModelType = 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR' | 'TIME_DECAY' | 'MARKOV_DATA_DRIVEN';

export interface ChannelMetrics {
  channel: AdChannel;
  name: string;
  spendUSD: number;
  revenueUSD: number;
  roas: number;
  conversions: number;
  cpaUSD: number;
  impressions: number;
  clicks: number;
  firstTouchWeight: number;
  lastTouchWeight: number;
  markovWeight: number;
  colorHex: string;
}

export interface ConversionEvent {
  id: string;
  timestamp: string;
  orderId: string;
  orderValueUSD: number;
  customerJourney: AdChannel[];
  attributedChannel: AdChannel;
  location: string;
}

export interface AttributionContextType {
  channels: Record<AdChannel, ChannelMetrics>;
  activeModel: AttributionModelType;
  setActiveModel: (model: AttributionModelType) => void;
  recentConversions: ConversionEvent[];
  totalSpendUSD: number;
  totalRevenueUSD: number;
  blendedROAS: number;
  merRatio: number;
  reallocateBudget: (channel: AdChannel, deltaSpend: number) => void;
}
