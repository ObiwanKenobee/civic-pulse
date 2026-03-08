import { motion } from "framer-motion";
import { SentimentRegion, getSentimentColor, getSentimentLabel } from "@/lib/dashboardData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapPin, Users, TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RegionDetailModalProps {
  region: SentimentRegion | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock detailed data for each region
const getRegionDetails = (regionId: string) => {
  const detailsMap: Record<string, {
    economicStress: number;
    infrastructureIssues: number;
    governanceConcerns: number;
    healthcareAccess: number;
    recentIncidents: string[];
    topGrievances: string[];
    trendDirection: 'improving' | 'stable' | 'worsening';
  }> = {
    nairobi: {
      economicStress: 78,
      infrastructureIssues: 45,
      governanceConcerns: 82,
      healthcareAccess: 65,
      recentIncidents: ['Youth protest in CBD', 'Water outage in Eastleigh', 'Traffic protests'],
      topGrievances: ['Cost of living', 'Police misconduct', 'Traffic congestion'],
      trendDirection: 'worsening',
    },
    mombasa: {
      economicStress: 65,
      infrastructureIssues: 58,
      governanceConcerns: 52,
      healthcareAccess: 55,
      recentIncidents: ['Port workers strike threat', 'Tourism sector complaints'],
      topGrievances: ['Employment', 'Port delays', 'Housing costs'],
      trendDirection: 'stable',
    },
    kisumu: {
      economicStress: 62,
      infrastructureIssues: 48,
      governanceConcerns: 58,
      healthcareAccess: 52,
      recentIncidents: ['Fishing industry concerns', 'Market price protests'],
      topGrievances: ['Fish prices', 'Lake pollution', 'Healthcare'],
      trendDirection: 'stable',
    },
    nakuru: {
      economicStress: 45,
      infrastructureIssues: 38,
      governanceConcerns: 42,
      healthcareAccess: 68,
      recentIncidents: ['Minor market disputes'],
      topGrievances: ['Agricultural prices', 'Water access'],
      trendDirection: 'improving',
    },
    eldoret: {
      economicStress: 35,
      infrastructureIssues: 32,
      governanceConcerns: 38,
      healthcareAccess: 72,
      recentIncidents: [],
      topGrievances: ['Transport costs', 'Youth employment'],
      trendDirection: 'improving',
    },
    turkana: {
      economicStress: 72,
      infrastructureIssues: 78,
      governanceConcerns: 55,
      healthcareAccess: 32,
      recentIncidents: ['Food insecurity reports', 'Cross-border tensions'],
      topGrievances: ['Food security', 'Water access', 'Healthcare distance'],
      trendDirection: 'worsening',
    },
    garissa: {
      economicStress: 68,
      infrastructureIssues: 65,
      governanceConcerns: 48,
      healthcareAccess: 38,
      recentIncidents: ['Livestock disease concerns', 'Security patrols increased'],
      topGrievances: ['Security', 'Livestock prices', 'Education access'],
      trendDirection: 'stable',
    },
    machakos: {
      economicStress: 42,
      infrastructureIssues: 35,
      governanceConcerns: 45,
      healthcareAccess: 62,
      recentIncidents: ['Minor water disputes'],
      topGrievances: ['Agricultural support', 'Road conditions'],
      trendDirection: 'improving',
    },
  };
  
  return detailsMap[regionId] || detailsMap.nairobi;
};

export const RegionDetailModal = ({ region, open, onOpenChange }: RegionDetailModalProps) => {
  if (!region) return null;
  
  const details = getRegionDetails(region.id);
  const sentimentColor = getSentimentColor(region.sentiment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: sentimentColor }}
            />
            <span>{region.name} Region</span>
          </DialogTitle>
          <DialogDescription>
            Detailed sentiment analysis and civic intelligence
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Overview Card */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              <MapPin className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold" style={{ color: sentimentColor }}>
                {region.stressIndex.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Stress Index</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{region.population}</div>
              <div className="text-xs text-muted-foreground">Population</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              {details.trendDirection === 'improving' ? (
                <TrendingDown className="w-5 h-5 mx-auto mb-2 text-sentiment-optimistic" />
              ) : details.trendDirection === 'worsening' ? (
                <TrendingUp className="w-5 h-5 mx-auto mb-2 text-sentiment-critical" />
              ) : (
                <Activity className="w-5 h-5 mx-auto mb-2 text-sentiment-dissatisfaction" />
              )}
              <div className="text-lg font-semibold capitalize">{details.trendDirection}</div>
              <div className="text-xs text-muted-foreground">Trend</div>
            </div>
          </div>

          {/* Sentiment Status */}
          <div className="p-4 rounded-xl border border-border/50" style={{ borderColor: sentimentColor + '40' }}>
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: sentimentColor }}
              />
              <span className="font-semibold">{getSentimentLabel(region.sentiment)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Current civic mood classification based on aggregated signal analysis.
            </p>
          </div>

          {/* Stress Breakdown */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Stress Breakdown
            </h3>
            <div className="space-y-3">
              <StressBar label="Economic Stress" value={details.economicStress} />
              <StressBar label="Infrastructure Issues" value={details.infrastructureIssues} />
              <StressBar label="Governance Concerns" value={details.governanceConcerns} />
              <StressBar label="Healthcare Access" value={100 - details.healthcareAccess} />
            </div>
          </div>

          {/* Top Grievances */}
          <div className="space-y-3">
            <h3 className="font-semibold">Top Grievances</h3>
            <div className="flex flex-wrap gap-2">
              {details.topGrievances.map((grievance, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-sm rounded-full bg-muted/50 border border-border/50"
                >
                  {grievance}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          {details.recentIncidents.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-sentiment-dissatisfaction" />
                Recent Incidents
              </h3>
              <ul className="space-y-2">
                {details.recentIncidents.map((incident, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-sentiment-dissatisfaction" />
                    {incident}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StressBar = ({ label, value }: { label: string; value: number }) => {
  const getBarColor = (val: number) => {
    if (val < 40) return 'bg-sentiment-optimistic';
    if (val < 60) return 'bg-sentiment-dissatisfaction';
    if (val < 80) return 'bg-sentiment-frustration';
    return 'bg-sentiment-critical';
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${getBarColor(value)}`}
        />
      </div>
    </div>
  );
};
