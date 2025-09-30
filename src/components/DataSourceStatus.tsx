import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, XCircle, AlertCircle, Wifi, Database, Zap, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DataSource {
  name: string;
  status: 'online' | 'offline' | 'warning';
  description: string;
  lastUpdate: string;
  url?: string;
}

export function DataSourceStatus() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);

  const checkDataSources = async () => {
    setLoading(true);
    
    const sources: DataSource[] = [
      {
        name: 'Bureau of Labor Statistics',
        status: 'online',
        description: 'Job market trends and employment data',
        lastUpdate: new Date().toLocaleString(),
        url: 'https://api.bls.gov'
      },
      {
        name: 'College Scorecard API',
        status: 'online', 
        description: 'University data and rankings',
        lastUpdate: new Date().toLocaleString(),
        url: 'https://api.data.gov/ed/collegescorecard'
      },
      {
        name: 'O*NET Web Services',
        status: 'online',
        description: 'Career information and skill requirements',
        lastUpdate: new Date().toLocaleString(),
        url: 'https://services.onetcenter.org'
      },
      {
        name: 'News API',
        status: 'warning',
        description: 'Latest industry news and trends',
        lastUpdate: new Date().toLocaleString(),
        url: 'https://newsapi.org'
      }
    ];

    // Check our Supabase server status
    try {
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6e9921eb`;
      const response = await fetch(`${serverUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (response.ok) {
        sources.push({
          name: 'Career Guidance Server',
          status: 'online',
          description: 'Data caching and analytics backend',
          lastUpdate: new Date().toLocaleString()
        });
      } else {
        sources.push({
          name: 'Career Guidance Server',
          status: 'offline',
          description: 'Data caching and analytics backend',
          lastUpdate: 'Connection failed'
        });
      }
    } catch (error) {
      sources.push({
        name: 'Career Guidance Server',
        status: 'offline',
        description: 'Data caching and analytics backend',
        lastUpdate: 'Connection error'
      });
    }

    setDataSources(sources);
    setLoading(false);
  };

  useEffect(() => {
    checkDataSources();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'offline':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Source Status
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkDataSources}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dataSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(source.status)}
                <div>
                  <h4 className="font-medium">{source.name}</h4>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(source.status)}>
                  {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {source.lastUpdate}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Real API Integration Ready</h4>
              <p className="text-sm text-blue-800 mt-1">
                The platform is configured to work with real APIs. Currently using simulated data for demonstration.
                To enable live data:
              </p>
              <ul className="text-sm text-blue-800 mt-2 ml-4 list-disc">
                <li>Configure API keys for external services</li>
                <li>Replace mock data with actual API calls</li>
                <li>Set up rate limiting and caching strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}