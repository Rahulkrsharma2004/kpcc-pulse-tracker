import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for the last 7 days
const sentimentData = [
  { date: 'Dec 25', positive: 45, negative: 25, neutral: 30 },
  { date: 'Dec 26', positive: 52, negative: 18, neutral: 30 },
  { date: 'Dec 27', positive: 38, negative: 35, neutral: 27 },
  { date: 'Dec 28', positive: 48, negative: 22, neutral: 30 },
  { date: 'Dec 29', positive: 55, negative: 15, neutral: 30 },
  { date: 'Dec 30', positive: 42, negative: 28, neutral: 30 },
  { date: 'Dec 31', positive: 58, negative: 12, neutral: 30 },
];

export default function SentimentTrendChart() {
  return (
    <Card className="bg-dashboard-section border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Public Sentiment Trend
        </CardTitle>
        <p className="text-muted-foreground">Last 7 days - Percentage of posts</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }}
                label={{ value: '% of Posts', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }}
                formatter={(value: number, name: string) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="hsl(var(--sentiment-positive))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--sentiment-positive))', strokeWidth: 0, r: 5 }}
                name="Positive"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="hsl(var(--sentiment-negative))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--sentiment-negative))', strokeWidth: 0, r: 5 }}
                name="Negative"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="hsl(var(--sentiment-neutral))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--sentiment-neutral))', strokeWidth: 0, r: 5 }}
                name="Neutral"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}