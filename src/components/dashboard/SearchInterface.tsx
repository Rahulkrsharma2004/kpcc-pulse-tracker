import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

interface SearchResult {
  id: number;
  title: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  excerpt: string;
  url: string;
}

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const mockResults: SearchResult[] = [
    {
      id: 1,
      title: 'CM announces new infrastructure project for Bengaluru',
      source: 'The Hindu',
      sentiment: 'positive',
      timestamp: '2 hours ago',
      excerpt: 'The Chief Minister today announced a major infrastructure development...',
      url: '#'
    },
    {
      id: 2,
      title: 'Opposition criticizes recent policy changes',
      source: 'Deccan Herald',
      sentiment: 'negative',
      timestamp: '4 hours ago',
      excerpt: 'Opposition leaders expressed concerns about the implementation...',
      url: '#'
    },
    {
      id: 3,
      title: 'Public welfare scheme receives mixed response',
      source: 'Times of India',
      sentiment: 'neutral',
      timestamp: '6 hours ago',
      excerpt: 'Citizens have shown varied reactions to the newly launched scheme...',
      url: '#'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'negative': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'neutral': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Quick Search
        </CardTitle>
        <CardDescription>
          Find what people/media are saying about leaders or schemes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search for leaders, schemes, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Search Results ({searchResults.length})</h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {searchResults.map((result) => (
                <div key={result.id} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <h5 className="text-sm font-medium text-foreground line-clamp-2">
                      {result.title}
                    </h5>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {result.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{result.source}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {result.timestamp}
                      </div>
                    </div>
                    <Badge className={`text-xs ${getSentimentColor(result.sentiment)}`}>
                      {result.sentiment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-6 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No results found for "{searchQuery}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchInterface;