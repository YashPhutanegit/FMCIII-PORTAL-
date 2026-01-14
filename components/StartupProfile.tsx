
import React from 'react';
import { ApplicationStatus } from '../types';

interface StartupProfileProps {
  name: string;
  description: string;
  status: keyof typeof ApplicationStatus;
}

const StartupProfile: React.FC<StartupProfileProps> = ({ name, description, status }) => {
  const statusColors = {
    APPLIED: 'bg-yellow-100 text-yellow-800',
    INTERVIEW: 'bg-blue-100 text-blue-800',
    SELECTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-bold text-slate-900">{name}</h4>
          <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
           <img src={`https://picsum.photos/seed/${name}/48/48`} alt="Logo" />
        </div>
      </div>
      <p className="text-sm text-slate-600 line-clamp-2 mb-4">
        {description}
      </p>
      <div className="flex gap-2">
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wider">View Full Profile</button>
        <span className="text-slate-300">|</span>
        <button className="text-xs font-semibold text-slate-600 hover:text-slate-800 uppercase tracking-wider">Contact Founder</button>
      </div>
    </div>
  );
};

export default StartupProfile;
