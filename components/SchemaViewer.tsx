
import React from 'react';

const SchemaViewer: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-3">1. Database Schema (PostgreSQL)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="text-blue-400 font-mono text-sm mb-2">-- Core User Management</h4>
            <pre className="text-slate-300 text-xs font-mono">
{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role_enum NOT NULL, -- ADMIN, MENTOR, etc.
  profile_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID REFERENCES users(id),
  company_name TEXT NOT NULL,
  status application_status_enum DEFAULT 'APPLIED',
  logo_url TEXT,
  cap_table_url TEXT,
  legal_docs JSONB,
  kpi_metrics JSONB
);`}
            </pre>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="text-blue-400 font-mono text-sm mb-2">-- Scoring & Evaluation</h4>
            <pre className="text-slate-300 text-xs font-mono">
{`CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id),
  stage_id INTEGER NOT NULL,
  form_data JSONB,
  submitted_at TIMESTAMP
);

CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judge_id UUID REFERENCES users(id),
  application_id UUID REFERENCES applications(id),
  criteria_scores JSONB, -- { "traction": 5, "team": 4, ... }
  weighted_total DECIMAL(5,2),
  feedback TEXT
);`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-green-600 pl-3">2. Core API Endpoints (REST)</h3>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Endpoint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200 text-sm">
              <tr>
                <td className="px-6 py-4 font-mono text-blue-600 font-bold">POST</td>
                <td className="px-6 py-4 font-mono">/api/v1/apply</td>
                <td className="px-6 py-4">Submit multi-stage startup application.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono text-blue-600 font-bold">POST</td>
                <td className="px-6 py-4 font-mono">/api/v1/score</td>
                <td className="px-6 py-4">Submit judge evaluation scores for an applicant.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono text-blue-600 font-bold">PATCH</td>
                <td className="px-6 py-4 font-mono">/api/v1/status</td>
                <td className="px-6 py-4">Update funnel stage (Admin only - triggers onboarding logic).</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono text-blue-600 font-bold">GET</td>
                <td className="px-6 py-4 font-mono">/api/v1/admin/analytics</td>
                <td className="px-6 py-4">Aggregated data for funnel & startup performance.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-purple-600 pl-3">3. Onboarding Automation Logic</h3>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-slate-700 space-y-3">
          <p className="font-semibold">Workflow Definition:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Trigger:</strong> <code className="bg-purple-100 px-1 rounded">status_change('ACCEPTED')</code></li>
            <li><strong>Webhook:</strong> Call Email Service (Postmark/Sendgrid) to deliver the "Success Pack" & Digital Offer.</li>
            <li><strong>Verification:</strong> Upon Digital Signature event, system initializes <code className="bg-purple-100 px-1 rounded">startups.company_profile</code>.</li>
            <li><strong>Provisioning:</strong> Automatic creation of shared Drive folder & Slack invitation via API tokens.</li>
            <li><strong>Engagement:</strong> Inject "First Week Checklist" tasks into the founder's dashboard.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SchemaViewer;
