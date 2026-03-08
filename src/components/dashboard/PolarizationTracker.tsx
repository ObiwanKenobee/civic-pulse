import { motion } from "framer-motion";
import { polarizationData } from "@/lib/dashboardData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Users, TrendingUp } from "lucide-react";

export const PolarizationTracker = () => {
  const latestIndex = polarizationData[polarizationData.length - 1].index;
  const previousIndex = polarizationData[polarizationData.length - 2].index;
  const change = ((latestIndex - previousIndex) / previousIndex * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Social Cohesion</h2>
            <p className="text-sm text-muted-foreground">Polarization index over time</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-sentiment-frustration">
            {latestIndex.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-sentiment-critical text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>+{change}%</span>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={polarizationData}>
            <defs>
              <linearGradient id="polarizationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--sentiment-frustration))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--sentiment-frustration))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              domain={[0.3, 0.8]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="index"
              stroke="hsl(var(--sentiment-frustration))"
              strokeWidth={2}
              fill="url(#polarizationGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Cohesion signals */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/50">
        <CohesionSignal 
          label="Language Polarity" 
          value="High" 
          status="warning"
          description="Hostile discourse increasing"
        />
        <CohesionSignal 
          label="Identity Clustering" 
          value="Moderate" 
          status="caution"
          description="Tribal grouping detected"
        />
        <CohesionSignal 
          label="Narrative Spread" 
          value="Fast" 
          status="warning"
          description="Anger narratives spreading"
        />
        <CohesionSignal 
          label="Community Support" 
          value="Stable" 
          status="good"
          description="Mutual aid holding"
        />
      </div>
    </motion.div>
  );
};

const CohesionSignal = ({ 
  label, 
  value, 
  status, 
  description 
}: { 
  label: string; 
  value: string; 
  status: 'good' | 'caution' | 'warning';
  description: string;
}) => {
  const statusColors = {
    good: 'bg-sentiment-optimistic/10 text-sentiment-optimistic',
    caution: 'bg-sentiment-dissatisfaction/10 text-sentiment-dissatisfaction',
    warning: 'bg-sentiment-frustration/10 text-sentiment-frustration',
  };

  return (
    <div className="p-2 rounded-lg bg-muted/20">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${statusColors[status]}`}>
          {value}
        </span>
      </div>
      <p className="text-xs text-muted-foreground/70">{description}</p>
    </div>
  );
};
