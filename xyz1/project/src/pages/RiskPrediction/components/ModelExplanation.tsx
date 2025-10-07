import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, Info, TrendingUp } from 'lucide-react';

interface ModelExplanationProps {
  model: string;
}

const modelDetails = {
  cardiovascular: {
    name: 'Cardiovascular Risk Model',
    algorithm: 'Deep Neural Network',
    features: [
      'Age, Gender, BMI',
      'Blood Pressure History',
      'Cholesterol Levels',
      'Family History',
      'Lifestyle Factors',
      'Lab Results',
    ],
    accuracy: '94.2%',
    sensitivity: '91.8%',
    specificity: '96.1%',
    explanation: 'This model uses advanced deep learning to analyze multiple cardiovascular risk factors and predict 10-year disease risk with high accuracy.',
  },
  diabetes: {
    name: 'Type 2 Diabetes Risk Model',
    algorithm: 'Random Forest',
    features: [
      'Glucose Levels',
      'BMI & Weight History',
      'Physical Activity',
      'Family History',
      'Age & Ethnicity',
      'Blood Pressure',
    ],
    accuracy: '91.8%',
    sensitivity: '89.3%',
    specificity: '94.2%',
    explanation: 'Ensemble model combining multiple decision trees to predict diabetes onset based on metabolic and lifestyle indicators.',
  },
  cancer: {
    name: 'Cancer Screening Model',
    algorithm: 'Gradient Boosting',
    features: [
      'Age & Gender',
      'Family History',
      'Environmental Factors',
      'Previous Screenings',
      'Biomarkers',
      'Lifestyle Factors',
    ],
    accuracy: '88.5%',
    sensitivity: '85.7%',
    specificity: '91.2%',
    explanation: 'Multi-stage boosting algorithm that identifies early cancer indicators across multiple cancer types.',
  },
  mental: {
    name: 'Mental Health Risk Model',
    algorithm: 'Support Vector Machine',
    features: [
      'Stress Indicators',
      'Sleep Patterns',
      'Social Factors',
      'Work Environment',
      'Medical History',
      'Behavioral Patterns',
    ],
    accuracy: '89.7%',
    sensitivity: '87.4%',
    specificity: '92.1%',
    explanation: 'SVM model trained on psychological and behavioral data to predict mental health risks and intervention needs.',
  },
};

export function ModelExplanation({ model }: ModelExplanationProps) {
  const details = modelDetails[model] || modelDetails.cardiovascular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <Brain className="h-4 w-4 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">
          Model Details
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">
            {details.name}
          </h4>
          <p className="text-sm text-neutral-600">{details.explanation}</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-neutral-900">
              Algorithm: {details.algorithm}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-primary-600">{details.accuracy}</p>
              <p className="text-xs text-neutral-600">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-success-600">{details.sensitivity}</p>
              <p className="text-xs text-neutral-600">Sensitivity</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-healthcare-600">{details.specificity}</p>
              <p className="text-xs text-neutral-600">Specificity</p>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-neutral-900 mb-3">
            Key Features
          </h5>
          <div className="space-y-2">
            {details.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center text-sm"
              >
                <CheckCircle className="h-3 w-3 text-success-600 mr-2 flex-shrink-0" />
                <span className="text-neutral-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <div className="flex items-center text-sm text-neutral-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span>Continuously learning from new data</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}