import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";

const influencerData = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    handle: '@rajeshkumar_kpcc',
    followers: '125K',
    engagement: '+12%',
    sentiment: 'positive',
    recentPost: 'Excited about the new infrastructure projects...',
    impact: 'high'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    handle: '@priyasharma_news',
    followers: '89K',
    engagement: '-5%',
    sentiment: 'neutral',
    recentPost: 'Analysis of recent policy changes...',
    impact: 'medium'
  },
  {
    id: 3,
    name: 'Karnataka Today',
    handle: '@karnatakatoday',
    followers: '340K',
    engagement: '+8%',
    sentiment: 'mixed',
    recentPost: 'Breaking: New announcement from...',
    impact: 'high'
  }
];

const InfluencerMonitor = () => {
  const handleRefresh = () => {
    console.log('Refreshing influencer data...');
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'negative': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'neutral': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'mixed': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Influencer Monitor</CardTitle>
          <CardDescription>
            Track key influencers and their impact
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {influencerData.map((influencer) => (
            <div key={influencer.id} className="flex items-start space-x-4 p-3 border border-border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${influencer.name}`} />
                <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{influencer.name}</h4>
                    <p className="text-xs text-muted-foreground">{influencer.handle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{influencer.followers}</span>
                    <div className="flex items-center">
                      {influencer.engagement.startsWith('+') ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ml-1 ${
                        influencer.engagement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {influencer.engagement}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {influencer.recentPost}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getSentimentColor(influencer.sentiment)}`}>
                    {influencer.sentiment}
                  </Badge>
                  <Badge className={`text-xs ${getImpactColor(influencer.impact)}`}>
                    {influencer.impact} impact
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerMonitor;