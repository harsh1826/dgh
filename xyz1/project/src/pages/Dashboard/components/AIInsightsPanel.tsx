import React from 'react';
import { motion } from 'framer-motion';
import { Brain, RefreshCw } from 'lucide-react';
import { AIInsightCard } from '../../../components/common/AIInsightCard';
import { useAIInsights } from '../../../hooks/useAIInsights';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export function AIInsightsPanel() {
  const { insights, loading, refreshInsights } = useAIInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-600 to-healthcare-600 flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">AI Health Insights</h3>
            <p className="text-sm text-neutral-600">Personalized recommendations powered by AI</p>
          </div>
        </div>
        <button
          onClick={refreshInsights}
          className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <LoadingSpinner className="py-8" />
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AIInsightCard
                title={insight.title}
                description={insight.description}
                confidence={insight.confidence}
                type={insight.type}
                actionText={insight.actionable ? "Learn More" : undefined}
                onAction={insight.actionable ? () => console.log('Action clicked') : undefined}
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <button className="w-full text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          View All AI Insights →
        </button>
      </div>
    </motion.div>
  );
}