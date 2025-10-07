import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  User,
  Heart,
  Activity,
  Pill,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  date: string;
  type: 'visit' | 'test' | 'medication' | 'procedure' | 'emergency';
  title: string;
  provider: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
  attachments?: number;
  aiInsights?: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'visit',
    title: 'Annual Physical Examination',
    provider: 'Dr. Sarah Johnson, MD',
    description: 'Comprehensive annual health checkup including vital signs, blood work, and preventive screenings.',
    status: 'completed',
    attachments: 3,
    aiInsights: 'Blood pressure trending upward - recommend lifestyle modifications'
  },
  {
    id: '2',
    date: '2024-01-10',
    type: 'test',
    title: 'Comprehensive Metabolic Panel',
    provider: 'LabCorp',
    description: 'Blood chemistry analysis including glucose, electrolytes, kidney and liver function tests.',
    status: 'completed',
    attachments: 1,
    aiInsights: 'Cholesterol levels elevated - dietary intervention recommended'
  },
  {
    id: '3',
    date: '2024-01-05',
    type: 'medication',
    title: 'Lisinopril 10mg',
    provider: 'Dr. Sarah Johnson, MD',
    description: 'ACE inhibitor prescribed for blood pressure management. Take once daily in the morning.',
    status: 'completed',
    attachments: 0,
    aiInsights: 'Medication adherence good - blood pressure responding well'
  },
  {
    id: '4',
    date: '2023-12-20',
    type: 'procedure',
    title: 'Mammography Screening',
    provider: 'Radiology Associates',
    description: 'Annual breast cancer screening examination with digital mammography.',
    status: 'completed',
    attachments: 2,
    aiInsights: 'Results normal - continue annual screening schedule'
  },
  {
    id: '5',
    date: '2023-12-15',
    type: 'emergency',
    title: 'Emergency Room Visit',
    provider: 'City General Hospital',
    description: 'Chest pain evaluation - ruled out cardiac event. Diagnosed with anxiety-related symptoms.',
    status: 'completed',
    attachments: 4,
    aiInsights: 'Stress management program recommended based on this episode'
  }
];

const typeIcons = {
  visit: User,
  test: Activity,
  medication: Pill,
  procedure: Heart,
  emergency: AlertTriangle,
};

const typeColors = {
  visit: 'primary',
  test: 'healthcare',
  medication: 'accent',
  procedure: 'success',
  emergency: 'error',
};

const statusColors = {
  completed: 'success',
  pending: 'warning',
  cancelled: 'error',
};

export function MedicalHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || record.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const types = ['all', 'visit', 'test', 'medication', 'procedure', 'emergency'];
  const statuses = ['all', 'completed', 'pending', 'cancelled'];

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
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold leading-7 text-neutral-900">
              Medical History
            </h1>
          </div>
          <p className="mt-2 text-lg text-neutral-600">
            CuraMind's comprehensive health records with AI-powered insights
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </motion.button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Search Records
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by title, provider, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Type
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
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Records Timeline */}
      <div className="space-y-6">
        {filteredRecords.map((record, index) => {
          const IconComponent = typeIcons[record.type];
          const typeColor = typeColors[record.type];
          const statusColor = statusColors[record.status];

          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`h-12 w-12 rounded-lg bg-${typeColor}-100 flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`h-6 w-6 text-${typeColor}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {record.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {record.provider}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`badge badge-${statusColor}`}>
                        {record.status}
                      </span>
                      <div className="flex items-center text-sm text-neutral-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-neutral-700 mb-4">
                    {record.description}
                  </p>

                  {record.aiInsights && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary-600 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-white">AI</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-primary-900 mb-1">
                            AI Health Insight
                          </h4>
                          <p className="text-sm text-primary-800">
                            {record.aiInsights}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      {record.attachments && record.attachments > 0 && (
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {record.attachments} attachment{record.attachments > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View Details
                      </button>
                      <button className="text-sm text-neutral-600 hover:text-neutral-700 font-medium">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No records found
          </h3>
          <p className="text-neutral-600">
            Try adjusting your search terms or filters to find specific records.
          </p>
        </motion.div>
      )}

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="card text-center">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecords.length}
          </div>
          <div className="text-sm text-neutral-600">Total Records</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecords.filter(r => r.type === 'visit').length}
          </div>
          <div className="text-sm text-neutral-600">Doctor Visits</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecords.filter(r => r.type === 'test').length}
          </div>
          <div className="text-sm text-neutral-600">Lab Tests</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecords.filter(r => r.aiInsights).length}
          </div>
          <div className="text-sm text-neutral-600">AI Insights</div>
        </div>
      </motion.div>
    </div>
  );
}