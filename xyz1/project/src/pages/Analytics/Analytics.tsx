import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Heart,
  Activity,
  Brain,
  Target,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const healthTrendsData = [
  { month: 'Jan', healthScore: 78, riskScore: 32, activityLevel: 65, stressLevel: 45 },
  { month: 'Feb', healthScore: 82, riskScore: 28, activityLevel: 70, stressLevel: 40 },
  { month: 'Mar', healthScore: 85, riskScore: 25, activityLevel: 75, stressLevel: 35 },
  { month: 'Apr', healthScore: 83, riskScore: 27, activityLevel: 72, stressLevel: 38 },
  { month: 'May', healthScore: 87, riskScore: 23, activityLevel: 78, stressLevel: 32 },
  { month: 'Jun', healthScore: 89, riskScore: 21, activityLevel: 82, stressLevel: 30 },
];

const riskDistributionData = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Moderate Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
];

const healthMetricsData = [
  { metric: 'Cardiovascular', score: 85, fullMark: 100 },
  { metric: 'Metabolic', score: 78, fullMark: 100 },
  { metric: 'Mental Health', score: 82, fullMark: 100 },
  { metric: 'Nutrition', score: 75, fullMark: 100 },
  { metric: 'Physical Activity', score: 88, fullMark: 100 },
  { metric: 'Sleep Quality', score: 72, fullMark: 100 },
];

const aiInsightsData = [
  { category: 'Predictions Generated', count: 1284, change: '+8%', trend: 'up' },
  { category: 'Risk Assessments', count: 456, change: '+23%', trend: 'up' },
  { category: 'Health Improvements', count: 89, change: '+5%', trend: 'up' },
  { category: 'Preventive Actions', count: 234, change: '+12%', trend: 'up' },
];

export function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const timeframes = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
  ];

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'health', label: 'Health Score' },
    { value: 'risk', label: 'Risk Score' },
    { value: 'activity', label: 'Activity Level' },
    { value: 'stress', label: 'Stress Level' },
  ];

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
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold leading-7 text-neutral-900">
              Health Analytics & Insights
            </h1>
          </div>
          <p className="mt-2 text-lg text-neutral-600">
            CuraMind's advanced analytics and AI-powered health insights
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Customize View
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Time Period
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="input"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Focus Metric
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="input"
            >
              {metrics.map(metric => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {aiInsightsData.map((insight, index) => (
          <motion.div
            key={insight.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-neutral-900">
                {insight.count.toLocaleString()}
              </div>
              <div className={`flex items-center ${
                insight.trend === 'up' ? 'text-success-600' : 'text-error-600'
              }`}>
                {insight.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{insight.change}</span>
              </div>
            </div>
            <div className="text-sm text-neutral-600">{insight.category}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Health Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Health Trends Over Time
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
              <span>Health Score</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-healthcare-600 rounded-full mr-2"></div>
              <span>Activity Level</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent-600 rounded-full mr-2"></div>
              <span>Stress Level</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="healthScore"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="activityLevel"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="stressLevel"
                stroke="#ea580c"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">
            Risk Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Health Metrics Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">
            Health Metrics Overview
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={healthMetricsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-gradient-to-r from-primary-50 to-healthcare-50 border-primary-200"
      >
        <div className="flex items-center mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center mr-3">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">
            AI-Generated Health Insights
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <TrendingUp className="h-5 w-5 text-success-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Positive Trend Detected</h4>
                <p className="text-sm text-neutral-600">
                  Your overall health score has improved by 14% over the last 6 months, 
                  primarily driven by increased physical activity and better sleep patterns.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Target className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Optimization Opportunity</h4>
                <p className="text-sm text-neutral-600">
                  AI analysis suggests focusing on stress management could yield a 
                  15-20% improvement in your overall wellness score.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Heart className="h-5 w-5 text-healthcare-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Cardiovascular Health</h4>
                <p className="text-sm text-neutral-600">
                  Your cardiovascular metrics show excellent improvement. Continue 
                  current exercise routine for optimal heart health.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Activity className="h-5 w-5 text-accent-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Activity Patterns</h4>
                <p className="text-sm text-neutral-600">
                  Your activity levels peak on weekends. Consider spreading 
                  exercise more evenly throughout the week for better results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Analytics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">
          Detailed Health Metrics
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Current Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Previous Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Target
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {healthMetricsData.map((metric) => {
                const previousScore = metric.score - Math.floor(Math.random() * 10) + 2;
                const change = metric.score - previousScore;
                const target = 90;
                
                return (
                  <tr key={metric.metric}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {metric.metric}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {metric.score}/100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {previousScore}/100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className={`flex items-center ${
                        change >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {change >= 0 ? '+' : ''}{change}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {target}/100
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}