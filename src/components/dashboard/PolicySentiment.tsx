import { motion } from "framer-motion";
import { policySentiment } from "@/lib/dashboardData";
import { FileText, ThumbsUp, Minus, ThumbsDown } from "lucide-react";

export const PolicySentiment = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Policy Sentiment</h2>
          <p className="text-sm text-muted-foreground">Public reaction tracking</p>
        </div>
      </div>

      {/* Current Policy */}
      <div className="p-4 rounded-xl bg-muted/30 mb-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Tracking Policy
        </div>
        <div className="font-semibold text-lg">{policySentiment.policy}</div>
      </div>

      {/* Sentiment Breakdown */}
      <div className="space-y-4 mb-6">
        <SentimentBar 
          icon={ThumbsUp}
          label="Support"
          percentage={policySentiment.support}
          color="bg-sentiment-optimistic"
        />
        <SentimentBar 
          icon={Minus}
          label="Neutral"
          percentage={policySentiment.neutral}
          color="bg-muted-foreground"
        />
        <SentimentBar 
          icon={ThumbsDown}
          label="Negative"
          percentage={policySentiment.negative}
          color="bg-sentiment-critical"
        />
      </div>

      {/* Stacked bar visual */}
      <div className="h-4 rounded-full overflow-hidden flex mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${policySentiment.support}%` }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-sentiment-optimistic"
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${policySentiment.neutral}%` }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-muted-foreground"
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${policySentiment.negative}%` }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-sentiment-critical"
        />
      </div>

      {/* Hotspots */}
      <div className="pt-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Opposition Hotspots
        </div>
        <div className="flex flex-wrap gap-2">
          {policySentiment.hotspots.map((hotspot) => (
            <span 
              key={hotspot}
              className="px-2 py-1 text-xs rounded-md bg-sentiment-critical/10 text-sentiment-critical"
            >
              {hotspot}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SentimentBar = ({ 
  icon: Icon, 
  label, 
  percentage, 
  color 
}: { 
  icon: typeof ThumbsUp; 
  label: string; 
  percentage: number; 
  color: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm">{label}</span>
          <span className="font-mono text-sm">{percentage}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`h-full rounded-full ${color}`}
          />
        </div>
      </div>
    </div>
  );
};
