'use client';

import { useState } from 'react';
import axios from 'axios';

interface AnalysisResult {
  gender_split: { male: number; female: number };
  age_distribution: { '18-24': number; '25-34': number; '35+': number };
  account_types: { private: number; public: number };
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [jobId, setJobId] = useState('');
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://instagram-api.teabag.online';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Start analysis
      const response = await axios.post(`${apiUrl}/api/v1/accounts`, {
        username: username.trim()
      });
      
      setJobId(response.data.job_id);
      
      // Wait a bit then get results
      setTimeout(async () => {
        try {
          const demographicsResponse = await axios.get(`${apiUrl}/api/v1/accounts/${username}/demographics`);
          setResults(demographicsResponse.data);
        } catch (err) {
          setError('Error fetching analysis results. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 3000);
      
    } catch (err) {
      setError('Error starting analysis. Please check the username and try again.');
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Instagram Audience Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Analyze Instagram account demographics with AI-powered insights
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Instagram username (without @)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                Analyzing @{username}... This may take a few minutes.
              </div>
            </div>
          )}
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Analysis Results for @{username}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Gender Distribution */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Gender Split</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Male:</span>
                    <span className="font-semibold">{results.gender_split.male}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Female:</span>
                    <span className="font-semibold">{results.gender_split.female}%</span>
                  </div>
                </div>
              </div>

              {/* Age Distribution */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Age Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>18-24:</span>
                    <span className="font-semibold">{results.age_distribution['18-24']}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25-34:</span>
                    <span className="font-semibold">{results.age_distribution['25-34']}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>35+:</span>
                    <span className="font-semibold">{results.age_distribution['35+']}%</span>
                  </div>
                </div>
              </div>

              {/* Account Types */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Types</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Private:</span>
                    <span className="font-semibold">{results.account_types.private}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Public:</span>
                    <span className="font-semibold">{results.account_types.public}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}