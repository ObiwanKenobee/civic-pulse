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

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <DashboardHeader />
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Map & Alerts */}
          <div className="lg:col-span-7 space-y-6">
            <SentimentMap />
            <UnrestAlerts />
            <NarrativeIntelligence />
          </div>

          {/* Right Column - Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <CivicTrustIndex />
            <GrievanceRadar />
            <StressIndex />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <PolarizationTracker />
          <PolicySentiment />
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
