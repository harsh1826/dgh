import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Activity,
  Brain,
  Target,
  Heart,
  FileText,
  Stethoscope,
  Calendar,
  BarChart3,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Activity, current: true },
  { name: 'Health Assessment', href: '/assessment', icon: Heart },
  { name: 'Risk Prediction', href: '/risk-prediction', icon: Brain },
  { name: 'Recommendations', href: '/recommendations', icon: Target },
  { name: 'Medical History', href: '/medical-history', icon: FileText },
  { name: 'Symptom Checker', href: '/symptom-checker', icon: Stethoscope },
  { name: 'Preventive Care', href: '/preventive-care', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Health Chatbot', href: '/health-chatbot', icon: Brain },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="fixed inset-0 bg-neutral-600/75" onClick={onClose} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-neutral-200">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-600 to-healthcare-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">CuraMind</span>
            </div>
            <button
              type="button"
              className="lg:hidden -m-2.5 p-2.5 text-neutral-700 hover:text-neutral-900"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-50 to-healthcare-50 text-primary-700 border-l-4 border-primary-600'
                              : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon
                              className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                                isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-600'
                              }`}
                            />
                            {item.name}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li className="mt-auto">
                <div className="card bg-gradient-to-r from-primary-50 to-healthcare-50 border border-primary-200">
                  <div className="flex items-center gap-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary-600 to-healthcare-600 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">AI Insights</p>
                      <p className="text-xs text-neutral-600">Real-time health analytics</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}