import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Users,
  Target,
  Lightbulb,
} from 'lucide-react';

const insights = [
  {
    id: 1,
    title: 'Risk Pattern Detected',
    description: 'AI identified common risk factors in 67% of high-risk patients',
    confidence: 94,
    action: 'Review Risk Factors',
    icon: AlertTriangle,
    color: 'error',
  },
  {
    id: 2,
    title: 'Preventive Care Opportunity',
    description: '234 patients due for preventive screenings this month',
    confidence: 89,
    action: 'Schedule Screenings',
    icon: Target,
    color: 'healthcare',
  },
  {
    id: 3,
    title: 'Treatment Effectiveness',
    description: 'Current treatment protocols show 15% better outcomes',
    confidence: 92,
    action: 'Expand Protocol',
    icon: TrendingUp,
    color: 'success',
  },
  {
    id: 4,
    title: 'Population Health Trend',
    description: 'Overall health scores improving across all age groups',
    confidence: 87,
    action: 'View Trends',
    icon: Users,
    color: 'primary',
  },
];

const colorClasses = {
  error: 'bg-error-50 text-error-600 border-error-200',
  healthcare: 'bg-healthcare-50 text-healthcare-600 border-healthcare-200',
  success: 'bg-success-50 text-success-600 border-success-200',
  primary: 'bg-primary-50 text-primary-600 border-primary-200',
};

export function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-600 to-healthcare-600 flex items-center justify-center mr-3">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              AI Insights
            </h3>
            <p className="text-sm text-neutral-600">
              Explainable AI recommendations
            </p>
          </div>
        </div>
        <span className="badge bg-primary-100 text-primary-700">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border p-4 ${colorClasses[insight.color]}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <insight.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-neutral-900">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    {insight.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-1">
                      <Lightbulb className="h-3 w-3 text-neutral-500" />
                      <span className="text-xs text-neutral-500">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white/50 px-3 py-1 rounded-full transition-colors">
                {insight.action}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <button className="w-full text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          View all AI insights →
        </button>
      </div>
    </motion.div>
  );
}