import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, Share, User } from 'lucide-react';

// Mock data for viral posts
const viralPosts = [
  {
    type: 'positive',
    author: '@KarnatakaVoice',
    content: 'KPCC\'s Anna Bhagya scheme has transformed thousands of lives across Karnataka. Real change happening on the ground! #AnnaThiranna',
    engagement: { likes: 2400, comments: 156, shares: 890 },
    image: null
  },
  {
    type: 'negative',
    author: '@OppositionTracker',
    content: 'Another day, another unfulfilled promise from KPCC. When will the people of Karnataka see real development instead of just announcements?',
    engagement: { likes: 1800, comments: 234, shares: 567 },
    image: null
  },
];

export default function ViralPostsHighlight() {
  return (
    <Card className="bg-dashboard-section border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Viral Post Highlights
        </CardTitle>
        <p className="text-muted-foreground">Today's most engaging posts</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {viralPosts.map((post, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 bg-background/50 ${
                post.type === 'positive' 
                  ? 'border-l-sentiment-positive' 
                  : 'border-l-sentiment-negative'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-foreground">{post.author}</span>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.type === 'positive' 
                          ? 'bg-sentiment-positive/20 text-sentiment-positive' 
                          : 'bg-sentiment-negative/20 text-sentiment-negative'
                      }`}
                    >
                      {post.type === 'positive' ? 'Positive' : 'Negative'}
                    </span>
                  </div>
                  <p className="text-foreground mb-3 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-medium">{post.engagement.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="h-4 w-4" />
                      <span className="text-sm font-medium">{post.engagement.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}