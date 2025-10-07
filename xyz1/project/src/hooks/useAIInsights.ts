import { useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  confidence: number;
  category: 'cardiovascular' | 'metabolic' | 'lifestyle' | 'preventive';
  actionable: boolean;
  timestamp: Date;
}

export function useAIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getAIInsights({ limit: 10 });
        
        // Transform API response to match interface
        const transformedInsights = response.map((insight: any) => ({
          ...insight,
          id: insight._id,
          timestamp: new Date(insight.createdAt)
        }));
        
        setInsights(transformedInsights);
      } catch (error) {
        console.error('Failed to fetch AI insights:', error);
        // Fallback to empty array on error
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const refreshInsights = () => {
    // Trigger a re-fetch
    setInsights([]);
    setLoading(true);
  };

  return {
    insights,
    loading,
    refreshInsights
  };
}