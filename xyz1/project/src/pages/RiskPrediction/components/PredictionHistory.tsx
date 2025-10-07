import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const recentPredictions = [
  {
    id: 1,
    patientId: 'P-2847',
    riskLevel: 'High',
    riskScore: 0.78,
    model: 'Cardiovascular',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'Action Required',
    color: 'error',
  },
  {
    id: 2,
    patientId: 'P-1954',
    riskLevel: 'Moderate',
    riskScore: 0.42,
    model: 'Diabetes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'Monitoring',
    color: 'warning',
  },
  {
    id: 3,
    patientId: 'P-3021',
    riskLevel: 'Low',
    riskScore: 0.15,
    model: 'Cancer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    status: 'Normal',
    color: 'success',
  },
  {
    id: 4,
    patientId: 'P-4156',
    riskLevel: 'Moderate',
    riskScore: 0.58,
    model: 'Mental Health',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    status: 'Follow-up',
    color: 'warning',
  },
];

const colorClasses = {
  error: {
    bg: 'bg-error-50',
    text: 'text-error-600',
    border: 'border-error-200',
    icon: AlertTriangle,
  },
  warning: {
    bg: 'bg-warning-50',
    text: 'text-warning-600',
    border: 'border-warning-200',
    icon: AlertTriangle,
  },
  success: {
    bg: 'bg-success-50',
    text: 'text-success-600',
    border: 'border-success-200',
    icon: CheckCircle,
  },
};

export function PredictionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">
            Recent Predictions
          </h3>
          <p className="text-sm text-neutral-600">
            Latest AI risk assessments
          </p>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {recentPredictions.map((prediction, index) => {
          const colorConfig = colorClasses[prediction.color];
          const IconComponent = colorConfig.icon;
          
          return (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${colorConfig.border} ${colorConfig.bg}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <IconComponent className={`h-5 w-5 ${colorConfig.text} mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {prediction.patientId}
                      </h4>
                      <span className={`text-xs font-medium ${colorConfig.text}`}>
                        {prediction.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">
                      {prediction.model} Model
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-neutral-500">
                        Score: {(prediction.riskScore * 100).toFixed(1)}%
                      </span>
                      <div className="flex items-center text-xs text-neutral-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(prediction.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-700">
                    Status: {prediction.status}
                  </span>
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-success-600 mr-2" />
          <span className="text-sm text-neutral-600">
            Average prediction accuracy: <span className="font-medium text-success-600">92.1%</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}