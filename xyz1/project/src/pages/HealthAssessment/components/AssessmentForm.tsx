import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface AssessmentFormProps {
  currentStep: number;
  onStepComplete: (data: any) => void;
}

export function AssessmentForm({ currentStep, onStepComplete }: AssessmentFormProps) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onStepComplete(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter your age"
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Gender
                </label>
                <select
                  className="input"
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter your height"
                  onChange={(e) => handleInputChange('height', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter your weight"
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Medical History
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Chronic Conditions
                </label>
                <div className="space-y-2">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis'].map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        onChange={(e) => {
                          const current = formData.conditions || [];
                          if (e.target.checked) {
                            handleInputChange('conditions', [...current, condition]);
                          } else {
                            handleInputChange('conditions', current.filter(c => c !== condition));
                          }
                        }}
                      />
                      <span className="ml-2 text-sm text-neutral-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Family History
                </label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Describe any relevant family medical history..."
                  onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Lifestyle Factors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Exercise Frequency
                </label>
                <select
                  className="input"
                  onChange={(e) => handleInputChange('exercise', e.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="never">Never</option>
                  <option value="rarely">Rarely (1-2 times/month)</option>
                  <option value="sometimes">Sometimes (1-2 times/week)</option>
                  <option value="often">Often (3-4 times/week)</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Smoking Status
                </label>
                <select
                  className="input"
                  onChange={(e) => handleInputChange('smoking', e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Alcohol Consumption
                </label>
                <select
                  className="input"
                  onChange={(e) => handleInputChange('alcohol', e.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Sleep Hours per Night
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Average hours"
                  min="0"
                  max="24"
                  onChange={(e) => handleInputChange('sleep', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Current Symptoms & Concerns
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Current Symptoms
                </label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Describe any current symptoms or health concerns..."
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Pain Level (0-10)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  className="w-full"
                  onChange={(e) => handleInputChange('painLevel', e.target.value)}
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>No pain</span>
                  <span>Severe pain</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Stress Level (0-10)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  className="w-full"
                  onChange={(e) => handleInputChange('stressLevel', e.target.value)}
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>No stress</span>
                  <span>Very stressed</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="card"
    >
      {renderStep()}
      
      <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
        <button
          className="btn-secondary flex items-center"
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          className="btn-primary flex items-center"
        >
          {currentStep === 4 ? 'Complete Assessment' : 'Next Step'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
}