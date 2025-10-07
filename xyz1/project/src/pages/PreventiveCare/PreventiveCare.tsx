import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  Plus,
  Filter,
  Heart,
  Eye,
  Shield,
  Activity,
} from 'lucide-react';

interface PreventiveCareItem {
  id: string;
  type: 'screening' | 'vaccination' | 'checkup' | 'dental' | 'vision';
  title: string;
  description: string;
  frequency: string;
  lastCompleted?: string;
  nextDue: string;
  status: 'overdue' | 'due-soon' | 'up-to-date' | 'scheduled';
  importance: 'high' | 'medium' | 'low';
  ageRecommendation: string;
  provider?: string;
}

const mockCareItems: PreventiveCareItem[] = [
  {
    id: '1',
    type: 'screening',
    title: 'Mammography',
    description: 'Breast cancer screening for early detection',
    frequency: 'Annual',
    lastCompleted: '2023-01-15',
    nextDue: '2024-01-15',
    status: 'overdue',
    importance: 'high',
    ageRecommendation: 'Ages 40-74',
    provider: 'Radiology Associates'
  },
  {
    id: '2',
    type: 'checkup',
    title: 'Annual Physical Exam',
    description: 'Comprehensive health evaluation and preventive care',
    frequency: 'Annual',
    lastCompleted: '2023-12-10',
    nextDue: '2024-12-10',
    status: 'up-to-date',
    importance: 'high',
    ageRecommendation: 'All adults',
    provider: 'Dr. Sarah Johnson, MD'
  },
  {
    id: '3',
    type: 'screening',
    title: 'Colonoscopy',
    description: 'Colorectal cancer screening',
    frequency: 'Every 10 years',
    lastCompleted: '2019-03-22',
    nextDue: '2029-03-22',
    status: 'up-to-date',
    importance: 'high',
    ageRecommendation: 'Ages 45-75'
  },
  {
    id: '4',
    type: 'vaccination',
    title: 'Flu Vaccine',
    description: 'Annual influenza vaccination',
    frequency: 'Annual',
    lastCompleted: '2023-09-15',
    nextDue: '2024-09-15',
    status: 'due-soon',
    importance: 'medium',
    ageRecommendation: 'All adults'
  },
  {
    id: '5',
    type: 'dental',
    title: 'Dental Cleaning',
    description: 'Professional dental cleaning and oral health check',
    frequency: 'Every 6 months',
    lastCompleted: '2024-01-20',
    nextDue: '2024-07-20',
    status: 'scheduled',
    importance: 'medium',
    ageRecommendation: 'All adults',
    provider: 'Dr. Michael Chen, DDS'
  },
  {
    id: '6',
    type: 'vision',
    title: 'Eye Exam',
    description: 'Comprehensive eye examination',
    frequency: 'Every 2 years',
    lastCompleted: '2022-06-10',
    nextDue: '2024-06-10',
    status: 'due-soon',
    importance: 'medium',
    ageRecommendation: 'Ages 18-64'
  },
  {
    id: '7',
    type: 'screening',
    title: 'Blood Pressure Check',
    description: 'Cardiovascular health monitoring',
    frequency: 'Annual',
    lastCompleted: '2024-01-15',
    nextDue: '2025-01-15',
    status: 'up-to-date',
    importance: 'high',
    ageRecommendation: 'All adults'
  },
  {
    id: '8',
    type: 'screening',
    title: 'Cholesterol Test',
    description: 'Lipid panel for cardiovascular risk assessment',
    frequency: 'Every 5 years',
    lastCompleted: '2023-01-15',
    nextDue: '2028-01-15',
    status: 'up-to-date',
    importance: 'high',
    ageRecommendation: 'Ages 20+'
  }
];

const typeIcons = {
  screening: Activity,
  vaccination: Shield,
  checkup: Heart,
  dental: CheckCircle,
  vision: Eye,
};

const statusColors = {
  overdue: 'error',
  'due-soon': 'warning',
  'up-to-date': 'success',
  scheduled: 'primary',
};

const importanceColors = {
  high: 'error',
  medium: 'warning',
  low: 'success',
};

