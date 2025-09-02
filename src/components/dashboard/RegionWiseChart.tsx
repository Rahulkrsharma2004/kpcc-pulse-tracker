import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const regionData = [
  {
    region: 'Bengaluru',
    positive: 45,
    negative: 25,
    neutral: 30,
    total: 2500
  },
  {
    region: 'Kalaburagi',
    positive: 38,
    negative: 35,
    neutral: 27,
    total: 850
  },
  {
    region: 'Mysuru',
    positive: 52,
    negative: 18,
    neutral: 30,
    total: 1200
  }
];

const COLORS = {
  positive: 'hsl(var(--chart-2))',
  negative: 'hsl(var(--chart-1))',
  neutral: 'hsl(var(--chart-3))'
};

const RegionWiseChart = () => {
  const handleRefresh = () => {
    console.log('Refreshing region-wise data...');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Region-wise Sentiment</CardTitle>
          <CardDescription>
            Bengaluru vs Kalaburagi vs Mysuru comparison
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="region" 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--popover-foreground))'
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Bar dataKey="positive" fill={COLORS.positive} name="positive" />
              <Bar dataKey="negative" fill={COLORS.negative} name="negative" />
              <Bar dataKey="neutral" fill={COLORS.neutral} name="neutral" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          {regionData.map((region) => (
            <div key={region.region} className="text-center">
              <div className="font-semibold text-foreground">{region.region}</div>
              <div className="text-muted-foreground">{region.total} mentions</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionWiseChart;