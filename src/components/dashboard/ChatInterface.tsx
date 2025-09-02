import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ExternalLink, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    title: string;
    url: string;
    domain: string;
  }>;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API response with mock data
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Based on the latest KPCC media data, here's what I found regarding "${input}": 

The sentiment analysis shows mixed reactions across different sources. Recent mentions indicate varying levels of engagement with this topic. The data suggests both positive and negative sentiment patterns emerging from different stakeholders.

Key insights from the analysis reveal trends in public opinion and media coverage patterns that may be relevant to your inquiry.`,
        sources: [
          {
            title: 'Karnataka Pradesh Congress Committee - Official Statement',
            url: 'https://kpcc.org.in/news/statement-123',
            domain: 'kpcc.org.in'
          },
          {
            title: 'Times of India - Political Coverage',
            url: 'https://timesofindia.com/city/bangalore/politics-update',
            domain: 'timesofindia.com'
          },
          {
            title: 'The Hindu - Karnataka News',
            url: 'https://thehindu.com/news/national/karnataka/article123',
            domain: 'thehindu.com'
          }
        ],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Ask about KPCC Media Data
        </h3>
        <p className="text-sm text-muted-foreground">
          Get insights from our media monitoring and sentiment analysis
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-lg mb-2">Ask me anything about KPCC media coverage</p>
              <p className="text-sm">Try: "What's the sentiment around recent announcements?"</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {message.sources && (
                  <div className="mt-3 pt-3 border-t border-border/20">
                    <p className="text-xs font-medium mb-2 opacity-70">Sources:</p>
                    <div className="space-y-1">
                      {message.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs hover:underline opacity-80 hover:opacity-100"
                        >
                          <ExternalLink size={12} />
                          <span className="font-medium">{source.domain}</span>
                          <span>•</span>
                          <span className="truncate">{source.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg p-3 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Analyzing data...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about sentiment, trends, or specific topics..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
            size="sm"
          >
            <Send size={16} />
          </Button>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-3 px-4 py-2 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            This AI generated content can make mistakes. Please verify before publishing.
          </p>
        </div>
      </div>
    </Card>
  );
}