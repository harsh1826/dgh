import { useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

interface HealthMetrics {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  bmi: number;
  lastUpdated: Date;
}

interface RiskFactors {
  cardiovascular: number;
  diabetes: number;
  hypertension: number;
  obesity: number;
}

interface HealthData {
  metrics: HealthMetrics;
  riskFactors: RiskFactors;
  healthScore: number;
  recommendations: Array<{
    id: string;
    type: 'exercise' | 'nutrition' | 'medication' | 'lifestyle';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

// Simulated health data - in a real app, this would come from an API
const generateMockHealthData = (): HealthData => ({
  metrics: {
    heartRate: 72 + Math.floor(Math.random() * 20),
    bloodPressure: {
      systolic: 115 + Math.floor(Math.random() * 20),
      diastolic: 75 + Math.floor(Math.random() * 15)
    },
    temperature: 98.6 + (Math.random() - 0.5) * 2,
    oxygenSaturation: 96 + Math.floor(Math.random() * 4),
    weight: 150 + Math.floor(Math.random() * 50),
    bmi: 22 + Math.floor(Math.random() * 8),
    lastUpdated: new Date()
  },
  riskFactors: {
    cardiovascular: Math.random() * 0.3,
    diabetes: Math.random() * 0.25,
    hypertension: Math.random() * 0.4,
    obesity: Math.random() * 0.35
  },
  healthScore: 75 + Math.floor(Math.random() * 20),
  recommendations: [
    {
      id: '1',
      type: 'exercise',
      title: 'Increase Daily Activity',
      description: 'Aim for 30 minutes of moderate exercise daily',
      priority: 'high'
    },
    {
      id: '2',
      type: 'nutrition',
      title: 'Reduce Sodium Intake',
      description: 'Limit sodium to less than 2,300mg per day',
      priority: 'medium'
    }
  ]
});

export function useHealthData() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        
        const [metricsResponse, riskFactorsResponse] = await Promise.all([
          apiClient.getHealthMetrics(),
          apiClient.getRiskFactors()
        ]);
        
        const data: HealthData = {
          metrics: metricsResponse.metrics,
          riskFactors: riskFactorsResponse.riskFactors,
          healthScore: 75 + Math.floor(Math.random() * 20), // Temporary calculation
          recommendations: [
            {
              id: '1',
              type: 'exercise',
              title: 'Increase Daily Activity',
              description: 'Aim for 30 minutes of moderate exercise daily',
              priority: 'high'
            },
            {
              id: '2',
              type: 'nutrition',
              title: 'Reduce Sodium Intake',
              description: 'Limit sodium to less than 2,300mg per day',
              priority: 'medium'
            }
          ]
        };
        
        setHealthData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch health data');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  const refreshData = () => {
    // Trigger a re-fetch
    setHealthData(null);
    setError(null);
  };

  return {
    healthData,
    loading,
    error,
    refreshData
  };
}