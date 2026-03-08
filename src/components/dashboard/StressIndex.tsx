import { motion } from "framer-motion";
import { SentimentRegion } from "@/lib/dashboardData";
import { Gauge } from "lucide-react";

interface StressIndexProps {
  regions: SentimentRegion[];
}

export const StressIndex = ({ regions }: StressIndexProps) => {
  const sortedRegions = [...regions].sort((a, b) => b.stressIndex - a.stressIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Community Stress Index</h2>
          <p className="text-sm text-muted-foreground">Composite societal pressure score</p>
        </div>
      </div>

      <div className="space-y-4">
        {sortedRegions.map((region, index) => {
          const stressLevel = getStressLevel(region.stressIndex);
          
          return (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.04 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{region.name}</span>
                  <span className="text-xs text-muted-foreground">{region.population}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${stressLevel.bgClass}`}>
                    {stressLevel.label}
                  </span>
                  <span className="font-mono text-sm font-semibold w-10 text-right">
                    {region.stressIndex.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${region.stressIndex * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.04 }}
                  className={`absolute inset-y-0 left-0 rounded-full ${stressLevel.barClass}`}
                />
                
                {/* Threshold markers */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 border-r border-background/50" />
                  <div className="w-1/4 border-r border-background/50" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentiment-optimistic" />
            <span className="text-muted-foreground">Stable (0-0.45)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentiment-dissatisfaction" />
            <span className="text-muted-foreground">Moderate (0.45-0.6)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentiment-frustration" />
            <span className="text-muted-foreground">Elevated (0.6-0.75)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentiment-critical" />
            <span className="text-muted-foreground">Critical (0.75+)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getStressLevel = (index: number) => {
  if (index < 0.45) {
    return { 
      label: 'Stable', 
      bgClass: 'bg-sentiment-optimistic/10 text-sentiment-optimistic',
      barClass: 'bg-sentiment-optimistic'
    };
  }
  if (index < 0.6) {
    return { 
      label: 'Moderate', 
      bgClass: 'bg-sentiment-dissatisfaction/10 text-sentiment-dissatisfaction',
      barClass: 'bg-sentiment-dissatisfaction'
    };
  }
  if (index < 0.75) {
    return { 
      label: 'Elevated', 
      bgClass: 'bg-sentiment-frustration/10 text-sentiment-frustration',
      barClass: 'bg-sentiment-frustration'
    };
  }
  return { 
    label: 'Critical', 
    bgClass: 'bg-sentiment-critical/10 text-sentiment-critical',
    barClass: 'bg-sentiment-critical'
  };
};
