import { Activity, TrendingUp, TrendingDown, AlertTriangle, Shield, Users, MessageSquare, Radio } from "lucide-react";

export interface SentimentRegion {
  id: string;
  name: string;
  sentiment: 'stable' | 'optimistic' | 'dissatisfaction' | 'frustration' | 'critical';
  stressIndex: number;
  population: string;
  coordinates: { x: number; y: number };
}

export interface TrustMetric {
  institution: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface Grievance {
  category: string;
  description: string;
  changePercent: number;
  trend: 'up' | 'down';
  icon: typeof Activity;
}

export interface UnrestAlert {
  id: string;
  location: string;
  probability: number;
  confidence: 'low' | 'medium' | 'high';
  drivers: string[];
  timestamp: string;
}

export interface PolicySentiment {
  policy: string;
  support: number;
  neutral: number;
  negative: number;
  hotspots: string[];
}

export interface PolarizationData {
  month: string;
  index: number;
}

export interface NarrativeData {
  narrative: string;
  spread: number;
  velocity: 'slow' | 'moderate' | 'fast' | 'viral';
  communities: number;
  sentiment: 'neutral' | 'negative' | 'positive';
}

// Mock data
export const regions: SentimentRegion[] = [
  { id: 'nairobi', name: 'Nairobi', sentiment: 'frustration', stressIndex: 0.72, population: '4.4M', coordinates: { x: 55, y: 65 } },
  { id: 'mombasa', name: 'Mombasa', sentiment: 'dissatisfaction', stressIndex: 0.58, population: '1.2M', coordinates: { x: 75, y: 85 } },
  { id: 'kisumu', name: 'Kisumu', sentiment: 'dissatisfaction', stressIndex: 0.55, population: '610K', coordinates: { x: 25, y: 55 } },
  { id: 'nakuru', name: 'Nakuru', sentiment: 'stable', stressIndex: 0.49, population: '570K', coordinates: { x: 40, y: 50 } },
  { id: 'eldoret', name: 'Eldoret', sentiment: 'optimistic', stressIndex: 0.38, population: '475K', coordinates: { x: 30, y: 35 } },
  { id: 'turkana', name: 'Turkana', sentiment: 'frustration', stressIndex: 0.63, population: '926K', coordinates: { x: 25, y: 15 } },
  { id: 'garissa', name: 'Garissa', sentiment: 'dissatisfaction', stressIndex: 0.61, population: '841K', coordinates: { x: 80, y: 45 } },
  { id: 'machakos', name: 'Machakos', sentiment: 'stable', stressIndex: 0.44, population: '1.4M', coordinates: { x: 58, y: 72 } },
];

export const trustMetrics: TrustMetric[] = [
  { institution: 'Healthcare System', percentage: 68, trend: 'down', change: -3 },
  { institution: 'County Government', percentage: 52, trend: 'down', change: -7 },
  { institution: 'Police', percentage: 34, trend: 'down', change: -12 },
  { institution: 'Judiciary', percentage: 61, trend: 'stable', change: 1 },
  { institution: 'National Government', percentage: 48, trend: 'down', change: -5 },
  { institution: 'Electoral Commission', percentage: 41, trend: 'down', change: -9 },
];

export const grievances: Grievance[] = [
  { category: 'Food Prices', description: 'Rising cost of basic commodities', changePercent: 31, trend: 'up', icon: TrendingUp },
  { category: 'Water Access', description: 'Outages and quality complaints', changePercent: 18, trend: 'up', icon: TrendingUp },
  { category: 'Corruption', description: 'Government misuse of funds', changePercent: 24, trend: 'up', icon: AlertTriangle },
  { category: 'Police Misconduct', description: 'Brutality and extortion reports', changePercent: 9, trend: 'up', icon: Shield },
  { category: 'Unemployment', description: 'Job scarcity concerns', changePercent: 15, trend: 'up', icon: Users },
  { category: 'Healthcare', description: 'Hospital overcrowding', changePercent: 7, trend: 'down', icon: Activity },
];

export const unrestAlerts: UnrestAlert[] = [
  {
    id: '1',
    location: 'Eastleigh District, Nairobi',
    probability: 64,
    confidence: 'medium',
    drivers: ['Rising economic grievance', 'Political rhetoric spike', 'Protest coordination language detected'],
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    location: 'Kibera, Nairobi',
    probability: 52,
    confidence: 'medium',
    drivers: ['Water outage complaints surge', 'Youth unemployment discourse', 'Historical volatility pattern'],
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    location: 'Turkana Central',
    probability: 41,
    confidence: 'low',
    drivers: ['Food insecurity signals', 'Cross-border tension mentions', 'Tribal identity clustering'],
    timestamp: '6 hours ago',
  },
];

export const policySentiment: PolicySentiment = {
  policy: 'Fuel Subsidy Removal',
  support: 27,
  neutral: 18,
  negative: 55,
  hotspots: ['Nairobi', 'Mombasa', 'Kisumu'],
};

export const polarizationData: PolarizationData[] = [
  { month: 'Jan', index: 0.42 },
  { month: 'Feb', index: 0.47 },
  { month: 'Mar', index: 0.61 },
  { month: 'Apr', index: 0.58 },
  { month: 'May', index: 0.65 },
  { month: 'Jun', index: 0.71 },
];

export const narratives: NarrativeData[] = [
  { narrative: 'Food prices are being manipulated by cartels', spread: 78, velocity: 'viral', communities: 1420, sentiment: 'negative' },
  { narrative: 'Government hiding true inflation numbers', spread: 65, velocity: 'fast', communities: 890, sentiment: 'negative' },
  { narrative: 'Youth employment programs showing results', spread: 34, velocity: 'moderate', communities: 340, sentiment: 'positive' },
  { narrative: 'Water rationing unfairly targets poor areas', spread: 52, velocity: 'fast', communities: 620, sentiment: 'negative' },
];

export const dataSources = [
  { name: 'Social Media', icon: MessageSquare, signals: '2.4M', status: 'active' },
  { name: 'SMS Feedback', icon: MessageSquare, signals: '156K', status: 'active' },
  { name: 'Radio Transcripts', icon: Radio, signals: '89K', status: 'active' },
  { name: 'News Sentiment', icon: Activity, signals: '12K', status: 'active' },
  { name: 'Survey Data', icon: Users, signals: '8.2K', status: 'active' },
];

export const getSentimentColor = (sentiment: SentimentRegion['sentiment']) => {
  const colors = {
    stable: 'hsl(210, 80%, 55%)',
    optimistic: 'hsl(145, 70%, 45%)',
    dissatisfaction: 'hsl(45, 95%, 55%)',
    frustration: 'hsl(25, 95%, 55%)',
    critical: 'hsl(0, 85%, 55%)',
  };
  return colors[sentiment];
};

export const getSentimentLabel = (sentiment: SentimentRegion['sentiment']) => {
  const labels = {
    stable: 'Stable',
    optimistic: 'Optimistic',
    dissatisfaction: 'Growing Dissatisfaction',
    frustration: 'High Frustration',
    critical: 'Potential Instability',
  };
  return labels[sentiment];
};
