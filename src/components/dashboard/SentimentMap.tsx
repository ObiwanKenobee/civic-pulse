import { useState } from "react";
import { motion } from "framer-motion";
import { SentimentRegion, getSentimentColor, getSentimentLabel } from "@/lib/dashboardData";
import { RegionDetailModal } from "./RegionDetailModal";

interface SentimentMapProps {
  regions: SentimentRegion[];
}

export const SentimentMap = ({ regions }: SentimentMapProps) => {
  const [selectedRegion, setSelectedRegion] = useState<SentimentRegion | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRegionClick = (region: SentimentRegion) => {
    setSelectedRegion(region);
    setModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card-elevated p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Sentiment Atmosphere Map</h2>
            <p className="text-sm text-muted-foreground">Real-time civic mood by region • Click for details</p>
          </div>
          <SentimentLegend />
        </div>

        <div className="relative aspect-[4/3] bg-muted/30 rounded-xl overflow-hidden border border-border/50">
          {/* Simplified Kenya map outline */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Kenya outline - simplified */}
            <path
              d="M 20 10 L 35 5 L 50 8 L 70 15 L 85 25 L 90 45 L 85 65 L 75 85 L 60 95 L 45 90 L 30 80 L 20 65 L 15 45 L 20 25 Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>

          {/* Region markers */}
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="absolute group cursor-pointer"
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleRegionClick(region)}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse-glow"
                style={{
                  backgroundColor: getSentimentColor(region.sentiment),
                  width: '40px',
                  height: '40px',
                  transform: 'translate(-25%, -25%)',
                }}
              />
              
              {/* Main dot */}
              <motion.div
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-5 h-5 rounded-full border-2 border-background shadow-lg transition-transform"
                style={{ backgroundColor: getSentimentColor(region.sentiment) }}
              />

              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <div className="glass-card px-3 py-2 text-xs whitespace-nowrap">
                  <div className="font-semibold">{region.name}</div>
                  <div className="text-muted-foreground">{getSentimentLabel(region.sentiment)}</div>
                  <div className="font-mono mt-1">
                    Stress: <span style={{ color: getSentimentColor(region.sentiment) }}>{region.stressIndex.toFixed(2)}</span>
                  </div>
                  <div className="text-primary text-[10px] mt-1">Click for details →</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Region cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {regions.slice(0, 4).map((region) => (
            <motion.div 
              key={region.id} 
              className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRegionClick(region)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getSentimentColor(region.sentiment) }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{region.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{region.stressIndex.toFixed(2)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <RegionDetailModal 
        region={selectedRegion}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

const SentimentLegend = () => {
  const levels = [
    { label: 'Stable', color: 'bg-sentiment-stable' },
    { label: 'Optimistic', color: 'bg-sentiment-optimistic' },
    { label: 'Dissatisfaction', color: 'bg-sentiment-dissatisfaction' },
    { label: 'Frustration', color: 'bg-sentiment-frustration' },
    { label: 'Critical', color: 'bg-sentiment-critical' },
  ];

  return (
    <div className="hidden sm:flex items-center gap-3">
      {levels.map((level) => (
        <div key={level.label} className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${level.color}`} />
          <span className="text-xs text-muted-foreground">{level.label}</span>
        </div>
      ))}
    </div>
  );
};
