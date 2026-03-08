import { motion } from "framer-motion";
import { trustMetrics } from "@/lib/dashboardData";
import { TrendingDown, TrendingUp, Minus, AlertTriangle } from "lucide-react";

export const CivicTrustIndex = () => {
  const averageTrust = Math.round(
    trustMetrics.reduce((acc, m) => acc + m.percentage, 0) / trustMetrics.length
  );

  const fragileInstitutions = trustMetrics.filter(m => m.percentage < 50).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Civic Trust Index</h2>
          <p className="text-sm text-muted-foreground">Institutional confidence levels</p>
        </div>
        
        {fragileInstitutions > 2 && (
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-sentiment-frustration/10 border border-sentiment-frustration/30">
            <AlertTriangle className="w-4 h-4 text-sentiment-frustration" />
            <span className="text-xs font-medium text-sentiment-frustration">
              {fragileInstitutions} Fragile
            </span>
          </div>
        )}
      </div>

      {/* Overall Trust Gauge */}
      <div className="mb-6 p-4 rounded-xl bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Trust</span>
          <span className="font-mono text-2xl font-semibold">{averageTrust}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${averageTrust}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="progress-fill"
            style={{
              backgroundColor: averageTrust > 60 
                ? 'hsl(var(--sentiment-optimistic))' 
                : averageTrust > 40 
                  ? 'hsl(var(--sentiment-dissatisfaction))'
                  : 'hsl(var(--sentiment-critical))'
            }}
          />
        </div>
      </div>

      {/* Individual Institutions */}
      <div className="space-y-4">
        {trustMetrics.map((metric, index) => (
          <motion.div
            key={metric.institution}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm">{metric.institution}</span>
              <div className="flex items-center gap-2">
                <TrendIndicator trend={metric.trend} change={metric.change} />
                <span className="font-mono text-sm font-medium w-12 text-right">
                  {metric.percentage}%
                </span>
              </div>
            </div>
            <div className="progress-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.05 }}
                className="progress-fill"
                style={{
                  backgroundColor: metric.percentage > 60 
                    ? 'hsl(var(--sentiment-optimistic))' 
                    : metric.percentage > 40 
                      ? 'hsl(var(--sentiment-dissatisfaction))'
                      : 'hsl(var(--sentiment-critical))'
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Warning note */}
      <div className="mt-6 p-3 rounded-lg bg-sentiment-frustration/5 border border-sentiment-frustration/20">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-sentiment-frustration">Historical pattern:</span> Trust 
          collapse below 40% correlates with protests, riots, and institutional instability.
        </p>
      </div>
    </motion.div>
  );
};

const TrendIndicator = ({ trend, change }: { trend: 'up' | 'down' | 'stable'; change: number }) => {
  if (trend === 'stable') {
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  }
  
  // For trust, down is bad (red), up is good (green)
  if (trend === 'down') {
    return (
      <div className="flex items-center text-sentiment-critical">
        <TrendingDown className="w-3 h-3" />
        <span className="text-xs font-mono ml-0.5">{change}%</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center text-sentiment-optimistic">
      <TrendingUp className="w-3 h-3" />
      <span className="text-xs font-mono ml-0.5">+{change}%</span>
    </div>
  );
};
