import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Search,
  AlertTriangle,
  CheckCircle,
  Brain,
  Clock,
  TrendingUp,
  Phone,
  MapPin,
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  bodyPart: string;
}

interface Assessment {
  condition: string;
  probability: number;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  recommendations: string[];
  whenToSeekCare: string;
}

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
  'Chest pain', 'Shortness of breath', 'Abdominal pain', 'Back pain',
  'Joint pain', 'Skin rash', 'Sore throat', 'Runny nose'
];

const mockAssessments: Assessment[] = [
  {
    condition: 'Tension Headache',
    probability: 78,
    urgency: 'low',
    description: 'Most likely cause based on your symptoms. Tension headaches are common and usually not serious.',
    recommendations: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compress to head',
      'Stay hydrated',
      'Consider over-the-counter pain relief'
    ],
    whenToSeekCare: 'If headache persists for more than 3 days or worsens significantly'
  },
  {
    condition: 'Migraine',
    probability: 65,
    urgency: 'medium',
    description: 'Possible migraine episode based on symptom pattern and severity.',
    recommendations: [
      'Rest in a dark, quiet environment',
      'Avoid known triggers',
      'Consider prescribed migraine medication',
      'Track symptoms in a diary'
    ],
    whenToSeekCare: 'If this is your first severe headache or if symptoms are unusual for you'
  },
  {
    condition: 'Sinus Headache',
    probability: 45,
    urgency: 'low',
    description: 'Less likely but possible, especially if you have nasal congestion or recent cold symptoms.',
    recommendations: [
      'Use saline nasal rinse',
      'Apply warm compress to face',
      'Stay hydrated',
      'Consider decongestants if appropriate'
    ],
    whenToSeekCare: 'If symptoms persist beyond 10 days or worsen'
  }
];

const urgencyColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
  emergency: 'error',
};

const urgencyIcons = {
  low: CheckCircle,
  medium: Clock,
  high: AlertTriangle,
  emergency: AlertTriangle,
};

