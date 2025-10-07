import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, Droplets } from 'lucide-react';
import { HealthMetricCard } from '../../../components/common/HealthMetricCard';
import { useHealthData } from '../../../hooks/useHealthData';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export function HealthMetrics() {
  const { healthData, loading } = useHealthData();

  if (loading) {
    return (
      <div className="card">
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="card">
        <p className="text-center text-neutral-500 py-8">Unable to load health metrics</p>
      </div>
    );
  }

  const { metrics } = healthData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Vital Signs</h2>
        <span className="text-sm text-neutral-500">
          Last updated: {metrics.lastUpdated.toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthMetricCard
          title="Heart Rate"
          value={metrics.heartRate}
          unit="bpm"
          trend={metrics.heartRate > 80 ? 'up' : metrics.heartRate < 60 ? 'down' : 'stable'}
          status={metrics.heartRate > 100 ? 'poor' : metrics.heartRate > 80 ? 'fair' : 'good'}
          icon={<Heart className="h-4 w-4" />}
        />

        <HealthMetricCard
          title="Blood Pressure"
          value={`${metrics.bloodPressure.systolic}/${metrics.bloodPressure.diastolic}`}
          unit="mmHg"
          trend={metrics.bloodPressure.systolic > 130 ? 'up' : 'stable'}
          status={
            metrics.bloodPressure.systolic > 140 ? 'poor' :
            metrics.bloodPressure.systolic > 130 ? 'fair' : 'good'
          }
          icon={<Activity className="h-4 w-4" />}
        />

        <HealthMetricCard
          title="Temperature"
          value={metrics.temperature.toFixed(1)}
          unit="°F"
          trend={metrics.temperature > 99 ? 'up' : metrics.temperature < 97 ? 'down' : 'stable'}
          status={
            metrics.temperature > 100.4 || metrics.temperature < 96 ? 'poor' :
            metrics.temperature > 99 || metrics.temperature < 97 ? 'fair' : 'good'
          }
          icon={<Thermometer className="h-4 w-4" />}
        />

        <HealthMetricCard
          title="Oxygen Saturation"
          value={metrics.oxygenSaturation}
          unit="%"
          trend={metrics.oxygenSaturation < 95 ? 'down' : 'stable'}
          status={
            metrics.oxygenSaturation < 90 ? 'poor' :
            metrics.oxygenSaturation < 95 ? 'fair' : 'good'
          }
          icon={<Droplets className="h-4 w-4" />}
        />
      </div>
    </motion.div>
  );
}