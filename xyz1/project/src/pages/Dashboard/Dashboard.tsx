import React from 'react';
import { HealthMetrics } from './components/HealthMetrics';
import { HealthOverview } from './components/HealthOverview';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { QuickActions } from './components/QuickActions';
import { RecentActivity } from './components/RecentActivity';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome to CuraMind - Your AI-powered health companion
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <HealthOverview />
          <HealthMetrics />
          <RecentActivity />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AIInsightsPanel />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;