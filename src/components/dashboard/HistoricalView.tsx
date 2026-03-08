import { useState } from "react";
import { motion } from "framer-motion";
import { History, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

// Historical mock data
const historicalData = {
  '7d': [
    { date: 'Mar 1', nairobi: 0.68, mombasa: 0.52, kisumu: 0.48, turkana: 0.58 },
    { date: 'Mar 2', nairobi: 0.70, mombasa: 0.54, kisumu: 0.50, turkana: 0.60 },
    { date: 'Mar 3', nairobi: 0.69, mombasa: 0.55, kisumu: 0.52, turkana: 0.59 },
    { date: 'Mar 4', nairobi: 0.71, mombasa: 0.56, kisumu: 0.53, turkana: 0.61 },
    { date: 'Mar 5', nairobi: 0.70, mombasa: 0.57, kisumu: 0.54, turkana: 0.62 },
    { date: 'Mar 6', nairobi: 0.72, mombasa: 0.58, kisumu: 0.55, turkana: 0.63 },
    { date: 'Mar 7', nairobi: 0.72, mombasa: 0.58, kisumu: 0.55, turkana: 0.63 },
  ],
  '30d': [
    { date: 'Feb 6', nairobi: 0.58, mombasa: 0.45, kisumu: 0.42, turkana: 0.52 },
    { date: 'Feb 13', nairobi: 0.62, mombasa: 0.48, kisumu: 0.45, turkana: 0.55 },
    { date: 'Feb 20', nairobi: 0.65, mombasa: 0.50, kisumu: 0.48, turkana: 0.58 },
    { date: 'Feb 27', nairobi: 0.68, mombasa: 0.52, kisumu: 0.50, turkana: 0.60 },
    { date: 'Mar 5', nairobi: 0.70, mombasa: 0.56, kisumu: 0.54, turkana: 0.62 },
    { date: 'Mar 7', nairobi: 0.72, mombasa: 0.58, kisumu: 0.55, turkana: 0.63 },
  ],
  '90d': [
    { date: 'Dec', nairobi: 0.48, mombasa: 0.38, kisumu: 0.35, turkana: 0.45 },
    { date: 'Jan', nairobi: 0.55, mombasa: 0.42, kisumu: 0.40, turkana: 0.50 },
    { date: 'Feb', nairobi: 0.65, mombasa: 0.50, kisumu: 0.48, turkana: 0.58 },
    { date: 'Mar', nairobi: 0.72, mombasa: 0.58, kisumu: 0.55, turkana: 0.63 },
  ],
};

const trustHistoricalData = {
  '7d': [
    { date: 'Mar 1', healthcare: 70, police: 38, government: 52 },
    { date: 'Mar 2', healthcare: 69, police: 36, government: 50 },
    { date: 'Mar 3', healthcare: 69, police: 35, government: 49 },
    { date: 'Mar 4', healthcare: 68, police: 35, government: 49 },
    { date: 'Mar 5', healthcare: 68, police: 34, government: 48 },
    { date: 'Mar 6', healthcare: 68, police: 34, government: 48 },
    { date: 'Mar 7', healthcare: 68, police: 34, government: 48 },
  ],
  '30d': [
    { date: 'Feb 6', healthcare: 72, police: 42, government: 55 },
    { date: 'Feb 13', healthcare: 71, police: 40, government: 53 },
    { date: 'Feb 20', healthcare: 70, police: 38, government: 51 },
    { date: 'Feb 27', healthcare: 69, police: 36, government: 50 },
    { date: 'Mar 5', healthcare: 68, police: 35, government: 48 },
    { date: 'Mar 7', healthcare: 68, police: 34, government: 48 },
  ],
  '90d': [
    { date: 'Dec', healthcare: 75, police: 48, government: 60 },
    { date: 'Jan', healthcare: 73, police: 45, government: 57 },
    { date: 'Feb', healthcare: 70, police: 40, government: 52 },
    { date: 'Mar', healthcare: 68, police: 34, government: 48 },
  ],
};

type TimeRange = '7d' | '30d' | '90d';
type ViewType = 'stress' | 'trust';

export const HistoricalView = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [viewType, setViewType] = useState<ViewType>('stress');

  const chartData = viewType === 'stress' 
    ? historicalData[timeRange] 
    : trustHistoricalData[timeRange];

  const stressLines = [
    { key: 'nairobi', color: 'hsl(var(--sentiment-frustration))' },
    { key: 'mombasa', color: 'hsl(var(--sentiment-dissatisfaction))' },
    { key: 'kisumu', color: 'hsl(var(--sentiment-dissatisfaction))' },
    { key: 'turkana', color: 'hsl(var(--sentiment-frustration))' },
  ];

  const trustLines = [
    { key: 'healthcare', color: 'hsl(var(--sentiment-optimistic))' },
    { key: 'police', color: 'hsl(var(--sentiment-critical))' },
    { key: 'government', color: 'hsl(var(--sentiment-dissatisfaction))' },
  ];

  const lines = viewType === 'stress' ? stressLines : trustLines;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Historical Trends</h2>
            <p className="text-sm text-muted-foreground">Compare sentiment over time</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={viewType} onValueChange={(v) => setViewType(v as ViewType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stress">Stress Index</SelectItem>
              <SelectItem value="trust">Trust Metrics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              domain={viewType === 'stress' ? [0.2, 0.9] : [20, 80]}
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
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                dot={{ fill: line.color, strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Period comparison */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-border/50">
        <ComparisonCard 
          label="Nairobi Δ"
          current={0.72}
          previous={viewType === 'stress' ? 0.58 : 70}
          type={viewType}
        />
        <ComparisonCard 
          label="Mombasa Δ"
          current={0.58}
          previous={viewType === 'stress' ? 0.45 : 52}
          type={viewType}
        />
        <ComparisonCard 
          label="Avg Trust"
          current={48}
          previous={55}
          type="trust"
          inverse
        />
        <ComparisonCard 
          label="Avg Stress"
          current={0.62}
          previous={0.48}
          type="stress"
        />
      </div>
    </motion.div>
  );
};

const ComparisonCard = ({ 
  label, 
  current, 
  previous, 
  type,
  inverse = false
}: { 
  label: string; 
  current: number; 
  previous: number; 
  type: 'stress' | 'trust';
  inverse?: boolean;
}) => {
  const change = ((current - previous) / previous * 100).toFixed(1);
  const isNegative = parseFloat(change) < 0;
  const isGood = inverse ? !isNegative : isNegative;

  return (
    <div className="p-3 rounded-lg bg-muted/30">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-mono text-lg font-semibold">
        {type === 'stress' ? current.toFixed(2) : `${current}%`}
      </div>
      <div className={`text-xs flex items-center gap-1 ${isGood ? 'text-sentiment-optimistic' : 'text-sentiment-critical'}`}>
        {isNegative ? <ChevronLeft className="w-3 h-3 rotate-90" /> : <ChevronRight className="w-3 h-3 -rotate-90" />}
        <span>{isNegative ? change : `+${change}`}%</span>
      </div>
    </div>
  );
};
