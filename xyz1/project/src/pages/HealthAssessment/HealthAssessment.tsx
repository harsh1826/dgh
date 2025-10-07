import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AssessmentForm } from './components/AssessmentForm';
import { AssessmentResults } from './components/AssessmentResults';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Heart, Brain, Activity } from 'lucide-react';

export function HealthAssessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;

  const handleStepComplete = (stepData: any) => {
    setAssessmentData(prev => ({ ...prev, ...stepData }));
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-healthcare-600 to-primary-600 flex items-center justify-center">
            <Heart className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Comprehensive Health Assessment
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          CuraMind's AI-powered health evaluation to identify risks and provide personalized recommendations
        </p>
      </motion.div>

      {!isComplete ? (
        <>
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </motion.div>

          {/* Assessment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AssessmentForm
              currentStep={currentStep}
              onStepComplete={handleStepComplete}
            />
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AssessmentResults data={assessmentData} />
        </motion.div>
      )}

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            AI-Powered Analysis
          </h3>
          <p className="text-sm text-neutral-600">
            Advanced machine learning algorithms analyze your health data for comprehensive insights
          </p>
        </div>

        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-healthcare-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-healthcare-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Personalized Results
          </h3>
          <p className="text-sm text-neutral-600">
            Tailored health recommendations based on your unique profile and medical history
          </p>
        </div>

        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mx-auto mb-4">
            <Activity className="h-6 w-6 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Real-time Monitoring
          </h3>
          <p className="text-sm text-neutral-600">
            Continuous health tracking with instant alerts for significant changes
          </p>
        </div>
      </motion.div>
    </div>
  );
}