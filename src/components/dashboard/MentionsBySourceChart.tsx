import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for mentions by source
const mentionsData = [
  { source: 'BJP Leaders', mentions: 145, negativePercent: 78 },
  { source: 'Journalists', mentions: 89, negativePercent: 42 },
  { source: 'Influencers', mentions: 67, negativePercent: 35 },
  { source: 'Newspapers', mentions: 234, negativePercent: 58 },
];

// Custom label component to show negative percentage
const CustomLabel = (props: any) => {
  const { x, y, width, height, value, payload } = props;
  
  // Check if payload exists and has negativePercent property
  if (!payload || payload.negativePercent === undefined) {
    return null;
  }
  
  return (
    <text 
      x={x + width / 2} 
      y={y - 5} 
      fill="hsl(var(--sentiment-negative))"
      textAnchor="middle" 
      fontSize={14}
      fontWeight="bold"
    >
      {`${payload.negativePercent}% neg`}
    </text>
  );
};

export default function MentionsBySourceChart() {
  return (
    <Card className="bg-dashboard-section border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Who is Talking About KPCC?
        </CardTitle>
        <p className="text-muted-foreground">Number of mentions with negative sentiment %</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mentionsData} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="source" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }}
                label={{ value: 'Number of Mentions', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} mentions (${props.payload.negativePercent}% negative)`,
                  'Mentions'
                ]}
              />
              <Bar dataKey="mentions" label={<CustomLabel />}>
                {mentionsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(var(--primary))`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}