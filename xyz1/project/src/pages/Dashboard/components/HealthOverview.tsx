import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'Jan', riskScore: 65, predictions: 120, assessments: 98 },
  { month: 'Feb', riskScore: 59, predictions: 142, assessments: 112 },
  { month: 'Mar', riskScore: 58, predictions: 165, assessments: 128 },
  { month: 'Apr', riskScore: 52, predictions: 189, assessments: 145 },
  { month: 'May', riskScore: 48, predictions: 210, assessments: 167 },
  { month: 'Jun', riskScore: 45, predictions: 234, assessments: 189 },
];

export function HealthOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">
            Health Trends Overview
          </h3>
          <p className="text-sm text-neutral-600">
            AI-powered analytics showing population health improvements
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
            <span className="text-xs text-neutral-600">Average Risk Score</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-healthcare-600 rounded-full mr-2"></div>
            <span className="text-xs text-neutral-600">AI Predictions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-600 rounded-full mr-2"></div>
            <span className="text-xs text-neutral-600">Assessments</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="riskScore"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="predictions"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="assessments"
              stroke="#ea580c"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}