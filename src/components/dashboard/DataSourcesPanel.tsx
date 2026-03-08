import { motion } from "framer-motion";
import { dataSources } from "@/lib/dashboardData";
import { Database, Shield, Eye } from "lucide-react";

export const DataSourcesPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Data Sources</h2>
          <p className="text-sm text-muted-foreground">Signal streams feeding the system</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {dataSources.map((source, index) => {
          const Icon = source.icon;
          return (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="p-3 rounded-lg bg-muted/30 text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs font-medium truncate">{source.name}</div>
              <div className="font-mono text-sm font-semibold text-primary">{source.signals}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-sentiment-optimistic animate-pulse" />
                <span className="text-xs text-sentiment-optimistic">{source.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Ethical safeguards */}
      <div className="mt-6 p-4 rounded-xl bg-muted/20 border border-border/50">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-sm mb-2">Ethical Safeguards Active</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Privacy Anonymization', 'Bias Detection', 'Transparency Logs', 'AI Reasoning Audit'].map((safeguard) => (
                <div key={safeguard} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-sentiment-optimistic" />
                  {safeguard}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
