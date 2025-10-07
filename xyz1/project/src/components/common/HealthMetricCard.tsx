import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'excellent' | 'good' | 'fair' | 'poor';
  icon?: React.ReactNode;
  className?: string;
}

export function HealthMetricCard({
  title,
  value,
  unit,
  trend,
  trendValue,
  status = 'good',
  icon,
  className = ''
}: HealthMetricCardProps) {
  const statusColors = {
    excellent: 'border-success-200 bg-success-50',
    good: 'border-healthcare-200 bg-healthcare-50',
    fair: 'border-warning-200 bg-warning-50',
    poor: 'border-error-200 bg-error-50'
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus
  };

  const trendColors = {
    up: 'text-success-600',
    down: 'text-error-600',
    stable: 'text-neutral-500'
  };

  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <motion.div
      whileHover={{ y: -2, shadow: 'lg' }}
      className={`card border-l-4 ${statusColors[status]} ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-neutral-600">{icon}</div>}
          <h3 className="text-sm font-medium text-neutral-700">{title}</h3>
        </div>
        {trend && TrendIcon && (
          <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
            <TrendIcon className="h-4 w-4" />
            {trendValue && <span className="text-xs font-medium">{trendValue}</span>}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold text-neutral-900">{value}</span>
        {unit && <span className="text-sm text-neutral-500">{unit}</span>}
      </div>
    </motion.div>
  );
}