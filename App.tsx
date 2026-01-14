
import React, { useState } from 'react';
import { UserRole } from './types';
import JudgeScoringCard from './components/JudgeScoringCard';
import StartupProfile from './components/StartupProfile';
import SchemaViewer from './components/SchemaViewer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scoring' | 'schema'>('dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800">FMCIII Portal</h1>
          </div>
          <nav className="flex gap-4">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Startup Profiles
            </button>
            <button 
              onClick={() => setActiveTab('scoring')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'scoring' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Scoring Engine
            </button>
            <button 
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'schema' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}
            >
              System Arch
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-500 uppercase">Administrator</p>
              <p className="text-sm font-medium text-slate-800">Sarah Jenkins</p>
            </div>
            <img src="https://picsum.photos/seed/sarah/40/40" className="w-10 h-10 rounded-full border border-slate-200" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Startup Portfolio</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-shadow shadow-sm">
                Add New Startup
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StartupProfile 
                name="EcoTech AI" 
                description="Harnessing machine learning for optimizing renewable energy distribution in smart cities."
                status="SELECTED"
              />
              <StartupProfile 
                name="QuickSaaS" 
                description="Instant micro-service deployments for early-stage fintech ventures."
                status="INTERVIEW"
              />
            </div>
          </div>
        )}

        {activeTab === 'scoring' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Evaluation Scorecard</h2>
              <p className="text-slate-500 mt-1">Grade the current applicant based on core performance indicators.</p>
            </div>
            <JudgeScoringCard 
              startupName="EcoTech AI"
              onSave={(scores, total) => console.log('Saved scores:', scores, 'Total:', total)}
            />
          </div>
        )}

        {activeTab === 'schema' && <SchemaViewer />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; 2024 FMCIII Portal - Incubator Management System.
        </div>
      </footer>
    </div>
  );
}

export default App;