export function PreventiveCare() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredItems = mockCareItems.filter(item => {
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const types = ['all', 'screening', 'vaccination', 'checkup', 'dental', 'vision'];
  const statuses = ['all', 'overdue', 'due-soon', 'up-to-date', 'scheduled'];

  const getStatusMessage = (item: PreventiveCareItem) => {
    const daysUntilDue = Math.ceil((new Date(item.nextDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    switch (item.status) {
      case 'overdue':
        return `Overdue by ${Math.abs(daysUntilDue)} days`;
      case 'due-soon':
        return `Due in ${daysUntilDue} days`;
      case 'up-to-date':
        return `Next due in ${daysUntilDue} days`;
      case 'scheduled':
        return `Scheduled for ${new Date(item.nextDue).toLocaleDateString()}`;
      default:
        return '';
    }
  };

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
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold leading-7 text-neutral-900">
              Preventive Care Scheduler
            </h1>
          </div>
          <p className="mt-2 text-lg text-neutral-600">
            Stay on top of your preventive health with CuraMind's AI-powered scheduling
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Care Item
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="card border-l-4 border-l-error-600">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {mockCareItems.filter(item => item.status === 'overdue').length}
              </div>
              <div className="text-sm text-neutral-600">Overdue</div>
            </div>
            <AlertTriangle className="h-8 w-8 text-error-600" />
          </div>
        </div>
        
        <div className="card border-l-4 border-l-warning-600">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {mockCareItems.filter(item => item.status === 'due-soon').length}
              </div>
              <div className="text-sm text-neutral-600">Due Soon</div>
            </div>
            <Clock className="h-8 w-8 text-warning-600" />
          </div>
        </div>
        
        <div className="card border-l-4 border-l-success-600">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {mockCareItems.filter(item => item.status === 'up-to-date').length}
              </div>
              <div className="text-sm text-neutral-600">Up to Date</div>
            </div>
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
        </div>
        
        <div className="card border-l-4 border-l-primary-600">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {mockCareItems.filter(item => item.status === 'scheduled').length}
              </div>
              <div className="text-sm text-neutral-600">Scheduled</div>
            </div>
            <Calendar className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-neutral-400" />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Care Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Care Items */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => {
          const IconComponent = typeIcons[item.type];
          const statusColor = statusColors[item.status];
          const importanceColor = importanceColors[item.importance];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`h-12 w-12 rounded-lg bg-${statusColor}-100 flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`h-6 w-6 text-${statusColor}-600`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`badge badge-${statusColor}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                      <span className={`badge badge-${importanceColor}`}>
                        {item.importance} priority
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Frequency</div>
                      <div className="text-sm text-neutral-600">{item.frequency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Age Recommendation</div>
                      <div className="text-sm text-neutral-600">{item.ageRecommendation}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Status</div>
                      <div className={`text-sm text-${statusColor}-600 font-medium`}>
                        {getStatusMessage(item)}
                      </div>
                    </div>
                  </div>

                  {item.provider && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-neutral-700">Provider</div>
                      <div className="text-sm text-neutral-600">{item.provider}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      {item.lastCompleted && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Last: {new Date(item.lastCompleted).toLocaleDateString()}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Next: {new Date(item.nextDue).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {item.status === 'overdue' || item.status === 'due-soon' ? (
                        <button className="btn-primary text-sm">
                          Schedule Now
                        </button>
                      ) : (
                        <button className="btn-secondary text-sm">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No care items found
          </h3>
          <p className="text-neutral-600">
            Try adjusting your filters to see more preventive care items.
          </p>
        </motion.div>
      )}

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-r from-primary-50 to-healthcare-50 border-primary-200"
      >
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-white">AI</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">
            AI Care Recommendations
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-success-600 mr-3 mt-0.5" />
            <div>
              <p className="text-neutral-700">
                <strong>Priority Action:</strong> Schedule your overdue mammography screening. 
                Early detection significantly improves treatment outcomes.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
            <div>
              <p className="text-neutral-700">
                <strong>Upcoming:</strong> Your flu vaccination is due soon. Consider scheduling 
                before flu season peaks.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Heart className="h-5 w-5 text-healthcare-600 mr-3 mt-0.5" />
            <div>
              <p className="text-neutral-700">
                <strong>Optimization:</strong> Based on your health profile, consider adding 
                a bone density scan to your preventive care routine.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}