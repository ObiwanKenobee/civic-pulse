import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SentimentMap } from "@/components/dashboard/SentimentMap";
import { CivicTrustIndex } from "@/components/dashboard/CivicTrustIndex";
import { GrievanceRadar } from "@/components/dashboard/GrievanceRadar";
import { StressIndex } from "@/components/dashboard/StressIndex";
import { UnrestAlerts } from "@/components/dashboard/UnrestAlerts";
import { PolarizationTracker } from "@/components/dashboard/PolarizationTracker";
import { PolicySentiment } from "@/components/dashboard/PolicySentiment";
import { NarrativeIntelligence } from "@/components/dashboard/NarrativeIntelligence";
import { DataSourcesPanel } from "@/components/dashboard/DataSourcesPanel";
import { HistoricalView } from "@/components/dashboard/HistoricalView";
import { ExportPanel } from "@/components/dashboard/ExportPanel";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const { 
    regions, 
    trustMetrics, 
    grievances, 
    unrestAlerts, 
    narratives, 
    lastUpdate,
    refresh 
  } = useRealtimeData(5000);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <DashboardHeader />
        
        {/* Real-time status bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6 p-3 rounded-lg bg-muted/20 border border-border/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sentiment-optimistic animate-pulse" />
              <span className="text-sm text-muted-foreground">Live Data</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={refresh} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <ExportPanel lastUpdate={lastUpdate} />
          </div>
        </motion.div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Map & Alerts */}
          <div className="lg:col-span-7 space-y-6">
            <SentimentMap regions={regions} />
            <UnrestAlerts alerts={unrestAlerts} />
            <NarrativeIntelligence narratives={narratives} />
          </div>

          {/* Right Column - Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <CivicTrustIndex metrics={trustMetrics} />
            <GrievanceRadar grievances={grievances} />
            <StressIndex regions={regions} />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <PolarizationTracker />
          <PolicySentiment />
        </div>

        {/* Historical View */}
        <div className="mt-6">
          <HistoricalView />
        </div>

        {/* Data Sources */}
        <div className="mt-6">
          <DataSourcesPanel />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Atlas Civic Intelligence System • Community Sentiment Dashboard v1.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Used ethically, this becomes a civic listening system. Not surveillance. Awareness.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
