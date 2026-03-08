import { motion } from "framer-motion";
import { NarrativeData } from "@/lib/dashboardData";
import { MessageCircle, Zap, TrendingUp, Users } from "lucide-react";

interface NarrativeIntelligenceProps {
  narratives: NarrativeData[];
}

export const NarrativeIntelligence = ({ narratives }: NarrativeIntelligenceProps) => {
  const viralCount = narratives.filter(n => n.velocity === 'viral' || n.velocity === 'fast').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-purple/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-chart-purple" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Narrative Intelligence</h2>
            <p className="text-sm text-muted-foreground">Stories spreading through society</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-chart-purple/10 border border-chart-purple/30">
          <Zap className="w-4 h-4 text-chart-purple" />
          <span className="text-xs font-medium text-chart-purple">
            {viralCount} Fast-spreading
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {narratives.map((narrative, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-1.5 rounded-lg ${getSentimentBg(narrative.sentiment)}`}>
                <MessageCircle className={`w-4 h-4 ${getSentimentText(narrative.sentiment)}`} />
              </div>
              <p className="text-sm font-medium leading-snug flex-1">
                "{narrative.narrative}"
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {narrative.spread}% reach
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {narrative.communities.toLocaleString()} communities
                  </span>
                </div>
              </div>
              
              <VelocityBadge velocity={narrative.velocity} />
            </div>

            {/* Spread bar */}
            <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${narrative.spread}%` }}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                className={`h-full rounded-full ${getVelocityColor(narrative.velocity)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const VelocityBadge = ({ velocity }: { velocity: string }) => {
  const styles: Record<string, string> = {
    slow: 'bg-muted text-muted-foreground',
    moderate: 'bg-sentiment-dissatisfaction/10 text-sentiment-dissatisfaction',
    fast: 'bg-sentiment-frustration/10 text-sentiment-frustration',
    viral: 'bg-sentiment-critical/10 text-sentiment-critical',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${styles[velocity]}`}>
      {(velocity === 'fast' || velocity === 'viral') && (
        <Zap className="w-3 h-3" />
      )}
      {velocity}
    </span>
  );
};

const getVelocityColor = (velocity: string) => {
  const colors: Record<string, string> = {
    slow: 'bg-muted-foreground',
    moderate: 'bg-sentiment-dissatisfaction',
    fast: 'bg-sentiment-frustration',
    viral: 'bg-sentiment-critical',
  };
  return colors[velocity];
};

const getSentimentBg = (sentiment: string) => {
  const colors: Record<string, string> = {
    neutral: 'bg-muted',
    negative: 'bg-sentiment-critical/10',
    positive: 'bg-sentiment-optimistic/10',
  };
  return colors[sentiment];
};

const getSentimentText = (sentiment: string) => {
  const colors: Record<string, string> = {
    neutral: 'text-muted-foreground',
    negative: 'text-sentiment-critical',
    positive: 'text-sentiment-optimistic',
  };
  return colors[sentiment];
};
