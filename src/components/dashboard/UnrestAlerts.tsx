import { motion } from "framer-motion";
import { UnrestAlert } from "@/lib/dashboardData";
import { AlertTriangle, Clock, ChevronRight, Shield } from "lucide-react";

interface UnrestAlertsProps {
  alerts: UnrestAlert[];
}

export const UnrestAlerts = ({ alerts }: UnrestAlertsProps) => {
  const highPriorityCount = alerts.filter(a => a.probability > 50).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card-elevated p-6 border-l-4 border-l-sentiment-frustration"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sentiment-critical/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-sentiment-critical animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Early Unrest Detection</h2>
            <p className="text-sm text-muted-foreground">Pattern-based situational awareness</p>
          </div>
        </div>
        
        {highPriorityCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentiment-critical/10 border border-sentiment-critical/30">
            <span className="font-mono text-sm font-semibold text-sentiment-critical">
              {highPriorityCount}
            </span>
            <span className="text-xs text-sentiment-critical">Active</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{alert.location}</span>
                  <ConfidenceBadge confidence={alert.confidence} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-mono font-bold" style={{
                  color: alert.probability > 60 
                    ? 'hsl(var(--sentiment-critical))' 
                    : alert.probability > 40 
                      ? 'hsl(var(--sentiment-frustration))'
                      : 'hsl(var(--sentiment-dissatisfaction))'
                }}>
                  {alert.probability}%
                </div>
                <div className="text-xs text-muted-foreground">probability</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Drivers
              </div>
              {alert.drivers.map((driver, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-1 h-1 rounded-full bg-sentiment-frustration" />
                  <span>{driver}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end mt-3 pt-3 border-t border-border/50">
              <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
                View analysis
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/50">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Important:</span> This is situational awareness, not predictive policing. 
            Used correctly, it enables early dialogue and intervention.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ConfidenceBadge = ({ confidence }: { confidence: 'low' | 'medium' | 'high' }) => {
  const styles = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-sentiment-dissatisfaction/10 text-sentiment-dissatisfaction',
    high: 'bg-sentiment-critical/10 text-sentiment-critical',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[confidence]}`}>
      {confidence} confidence
    </span>
  );
};
