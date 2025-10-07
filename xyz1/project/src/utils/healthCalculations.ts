import { HEALTH_METRICS, RISK_LEVELS } from './constants';

export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateHealthScore(metrics: {
  bmi?: number;
  bloodPressure?: { systolic: number; diastolic: number };
  cholesterol?: number;
  exercise?: number;
  smoking?: boolean;
}): number {
  let score = 100;
  
  // BMI impact
  if (metrics.bmi) {
    if (metrics.bmi < 18.5 || metrics.bmi > 30) score -= 15;
    else if (metrics.bmi > 25) score -= 8;
  }
  
  // Blood pressure impact
  if (metrics.bloodPressure) {
    if (metrics.bloodPressure.systolic > 140 || metrics.bloodPressure.diastolic > 90) {
      score -= 20;
    } else if (metrics.bloodPressure.systolic > 120 || metrics.bloodPressure.diastolic > 80) {
      score -= 10;
    }
  }
  
  // Cholesterol impact
  if (metrics.cholesterol) {
    if (metrics.cholesterol > 240) score -= 15;
    else if (metrics.cholesterol > 200) score -= 8;
  }
  
  // Exercise impact
  if (metrics.exercise !== undefined) {
    if (metrics.exercise < 2) score -= 12;
    else if (metrics.exercise < 4) score -= 6;
  }
  
  // Smoking impact
  if (metrics.smoking) score -= 25;
  
  return Math.max(0, Math.min(100, score));
}

export function getRiskLevel(score: number): keyof typeof RISK_LEVELS {
  if (score <= RISK_LEVELS.LOW.threshold) return 'LOW';
  if (score <= RISK_LEVELS.MODERATE.threshold) return 'MODERATE';
  return 'HIGH';
}

export function getHealthMetricCategory(score: number): keyof typeof HEALTH_METRICS {
  for (const [key, metric] of Object.entries(HEALTH_METRICS)) {
    if (score >= metric.min && score <= metric.max) {
      return key as keyof typeof HEALTH_METRICS;
    }
  }
  return 'POOR';
}

export function simulateAIPrediction(patientData: any): {
  riskScore: number;
  confidence: number;
  factors: Array<{ name: string; impact: number; explanation: string }>;
} {
  // Simulate AI prediction with explainable factors
  const baseRisk = Math.random() * 0.3 + 0.1; // Base risk between 0.1-0.4
  
  const factors = [
    {
      name: 'Age',
      impact: patientData.age > 50 ? 0.15 : -0.05,
      explanation: patientData.age > 50 ? 'Advanced age increases risk' : 'Young age reduces risk',
    },
    {
      name: 'BMI',
      impact: patientData.bmi > 30 ? 0.12 : patientData.bmi < 25 ? -0.08 : 0,
      explanation: patientData.bmi > 30 ? 'Obesity significantly increases risk' : 
                  patientData.bmi < 25 ? 'Healthy weight reduces risk' : 'Weight within normal range',
    },
    {
      name: 'Lifestyle',
      impact: patientData.smoking ? 0.2 : (patientData.exercise > 3 ? -0.1 : 0.05),
      explanation: patientData.smoking ? 'Smoking significantly increases risk' :
                  patientData.exercise > 3 ? 'Regular exercise reduces risk' : 'Sedentary lifestyle increases risk',
    },
  ];
  
  const totalImpact = factors.reduce((sum, factor) => sum + factor.impact, 0);
  const riskScore = Math.max(0, Math.min(1, baseRisk + totalImpact));
  const confidence = 85 + Math.random() * 10; // 85-95% confidence
  
  return {
    riskScore,
    confidence,
    factors,
  };
}