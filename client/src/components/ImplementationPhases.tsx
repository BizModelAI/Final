import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, DollarSign, Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { ImplementationPhase } from '../../shared/types';

interface ImplementationPhasesProps {
  businessPath: any;
  className?: string;
}

export const ImplementationPhases: React.FC<ImplementationPhasesProps> = ({ 
  businessPath, 
  className = '' 
}) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['phase1']));

  const togglePhase = (phaseKey: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseKey)) {
      newExpanded.delete(phaseKey);
    } else {
      newExpanded.add(phaseKey);
    }
    setExpandedPhases(newExpanded);
  };

  const getPhaseIcon = (phaseKey: string) => {
    switch (phaseKey) {
      case 'phase1':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'phase2':
        return <Target className="w-5 h-5 text-green-500" />;
      case 'phase3':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPhaseColor = (phaseKey: string) => {
    switch (phaseKey) {
      case 'phase1':
        return 'border-blue-200 bg-blue-50';
      case 'phase2':
        return 'border-green-200 bg-green-50';
      case 'phase3':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getPhaseTitle = (phaseKey: string) => {
    switch (phaseKey) {
      case 'phase1':
        return 'Phase 1: Foundation & Launch';
      case 'phase2':
        return 'Phase 2: Growth & Optimization';
      case 'phase3':
        return 'Phase 3: Scale & Expansion';
      default:
        return phaseKey;
    }
  };

  if (!businessPath?.actionPlan) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Implementation Phases</h3>
            <p className="text-sm text-gray-600">Follow this structured approach to build your business step by step</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Detailed implementation phases coming soon for this business model.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Implementation Phases</h3>
            <p className="text-sm text-gray-600">
              Follow this structured approach to build your {businessPath.name} business step by step
            </p>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="divide-y divide-gray-200">
        {Object.entries(businessPath.actionPlan).map(([phaseKey, phases]) => {
          const isExpanded = expandedPhases.has(phaseKey);
          const phaseData = phases as ImplementationPhase[];
          
          return (
            <div key={phaseKey} className={`${getPhaseColor(phaseKey)}`}>
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phaseKey)}
                className="w-full p-6 text-left hover:bg-opacity-80 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getPhaseIcon(phaseKey)}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {getPhaseTitle(phaseKey)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {phaseData.length} implementation stages
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Phase Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4">
                  {phaseData.map((phase, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Phase Title and Metrics */}
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 text-sm leading-tight">
                          {phase.title}
                        </h5>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{phase.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{phase.budget}</span>
                          </div>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="space-y-2 mb-3">
                        {phase.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>

                      {/* Success Metrics */}
                      <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-800">Success Metrics</span>
                        </div>
                        <p className="text-xs text-blue-700 leading-relaxed">
                          {phase.successMetrics}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Each phase builds upon the previous one for sustainable growth</span>
        </div>
      </div>
    </div>
  );
};

export default ImplementationPhases;