export function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSymptom = (symptomName: string) => {
    if (!selectedSymptoms.find(s => s.name === symptomName)) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        name: symptomName,
        severity: 'mild',
        duration: '1-2 days',
        bodyPart: 'head'
      };
      setSelectedSymptoms([...selectedSymptoms, newSymptom]);
      setSearchTerm('');
    }
  };

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const updateSymptom = (id: string, field: keyof Symptom, value: string) => {
    setSelectedSymptoms(selectedSymptoms.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleAnalyze = () => {
    setShowResults(true);
    setCurrentStep(3);
  };

  const renderSymptomInput = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          What symptoms are you experiencing?
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Search symptoms
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Type a symptom (e.g., headache, fever, cough)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          {searchTerm && (
            <div className="mt-2 max-h-40 overflow-y-auto border border-neutral-200 rounded-lg">
              {filteredSymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => addSymptom(symptom)}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-sm"
                >
                  {symptom}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {commonSymptoms.slice(0, 8).map(symptom => (
            <button
              key={symptom}
              onClick={() => addSymptom(symptom)}
              className="btn-secondary text-sm"
              disabled={selectedSymptoms.find(s => s.name === symptom) !== undefined}
            >
              {symptom}
            </button>
          ))}
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-neutral-900">
              Selected Symptoms ({selectedSymptoms.length})
            </h4>
            {selectedSymptoms.map(symptom => (
              <div key={symptom.id} className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-neutral-900">{symptom.name}</h5>
                  <button
                    onClick={() => removeSymptom(symptom.id)}
                    className="text-error-600 hover:text-error-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Severity
                    </label>
                    <select
                      value={symptom.severity}
                      onChange={(e) => updateSymptom(symptom.id, 'severity', e.target.value)}
                      className="input text-sm"
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Duration
                    </label>
                    <select
                      value={symptom.duration}
                      onChange={(e) => updateSymptom(symptom.id, 'duration', e.target.value)}
                      className="input text-sm"
                    >
                      <option value="less than 1 day">Less than 1 day</option>
                      <option value="1-2 days">1-2 days</option>
                      <option value="3-7 days">3-7 days</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="more than 2 weeks">More than 2 weeks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Body Part
                    </label>
                    <select
                      value={symptom.bodyPart}
                      onChange={(e) => updateSymptom(symptom.id, 'bodyPart', e.target.value)}
                      className="input text-sm"
                    >
                      <option value="head">Head</option>
                      <option value="chest">Chest</option>
                      <option value="abdomen">Abdomen</option>
                      <option value="back">Back</option>
                      <option value="arms">Arms</option>
                      <option value="legs">Legs</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedSymptoms.length > 0 && (
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <button
              onClick={handleAnalyze}
              className="btn-primary w-full"
            >
              Analyze Symptoms with AI
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Disclaimer */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-warning-800">
              Important Medical Disclaimer
            </h3>
            <p className="text-sm text-warning-700 mt-1">
              This AI assessment is for informational purposes only and should not replace professional medical advice. 
              Always consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>

      {/* AI Analysis Results */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
            <Brain className="h-4 w-4 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">
            AI Symptom Analysis
          </h3>
        </div>

        <div className="space-y-4">
          {mockAssessments.map((assessment, index) => {
            const UrgencyIcon = urgencyIcons[assessment.urgency];
            const urgencyColor = urgencyColors[assessment.urgency];

            return (
              <motion.div
                key={assessment.condition}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 border-${urgencyColor}-200 bg-${urgencyColor}-50 rounded-lg p-4`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <UrgencyIcon className={`h-5 w-5 text-${urgencyColor}-600 mr-2`} />
                    <h4 className="text-lg font-semibold text-neutral-900">
                      {assessment.condition}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neutral-900">
                      {assessment.probability}%
                    </div>
                    <div className="text-xs text-neutral-600">probability</div>
                  </div>
                </div>

                <p className="text-neutral-700 mb-4">
                  {assessment.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-semibold text-neutral-900 mb-2">
                      Recommended Actions
                    </h5>
                    <ul className="space-y-1">
                      {assessment.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start text-sm">
                          <CheckCircle className="h-3 w-3 text-success-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-neutral-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-neutral-900 mb-2">
                      When to Seek Care
                    </h5>
                    <p className="text-sm text-neutral-700">
                      {assessment.whenToSeekCare}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card border-l-4 border-l-error-600">
          <div className="flex items-center mb-3">
            <Phone className="h-5 w-5 text-error-600 mr-2" />
            <h4 className="text-lg font-semibold text-neutral-900">
              Emergency Contact
            </h4>
          </div>
          <p className="text-neutral-600 mb-4">
            If you're experiencing a medical emergency, call 911 immediately.
          </p>
          <button className="btn-primary bg-error-600 hover:bg-error-700 w-full">
            Call 911
          </button>
        </div>

        <div className="card border-l-4 border-l-primary-600">
          <div className="flex items-center mb-3">
            <MapPin className="h-5 w-5 text-primary-600 mr-2" />
            <h4 className="text-lg font-semibold text-neutral-900">
              Find Care Nearby
            </h4>
          </div>
          <p className="text-neutral-600 mb-4">
            Locate urgent care centers and hospitals in your area.
          </p>
          <button className="btn-primary w-full">
            Find Providers
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">
          Recommended Next Steps
        </h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center mr-3">
              1
            </div>
            <span className="text-neutral-700">Monitor your symptoms and track any changes</span>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center mr-3">
              2
            </div>
            <span className="text-neutral-700">Follow the recommended self-care measures</span>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center mr-3">
              3
            </div>
            <span className="text-neutral-700">Schedule an appointment if symptoms persist or worsen</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold leading-7 text-neutral-900">
              AI Symptom Checker
            </h1>
          </div>
          <p className="mt-2 text-lg text-neutral-600">
            Get preliminary health insights powered by CuraMind's medical AI
          </p>
        </div>
        {showResults && (
          <div className="mt-4 md:ml-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowResults(false);
                setCurrentStep(1);
                setSelectedSymptoms([]);
              }}
              className="btn-secondary"
            >
              Start New Assessment
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Progress Indicator */}
      {!showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                1
              </div>
              <span className={currentStep >= 1 ? 'text-neutral-900 font-medium' : 'text-neutral-600'}>
                Describe Symptoms
              </span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-neutral-200 rounded">
              <div 
                className="h-1 bg-primary-600 rounded transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                2
              </div>
              <span className={currentStep >= 2 ? 'text-neutral-900 font-medium' : 'text-neutral-600'}>
                AI Analysis
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      {!showResults ? renderSymptomInput() : renderResults()}

      {/* Features */}
      {!showResults && (
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
              Advanced natural language processing analyzes your symptoms using medical knowledge
            </p>
          </div>

          <div className="card text-center">
            <div className="h-12 w-12 rounded-lg bg-healthcare-100 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-healthcare-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Evidence-Based Results
            </h3>
            <p className="text-sm text-neutral-600">
              Recommendations based on clinical guidelines and medical literature
            </p>
          </div>

          <div className="card text-center">
            <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Actionable Guidance
            </h3>
            <p className="text-sm text-neutral-600">
              Clear next steps and recommendations for your health concerns
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}