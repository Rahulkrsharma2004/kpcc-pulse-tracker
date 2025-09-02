import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

const AlertSettings = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [threshold, setThreshold] = useState(15);
  const [recentAlerts] = useState([
    {
      id: 1,
      message: 'Negative sentiment spike detected in Kalaburagi (18%)',
      timestamp: '2 hours ago',
      type: 'warning'
    },
    {
      id: 2,
      message: 'Positive sentiment trending in Bengaluru (+22%)',
      timestamp: '5 hours ago',
      type: 'success'
    }
  ]);

  const handleSaveSettings = () => {
    console.log('Saving alert settings:', { alertsEnabled, threshold });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Sentiment Alerts
        </CardTitle>
        <CardDescription>
          Auto-notify when negative sentiment spikes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="alerts-enabled">Enable Alerts</Label>
            <p className="text-xs text-muted-foreground">
              Receive notifications for sentiment changes
            </p>
          </div>
          <Switch
            id="alerts-enabled"
            checked={alertsEnabled}
            onCheckedChange={setAlertsEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="threshold">Negative Sentiment Threshold (%)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-20"
              min="1"
              max="50"
            />
            <span className="text-sm text-muted-foreground">
              Alert when negative sentiment exceeds this percentage in a day
            </span>
          </div>
        </div>

        <Button onClick={handleSaveSettings} size="sm">
          Save Settings
        </Button>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Recent Alerts</h4>
          <div className="space-y-2">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                {alert.type === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
                <Badge 
                  variant={alert.type === 'warning' ? 'destructive' : 'default'}
                  className="text-xs"
                >
                  {alert.type === 'warning' ? 'Alert' : 'Info'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertSettings;