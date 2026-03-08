import { motion } from "framer-motion";
import { Grievance } from "@/lib/dashboardData";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface GrievanceRadarProps {
  grievances: Grievance[];
}

export const GrievanceRadar = ({ grievances }: GrievanceRadarProps) => {
  const totalChange = grievances.reduce((acc, g) => acc + (g.trend === 'up' ? g.changePercent : -g.changePercent), 0);
  const risingGrievances = grievances.filter(g => g.trend === 'up').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Grievance Detection Engine</h2>
          <p className="text-sm text-muted-foreground">Real-time complaint clustering</p>
        </div>
        
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-sentiment-critical/10 border border-sentiment-critical/30">
          <AlertCircle className="w-4 h-4 text-sentiment-critical" />
          <span className="text-xs font-medium text-sentiment-critical">
            {risingGrievances} Rising
          </span>
        </div>
      </div>

      {/* Grievance Grid */}
      <div className="space-y-3">
        {grievances.map((grievance, index) => {
          const Icon = grievance.icon;
          const isRising = grievance.trend === 'up';
          
          return (
            <motion.div
              key={grievance.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isRising ? 'bg-sentiment-critical/10' : 'bg-sentiment-optimistic/10'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isRising ? 'text-sentiment-critical' : 'text-sentiment-optimistic'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{grievance.category}</span>
                  <div className={`flex items-center gap-1 font-mono text-sm ${
                    isRising ? 'text-sentiment-critical' : 'text-sentiment-optimistic'
                  }`}>
                    {isRising ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{isRising ? '+' : '-'}{grievance.changePercent}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {grievance.description}
                </p>
              </div>
              
              {/* Mini bar */}
              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(grievance.changePercent * 3, 100)}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  className={`h-full rounded-full ${
                    isRising ? 'bg-sentiment-critical' : 'bg-sentiment-optimistic'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* This week summary */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">This week's net change</span>
          <span className={`font-mono font-medium ${
            totalChange > 0 ? 'text-sentiment-critical' : 'text-sentiment-optimistic'
          }`}>
            {totalChange > 0 ? '+' : ''}{totalChange}% overall
          </span>
        </div>
      </div>
    </motion.div>
  );
};
