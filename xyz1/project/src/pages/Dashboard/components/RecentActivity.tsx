import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import {
  Brain,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'risk-assessment',
    title: 'High-risk patient identified',
    description: 'AI model detected elevated cardiovascular risk for Patient #2847',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: AlertTriangle,
    iconColor: 'text-error-600',
    bgColor: 'bg-error-50',
  },
  {
    id: 2,
    type: 'prediction',
    title: 'AI prediction completed',
    description: 'Machine learning analysis completed for 23 patients',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: Brain,
    iconColor: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    id: 3,
    type: 'improvement',
    title: 'Health metric improved',
    description: 'Patient #1954 shows 15% improvement in health score',
    time: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    icon: CheckCircle,
    iconColor: 'text-success-600',
    bgColor: 'bg-success-50',
  },
  {
    id: 4,
    type: 'assessment',
    title: 'Health assessment completed',
    description: 'Comprehensive health evaluation for Patient #3021',
    time: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    icon: Heart,
    iconColor: 'text-healthcare-600',
    bgColor: 'bg-healthcare-50',
  },
  {
    id: 5,
    type: 'monitoring',
    title: 'Vital signs monitored',
    description: 'Real-time monitoring alert for 5 critical patients',
    time: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    icon: Activity,
    iconColor: 'text-accent-600',
    bgColor: 'bg-accent-50',
  },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">
            Recent Activity
          </h3>
          <p className="text-sm text-neutral-600">
            Latest AI insights and system activities
          </p>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </div>

      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-neutral-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`${activity.bgColor} h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}
                    >
                      <activity.icon
                        className={`h-4 w-4 ${activity.iconColor}`}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {activity.description}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(activity.time, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}