import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  description: string;
  confidence: number;
  type: 'recommendation' | 'warning' | 'success' | 'info';
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function AIInsightCard({
  title,
  description,
  confidence,
  type,
  actionText,
  onAction,
  className = ''
}: AIInsightCardProps) {
  const typeConfig = {
    recommendation: {
      icon: Lightbulb,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      iconColor: 'text-primary-600'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      iconColor: 'text-warning-600'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      iconColor: 'text-success-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-healthcare-50',
      borderColor: 'border-healthcare-200',
      iconColor: 'text-healthcare-600'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card ${config.bgColor} ${config.borderColor} border ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
            <div className="flex items-center space-x-1">
              <Brain className="h-3 w-3 text-neutral-500" />
              <span className="text-xs text-neutral-500">{confidence}% confidence</span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mb-3">{description}</p>
          {actionText && onAction && (
            <button
              onClick={onAction}
              className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}