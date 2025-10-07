import React from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Brain,
  FileText,
  Calendar,
  Stethoscope,
  BarChart3,
} from 'lucide-react';

const actions = [
  {
    name: 'New Assessment',
    description: 'Start health assessment',
    icon: UserPlus,
    href: '/assessment',
    color: 'primary',
  },
  {
    name: 'AI Prediction',
    description: 'Generate risk prediction',
    icon: Brain,
    href: '/risk-prediction',
    color: 'healthcare',
  },
  {
    name: 'Medical Records',
    description: 'Review patient history',
    icon: FileText,
    href: '/medical-history',
    color: 'accent',
  },
  {
    name: 'Schedule Care',
    description: 'Plan preventive care',
    icon: Calendar,
    href: '/preventive-care',
    color: 'primary',
  },
  {
    name: 'Symptom Check',
    description: 'Analyze symptoms',
    icon: Stethoscope,
    href: '/symptom-checker',
    color: 'healthcare',
  },
  {
    name: 'View Analytics',
    description: 'Health insights',
    icon: BarChart3,
    href: '/analytics',
    color: 'accent',
  },
];

const colorClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700',
  healthcare: 'bg-healthcare-600 hover:bg-healthcare-700',
  accent: 'bg-accent-600 hover:bg-accent-700',
};

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">
          Quick Actions
        </h3>
        <p className="text-sm text-neutral-600">
          Common tasks and AI-powered tools
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.a
            key={action.name}
            href={action.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${colorClasses[action.color]} text-white rounded-lg p-4 block transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <action.icon className="h-6 w-6" />
              <div>
                <p className="text-sm font-semibold">{action.name}</p>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">System Status</span>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-success-600 rounded-full animate-pulse"></div>
            <span className="text-success-600 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}