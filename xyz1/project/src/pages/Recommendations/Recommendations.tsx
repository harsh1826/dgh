import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Brain,
  Heart,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  ArrowRight,
} from 'lucide-react';

interface Recommendation {
  id: string;
  category: 'nutrition' | 'exercise' | 'lifestyle' | 'medical' | 'mental';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  aiConfidence: number;
  estimatedImpact: string;
  timeframe: string;
  actionSteps: string[];
  evidence: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    category: 'exercise',
    priority: 'high',
    title: 'Increase Cardiovascular Exercise',
    description: 'Based on your health profile, increasing aerobic activity could reduce cardiovascular risk by 23%',
    aiConfidence: 94,
    estimatedImpact: '23% risk reduction',
    timeframe: '3-6 months',
    actionSteps: [
      'Start with 20 minutes of brisk walking daily',
      'Gradually increase to 150 minutes per week',
      'Include 2 days of strength training',
      'Monitor heart rate during exercise'
    ],
    evidence: 'Based on American Heart Association guidelines and your current fitness level'
  },
  {
    id: '2',
    category: 'nutrition',
    priority: 'high',
    title: 'Mediterranean Diet Adoption',
    description: 'AI analysis suggests Mediterranean diet patterns could improve your metabolic health markers',
    aiConfidence: 89,
    estimatedImpact: '15% improvement',
    timeframe: '2-4 months',
    actionSteps: [
      'Increase omega-3 rich fish consumption',
      'Add 2 servings of nuts per week',
      'Replace refined grains with whole grains',
      'Increase olive oil usage'
    ],
    evidence: 'Supported by multiple clinical studies and your genetic markers'
  },
  {
    id: '3',
    category: 'medical',
    priority: 'medium',
    title: 'Preventive Screening Schedule',
    description: 'Update your preventive care schedule based on age and risk factors',
    aiConfidence: 96,
    estimatedImpact: 'Early detection',
    timeframe: 'Next 6 months',
    actionSteps: [
      'Schedule annual physical examination',
      'Update mammography screening',
      'Consider colonoscopy screening',
      'Review vaccination status'
    ],
    evidence: 'USPSTF guidelines and personalized risk assessment'
  },
  {
    id: '4',
    category: 'mental',
    priority: 'medium',
    title: 'Stress Management Program',
    description: 'Implement evidence-based stress reduction techniques to improve overall health',
    aiConfidence: 87,
    estimatedImpact: '12% stress reduction',
    timeframe: '4-8 weeks',
    actionSteps: [
      'Practice daily mindfulness meditation',
      'Establish regular sleep schedule',
      'Limit caffeine intake after 2 PM',
      'Consider yoga or tai chi classes'
    ],
    evidence: 'Cognitive behavioral therapy research and stress biomarker analysis'
  },
  {
    id: '5',
    category: 'lifestyle',
    priority: 'low',
    title: 'Sleep Quality Optimization',
    description: 'Improve sleep hygiene to enhance recovery and immune function',
    aiConfidence: 82,
    estimatedImpact: '18% better sleep',
    timeframe: '2-6 weeks',
    actionSteps: [
      'Maintain consistent bedtime routine',
      'Create optimal sleep environment',
      'Limit screen time before bed',
      'Consider sleep tracking device'
    ],
    evidence: 'Sleep medicine research and your reported sleep patterns'
  }
];

const categoryIcons = {
  nutrition: Heart,
  exercise: Activity,
  lifestyle: Clock,
  medical: Target,
  mental: Brain,
};

const categoryColors = {
  nutrition: 'healthcare',
  exercise: 'primary',
  lifestyle: 'accent',
  medical: 'error',
  mental: 'success',
};

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'success',
};

export function Recommendations() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredRecommendations = mockRecommendations.filter(rec => {
    const categoryMatch = selectedCategory === 'all' || rec.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || rec.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const categories = ['all', 'nutrition', 'exercise', 'lifestyle', 'medical', 'mental'];
  const priorities = ['all', 'high', 'medium', 'low'];

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
              <Target className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold leading-7 text-neutral-900">
              AI Health Recommendations
            </h1>
          </div>
          <p className="mt-2 text-lg text-neutral-600">
            CuraMind's personalized health insights powered by explainable AI
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Update Profile
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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="input"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="card text-center border-l-4 border-l-error-600">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecommendations.filter(r => r.priority === 'high').length}
          </div>
          <div className="text-sm text-neutral-600">High Priority</div>
        </div>
        <div className="card text-center border-l-4 border-l-warning-600">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecommendations.filter(r => r.priority === 'medium').length}
          </div>
          <div className="text-sm text-neutral-600">Medium Priority</div>
        </div>
        <div className="card text-center border-l-4 border-l-success-600">
          <div className="text-2xl font-bold text-neutral-900">
            {mockRecommendations.filter(r => r.priority === 'low').length}
          </div>
          <div className="text-sm text-neutral-600">Low Priority</div>
        </div>
        <div className="card text-center border-l-4 border-l-primary-600">
          <div className="text-2xl font-bold text-neutral-900">
            {Math.round(mockRecommendations.reduce((acc, r) => acc + r.aiConfidence, 0) / mockRecommendations.length)}%
          </div>
          <div className="text-sm text-neutral-600">Avg AI Confidence</div>
        </div>
      </motion.div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {filteredRecommendations.map((recommendation, index) => {
          const IconComponent = categoryIcons[recommendation.category];
          const categoryColor = categoryColors[recommendation.category];
          const priorityColor = priorityColors[recommendation.priority];

          return (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`h-12 w-12 rounded-lg bg-${categoryColor}-100 flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`h-6 w-6 text-${categoryColor}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {recommendation.title}
                      </h3>
                      <span className={`badge badge-${priorityColor}`}>
                        {recommendation.priority} priority
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-3">
                      {recommendation.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Brain className="h-4 w-4 mr-1" />
                        {recommendation.aiConfidence}% confidence
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {recommendation.estimatedImpact}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recommendation.timeframe}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(recommendation.aiConfidence / 20)
                            ? 'text-yellow-400 fill-current'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                    Action Steps
                  </h4>
                  <ul className="space-y-2">
                    {recommendation.actionSteps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                    Evidence Base
                  </h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    {recommendation.evidence}
                  </p>
                  <div className="flex space-x-3">
                    <button className="btn-primary text-sm">
                      Start Program
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                    <button className="btn-secondary text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <AlertTriangle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No recommendations found
          </h3>
          <p className="text-neutral-600">
            Try adjusting your filters to see more recommendations.
          </p>
        </motion.div>
      )}
    </div>
  );
}