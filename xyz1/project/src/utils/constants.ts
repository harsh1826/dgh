export const HEALTH_METRICS = {
  EXCELLENT: { min: 90, max: 100, color: 'success', label: 'Excellent' },
  GOOD: { min: 75, max: 89, color: 'healthcare', label: 'Good' },
  FAIR: { min: 60, max: 74, color: 'warning', label: 'Fair' },
  POOR: { min: 0, max: 59, color: 'error', label: 'Poor' },
} as const;

export const RISK_LEVELS = {
  LOW: { threshold: 0.3, color: 'success', label: 'Low Risk' },
  MODERATE: { threshold: 0.7, color: 'warning', label: 'Moderate Risk' },
  HIGH: { threshold: 1.0, color: 'error', label: 'High Risk' },
} as const;

export const AI_MODELS = {
  CARDIOVASCULAR: {
    name: 'Cardiovascular Risk Prediction',
    accuracy: 94.2,
    features: ['Age', 'Blood Pressure', 'Cholesterol', 'BMI', 'Smoking History'],
    description: 'Predicts 10-year cardiovascular disease risk using clinical guidelines and ML',
  },
  DIABETES: {
    name: 'Type 2 Diabetes Risk Assessment',
    accuracy: 91.8,
    features: ['Glucose', 'BMI', 'Family History', 'Physical Activity', 'Age'],
    description: 'Identifies patients at risk for developing Type 2 diabetes',
  },
  CANCER: {
    name: 'Cancer Screening Recommendations',
    accuracy: 88.5,
    features: ['Age', 'Family History', 'Lifestyle', 'Previous Screenings', 'Biomarkers'],
    description: 'Provides personalized cancer screening recommendations',
  },
} as const;

export const HIPAA_COMPLIANCE = {
  DATA_ENCRYPTION: 'AES-256',
  ACCESS_LOGGING: true,
  AUDIT_TRAIL: true,
  USER_AUTHENTICATION: 'Multi-factor',
  DATA_RETENTION: '7 years',
} as const;