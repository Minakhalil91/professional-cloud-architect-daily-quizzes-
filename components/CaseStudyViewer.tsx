
import React from 'react';
import { CASE_STUDIES } from '../constants';

const CaseStudyViewer: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Exam Case Studies Reference</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CASE_STUDIES.map((study) => (
          <div key={study.name} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-blue-600 text-lg mb-2">{study.name}</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{study.overview}</p>
            
            <div className="mb-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Business Goals</h4>
              <ul className="text-xs text-gray-700 list-disc list-inside">
                {study.businessGoals.slice(0, 2).map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Technical Needs</h4>
              <ul className="text-xs text-gray-700 list-disc list-inside">
                {study.technicalRequirements.slice(0, 2).map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyViewer;
