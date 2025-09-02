import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Mock data for trending topics
const trendingTopics = [
  { keyword: 'Anna Bhagya', change: 24, trending: 'up' },
  { keyword: 'Free Bus Scheme', change: -8, trending: 'down' },
  { keyword: 'Karnataka Elections', change: 15, trending: 'up' },
];

export default function TrendingTopics() {
  return (
    <Card className="bg-dashboard-section border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Top 3 Trending Topics
        </CardTitle>
        <p className="text-muted-foreground">Keywords with mention changes</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {topic.trending === 'up' ? (
                    <TrendingUp className="h-6 w-6 text-sentiment-positive" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-sentiment-negative" />
                  )}
                  <span className="text-lg font-semibold text-foreground">
                    {topic.keyword}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span 
                  className={`text-lg font-bold ${
                    topic.trending === 'up' ? 'text-sentiment-positive' : 'text-sentiment-negative'
                  }`}
                >
                  {topic.trending === 'up' ? '+' : ''}{topic.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}