import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SentimentTrendChart from '@/components/dashboard/SentimentTrendChart';
import MentionsBySourceChart from '@/components/dashboard/MentionsBySourceChart';
import TrendingTopics from '@/components/dashboard/TrendingTopics';
import ViralPostsHighlight from '@/components/dashboard/ViralPostsHighlight';
import ChatInterface from '@/components/dashboard/ChatInterface';
import RegionWiseChart from '@/components/dashboard/RegionWiseChart';
import InfluencerMonitor from '@/components/dashboard/InfluencerMonitor';
import AlertSettings from '@/components/dashboard/AlertSettings';
import SearchInterface from '@/components/dashboard/SearchInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto p-6 dashboard-content">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left column - Charts and Analytics */}
          <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment Trend Chart */}
              <SentimentTrendChart />
              
              {/* Mentions by Source Chart */}
              <MentionsBySourceChart />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trending Topics */}
              <TrendingTopics />
              
              {/* Viral Posts Highlight */}
              <ViralPostsHighlight />
            </div>

            {/* Region-wise Chart */}
            <RegionWiseChart />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Influencer Monitor */}
              <InfluencerMonitor />
              
              {/* Alert Settings */}
              <AlertSettings />
            </div>
          </div>
          
          {/* Right column - Chat Interface and Search */}
          <div className="xl:col-span-1 space-y-6">
            <SearchInterface />
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
