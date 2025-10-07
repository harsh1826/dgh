import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { HealthAssessment } from './pages/HealthAssessment/HealthAssessment';
import { RiskPrediction } from './pages/RiskPrediction/RiskPrediction';
import { Recommendations } from './pages/Recommendations/Recommendations';
import { MedicalHistory } from './pages/MedicalHistory/MedicalHistory';
import { SymptomChecker } from './pages/SymptomChecker/SymptomChecker';
import { PreventiveCare } from './pages/PreventiveCare/PreventiveCare';
import { Analytics } from './pages/Analytics/Analytics';
import { HealthChatbot } from './pages/HealthChatbot/HealthChatbot';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assessment" element={<HealthAssessment />} />
        <Route path="/risk-prediction" element={<RiskPrediction />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/preventive-care" element={<PreventiveCare />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/health-chatbot" element={<HealthChatbot />} />
      </Routes>
    </Layout>
  );
}

export default App;