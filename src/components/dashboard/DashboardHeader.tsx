import { motion } from "framer-motion";
import { Activity, Radio, Wifi } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sentiment-optimistic rounded-full animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Community Sentiment Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Atlas Civic Intelligence System • Kenya Region
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <SystemStatus />
          <LiveIndicator />
        </div>
      </div>
    </motion.header>
  );
};

const SystemStatus = () => {
  const stats = [
    { label: 'Signals Today', value: '2.8M', trend: '+12%' },
    { label: 'Active Sources', value: '847', trend: 'stable' },
    { label: 'Model Confidence', value: '94.2%', trend: '+0.3%' },
  ];

  return (
    <div className="hidden md:flex items-center gap-6 px-4 py-2 rounded-lg bg-muted/50">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="font-mono text-sm font-medium">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const LiveIndicator = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentiment-optimistic/10 border border-sentiment-optimistic/30">
      <Wifi className="w-4 h-4 text-sentiment-optimistic animate-pulse" />
      <span className="text-sm font-medium text-sentiment-optimistic">LIVE</span>
      <span className="text-xs text-muted-foreground">Last update: 2m ago</span>
    </div>
  );
};
