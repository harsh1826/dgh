import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  Brain,
  Heart,
  Activity,
  TrendingUp,
  Download,
  Share,
} from 'lucide-react';

interface AssessmentResultsProps {
  data: any;
}

export function AssessmentResults({ data }: AssessmentResultsProps) {
  // Simulate AI analysis results
  const overallScore = 78;
  const riskLevel = 'Moderate';
  const riskColor = 'warning';
  
  const assessmentResults = {
    cardiovascular: { score: 72, risk: 'Moderate', recommendations: 3 },
    metabolic: { score: 85, risk: 'Low', recommendations: 2 },
    mental: { score: 68, risk: 'Moderate', recommendations: 4 },
    lifestyle: { score: 60, risk: 'High', recommendations: 5 },
  };

  const keyFindings = [
    {
      type: 'positive',
      title: 'Good Metabolic Health',
      description: 'Your metabolic indicators show excellent patterns',
      icon: CheckCircle,
      color: 'text-success-600',
    },
    {
      type: 'concern',
      title: 'Lifestyle Risk Factors',
      description: 'Several lifestyle factors may impact long-term health',
      icon: AlertTriangle,
      color: 'text-warning-600',
    },
    {
      type: 'recommendation',
      title: 'Preventive Care Opportunities',
      description: 'AI identified specific areas for health improvement',
      icon: Brain,
      color: 'text-primary-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-success-600 to-healthcare-600 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Assessment Complete
        </h1>
        <p className="text-lg text-neutral-600">
          Your comprehensive health analysis is ready
        </p>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card text-center bg-gradient-to-r from-primary-50 to-healthcare-50 border-primary-200"
      >
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="#2563eb"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - overallScore / 100) }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-600">{overallScore}</span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Overall Health Score
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          Based on AI analysis of your health data
        </p>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          riskColor === 'warning' ? 'bg-warning-100 text-warning-600' : 'bg-success-100 text-success-600'
        }`}>
          {riskLevel} Risk Level
        </div>
      </motion.div>

      {/* Detailed Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {Object.entries(assessmentResults).map(([category, result], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-neutral-900 capitalize">
                {category} Health
              </h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                result.risk === 'Low' ? 'bg-success-100 text-success-600' :
                result.risk === 'Moderate' ? 'bg-warning-100 text-warning-600' :
                'bg-error-100 text-error-600'
              }`}>
                {result.risk} Risk
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-neutral-900">{result.score}/100</span>
              <TrendingUp className="h-5 w-5 text-success-600" />
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 mb-4">
              <motion.div
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            </div>
            <p className="text-sm text-neutral-600">
              {result.recommendations} AI recommendations available
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Findings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="text-xl font-semibold text-neutral-900 mb-6">
          Key Findings & AI Insights
        </h3>
        <div className="space-y-4">
          {keyFindings.map((finding, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start space-x-4 p-4 rounded-lg bg-neutral-50"
            >
              <div className="flex-shrink-0">
                <finding.icon className={`h-6 w-6 ${finding.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">
                  {finding.title}
                </h4>
                <p className="text-sm text-neutral-600 mt-1">
                  {finding.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button className="btn-primary flex items-center justify-center">
          <Heart className="h-4 w-4 mr-2" />
          View Recommendations
        </button>
        <button className="btn-secondary flex items-center justify-center">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </button>
        <button className="btn-secondary flex items-center justify-center">
          <Share className="h-4 w-4 mr-2" />
          Share with Provider
        </button>
      </motion.div>
    </div>
  );
}