import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiskAnalysis } from './components/RiskAnalysis';
import { ModelExplanation } from './components/ModelExplanation';
import { PredictionHistory } from './components/PredictionHistory';
import { Brain, AlertTriangle, TrendingUp } from 'lucide-react';

export function RiskPrediction() {
  const [selectedModel, setSelectedModel] = useState('cardiovascular');
  
  const models = [
    {
      id: 'cardiovascular',
      name: 'Cardiovascular Risk',
      description: 'Predicts 10-year cardiovascular disease risk',
      accuracy: '94.2%',
      icon: '❤️',
    },
    {
      id: 'diabetes',
      name: 'Diabetes Risk',
      description: 'Type 2 diabetes development prediction',
      accuracy: '91.8%',
      icon: '🩺',
    },
    {
      id: 'cancer',
      name: 'Cancer Screening',
      description: 'Early cancer detection indicators',
      accuracy: '88.5%',
      icon: '🔬',
    },
    {
      id: 'mental',
      name: 'Mental Health',
      description: 'Depression and anxiety risk assessment',
      accuracy: '89.7%',
      icon: '🧠',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:flex md:items-center md:justify-between"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary-600 to-healthcare-600 flex items-center justify-center mr-4">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold leading-7 text-neutral-900">
              AI Risk Prediction Engine
            </h1>
          </div>
          <p className="mt-2 text-lg text-neutral-600">
            CuraMind's advanced machine learning models for predictive health analytics
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            Model Performance
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Run New Prediction
          </motion.button>
        </div>
      </motion.div>

      {/* Model Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Select Prediction Model
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((model) => (
            <motion.button
              key={model.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedModel(model.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedModel === model.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="text-2xl mb-2">{model.icon}</div>
              <h4 className="font-semibold text-neutral-900 mb-1">{model.name}</h4>
              <p className="text-sm text-neutral-600 mb-2">{model.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Accuracy</span>
                <span className="text-sm font-semibold text-success-600">{model.accuracy}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg bg-warning-50 border border-warning-200 p-4"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-warning-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-warning-800">
              High-Risk Patients Detected
            </h3>
            <div className="mt-2 text-sm text-warning-700">
              <p>
                AI analysis has identified 12 patients with elevated risk scores in the past 24 hours.
                <a href="#" className="font-medium underline text-warning-800 hover:text-warning-900 ml-1">
                  Review cases
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Analysis */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <RiskAnalysis model={selectedModel} />
          </motion.div>
        </div>

        {/* Side Panel */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ModelExplanation model={selectedModel} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PredictionHistory />
          </motion.div>
        </div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">94.2%</h3>
          <p className="text-sm text-neutral-600">Model Accuracy</p>
        </div>
        
        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">15,847</h3>
          <p className="text-sm text-neutral-600">Predictions Generated</p>
        </div>
        
        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-healthcare-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-healthcare-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">287</h3>
          <p className="text-sm text-neutral-600">High-Risk Cases</p>
        </div>
      </motion.div>
    </div>
  );
}