import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'primary' | 'healthcare' | 'accent' | 'success';
}

const colorClasses = {
  primary: {
    bg: 'bg-primary-50',
    icon: 'text-primary-600',
    border: 'border-primary-200',
  },
  healthcare: {
    bg: 'bg-healthcare-50',
    icon: 'text-healthcare-600',
    border: 'border-healthcare-200',
  },
  accent: {
    bg: 'bg-accent-50',
    icon: 'text-accent-600',
    border: 'border-accent-200',
  },
  success: {
    bg: 'bg-success-50',
    icon: 'text-success-600',
    border: 'border-success-200',
  },
};

export function StatsCard({
  name,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -2, shadow: 'lg' }}
      className={`card ${colors.border} border-l-4`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`${colors.bg} rounded-lg p-3`}>
            <Icon className={`h-6 w-6 ${colors.icon}`} />
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-neutral-500 truncate">
              {name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold text-neutral-900">{value}</div>
              <div className="ml-2 flex items-baseline text-sm font-semibold">
                {changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-success-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-error-600 mr-1" />
                )}
                <span
                  className={
                    changeType === 'increase' ? 'text-success-600' : 'text-error-600'
                  }
                >
                  {change}
                </span>
                <span className="ml-1 text-neutral-500">from last month</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </motion.div>
  );
}