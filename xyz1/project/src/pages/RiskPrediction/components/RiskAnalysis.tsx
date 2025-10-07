import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Users } from 'lucide-react';

interface RiskAnalysisProps {
  model: string;
}

const riskData = [
  { category: 'Low Risk', count: 1247, percentage: 62 },
  { category: 'Moderate Risk', count: 543, percentage: 27 },
  { category: 'High Risk', count: 221, percentage: 11 },
];

const ageGroupData = [
  { age: '18-30', low: 45, moderate: 5, high: 2 },
  { age: '31-45', low: 38, moderate: 12, high: 3 },
  { age: '46-60', low: 25, moderate: 20, high: 8 },
  { age: '61-75', low: 15, moderate: 25, high: 15 },
  { age: '75+', low: 8, moderate: 18, high: 22 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export function RiskAnalysis({ model }: RiskAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Risk Distribution Analysis
            </h3>
            <p className="text-sm text-neutral-600">
              Current population risk assessment for {model} model
            </p>
          </div>
          <span className="badge bg-primary-100 text-primary-700">
            Live Data
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">
              Risk Level Distribution
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} patients`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            {riskData.map((risk, index) => (
              <motion.div
                key={risk.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{ borderColor: COLORS[index] + '40', backgroundColor: COLORS[index] + '10' }}
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div>
                    <p className="font-medium text-neutral-900">{risk.category}</p>
                    <p className="text-sm text-neutral-600">{risk.count} patients</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-neutral-900">{risk.percentage}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Age Group Analysis */}
      <div className="card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Risk by Age Group
          </h3>
          <p className="text-sm text-neutral-600">
            Age-stratified risk analysis showing demographic patterns
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageGroupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="age"
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
              <Bar dataKey="low" stackId="risk" fill="#10b981" name="Low Risk" />
              <Bar dataKey="moderate" stackId="risk" fill="#f59e0b" name="Moderate Risk" />
              <Bar dataKey="high" stackId="risk" fill="#ef4444" name="High Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card border-l-4 border-l-success-600">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-success-600 mr-4" />
            <div>
              <p className="text-2xl font-bold text-neutral-900">23%</p>
              <p className="text-sm text-neutral-600">Risk reduction this quarter</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-l-warning-600">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-warning-600 mr-4" />
            <div>
              <p className="text-2xl font-bold text-neutral-900">11%</p>
              <p className="text-sm text-neutral-600">High-risk patients</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-l-primary-600">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-600 mr-4" />
            <div>
              <p className="text-2xl font-bold text-neutral-900">2,011</p>
              <p className="text-sm text-neutral-600">Total patients analyzed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}