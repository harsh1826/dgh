import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { name: 'Basic Information', description: 'Personal details' },
  { name: 'Medical History', description: 'Past conditions' },
  { name: 'Lifestyle Factors', description: 'Daily habits' },
  { name: 'Symptoms & Concerns', description: 'Current issues' },
];

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="card">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative flex-1">
              {stepIdx !== steps.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-neutral-200">
                  <motion.div
                    className="h-full bg-primary-600"
                    initial={{ width: '0%' }}
                    animate={{
                      width: currentStep > stepIdx + 1 ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
              
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    currentStep > stepIdx + 1
                      ? 'bg-primary-600 border-primary-600'
                      : currentStep === stepIdx + 1
                      ? 'border-primary-600 bg-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {currentStep > stepIdx + 1 ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-semibold ${
                        currentStep === stepIdx + 1
                          ? 'text-primary-600'
                          : 'text-neutral-500'
                      }`}
                    >
                      {stepIdx + 1}
                    </span>
                  )}
                </motion.div>
                
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= stepIdx + 1
                        ? 'text-neutral-900'
                        : 'text-neutral-500'
                    }`}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-neutral-500">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}