import { useState, useEffect, useCallback } from 'react';
import { 
  SentimentRegion, 
  TrustMetric, 
  Grievance, 
  UnrestAlert,
  PolarizationData,
  NarrativeData,
  regions as initialRegions,
  trustMetrics as initialTrustMetrics,
  grievances as initialGrievances,
  unrestAlerts as initialUnrestAlerts,
  polarizationData as initialPolarizationData,
  narratives as initialNarratives,
} from '@/lib/dashboardData';

const randomVariation = (value: number, maxChange: number = 0.05) => {
  const change = (Math.random() - 0.5) * 2 * maxChange;
  return Math.max(0, Math.min(1, value + change));
};

const randomIntVariation = (value: number, maxChange: number = 5) => {
  const change = Math.round((Math.random() - 0.5) * 2 * maxChange);
  return Math.max(0, Math.min(100, value + change));
};

export const useRealtimeData = (updateInterval: number = 5000) => {
  const [regions, setRegions] = useState<SentimentRegion[]>(initialRegions);
  const [trustMetrics, setTrustMetrics] = useState<TrustMetric[]>(initialTrustMetrics);
  const [grievances, setGrievances] = useState<Grievance[]>(initialGrievances);
  const [unrestAlerts, setUnrestAlerts] = useState<UnrestAlert[]>(initialUnrestAlerts);
  const [polarizationData, setPolarizationData] = useState<PolarizationData[]>(initialPolarizationData);
  const [narratives, setNarratives] = useState<NarrativeData[]>(initialNarratives);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const updateData = useCallback(() => {
    // Update regions
    setRegions(prev => prev.map(region => ({
      ...region,
      stressIndex: parseFloat(randomVariation(region.stressIndex, 0.03).toFixed(2)),
    })));

    // Update trust metrics
    setTrustMetrics(prev => prev.map(metric => ({
      ...metric,
      percentage: randomIntVariation(metric.percentage, 2),
      change: randomIntVariation(metric.change, 1),
    })));

    // Update grievances
    setGrievances(prev => prev.map(grievance => ({
      ...grievance,
      changePercent: randomIntVariation(grievance.changePercent, 3),
    })));

    // Update unrest alerts
    setUnrestAlerts(prev => prev.map(alert => ({
      ...alert,
      probability: randomIntVariation(alert.probability, 3),
    })));

    // Update narratives
    setNarratives(prev => prev.map(narrative => ({
      ...narrative,
      spread: randomIntVariation(narrative.spread, 2),
      communities: narrative.communities + Math.round((Math.random() - 0.3) * 50),
    })));

    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(updateData, updateInterval);
    return () => clearInterval(interval);
  }, [updateData, updateInterval]);

  return {
    regions,
    trustMetrics,
    grievances,
    unrestAlerts,
    polarizationData,
    narratives,
    lastUpdate,
    refresh: updateData,
  };
};
