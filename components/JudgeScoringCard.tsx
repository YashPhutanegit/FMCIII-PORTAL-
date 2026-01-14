
import React, { useState, useMemo } from 'react';
import { Score } from '../types';

interface JudgeScoringCardProps {
  startupName: string;
  onSave?: (scores: Score, total: number) => void;
}

const JudgeScoringCard: React.FC<JudgeScoringCardProps> = ({ startupName, onSave }) => {
  const [scores, setScores] = useState<Score>({
    problemFit: 3,
    marketOpportunity: 3,
    teamStrength: 3,
    traction: 3,
    scalability: 3
  });

  const WEIGHTS = {
    problemFit: 2, // (Problem Fit * 2)
    marketOpportunity: 1,
    teamStrength: 1,
    traction: 1,
    scalability: 1
  };

  const weightedTotal = useMemo(() => {
    return (
      scores.problemFit * WEIGHTS.problemFit +
      scores.marketOpportunity * WEIGHTS.marketOpportunity +
      scores.teamStrength * WEIGHTS.teamStrength +
      scores.traction * WEIGHTS.traction +
      scores.scalability * WEIGHTS.scalability
    );
  }, [scores]);

  const maxPossible = (5 * WEIGHTS.problemFit) + (5 * 4); // Max 30

  const handleScoreChange = (criteria: keyof Score, value: number) => {
    setScores(prev => ({ ...prev, [criteria]: value }));
  };

  const criteriaLabels: Record<keyof Score, { title: string, desc: string }> = {
    problemFit: { title: 'Problem/Solution Fit', desc: 'How well does the product solve a documented pain point?' },
    marketOpportunity: { title: 'Market Opportunity', desc: 'Total Addressable Market (TAM) and growth potential.' },
    teamStrength: { title: 'Team Strength', desc: 'Technical capability, domain expertise, and execution history.' },
    traction: { title: 'Traction', desc: 'Current revenue, user growth, or prototype status.' },
    scalability: { title: 'Scalability', desc: 'Can this business grow without a linear increase in costs?' }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-6 text-white">
        <h3 className="text-xl font-bold">{startupName}</h3>
        <p className="text-slate-400 text-sm">Selection Evaluation Scorecard</p>
      </div>
      
      <div className="p-6 space-y-6">
        {(Object.keys(criteriaLabels) as Array<keyof Score>).map((key) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="font-semibold text-slate-800">
                {criteriaLabels[key].title} {WEIGHTS[key] > 1 && <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1">x{WEIGHTS[key]} Weight</span>}
              </label>
              <span className="text-lg font-bold text-blue-600">{scores[key]}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-2">
              {criteriaLabels[key].desc}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleScoreChange(key, num)}
                  className={`flex-1 py-2 rounded-md font-medium transition-all ${
                    scores[key] === num 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Weighted Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{weightedTotal}</span>
              <span className="text-slate-400 font-medium">/ {maxPossible}</span>
            </div>
          </div>
          <button 
            onClick={() => onSave?.(scores, weightedTotal)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-md"
          >
            Submit Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default JudgeScoringCard;
