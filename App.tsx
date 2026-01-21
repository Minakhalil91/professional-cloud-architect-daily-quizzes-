
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import CaseStudyViewer from './components/CaseStudyViewer';
import { generatePCAQuestion } from './geminiService';
import { PCAQuestion, UserProgress } from './types';
import { CASE_STUDIES } from './constants';

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<PCAQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<UserProgress>({
    totalAttempted: 0,
    totalCorrect: 0,
    streak: 0,
    lastSolvedDate: null
  });
  const [activeTab, setActiveTab] = useState<'daily' | 'reference' | 'bot'>('daily');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string>('');

  const fetchNewQuestion = async () => {
    setIsLoading(true);
    try {
      const q = await generatePCAQuestion(selectedCaseStudy || undefined);
      setCurrentQuestion(q);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (correct: boolean) => {
    setProgress(prev => ({
      ...prev,
      totalAttempted: prev.totalAttempted + 1,
      totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
      streak: correct ? prev.streak + 1 : 0,
      lastSolvedDate: new Date().toISOString()
    }));
  };

  const getCopyText = () => {
    if (!currentQuestion) return "";
    return `📢 *Daily PCA Challenge* 📢\n\n*Topic:* ${currentQuestion.topic}\n*Case Study:* ${currentQuestion.caseStudy || "None"}\n\n*Scenario:* ${currentQuestion.scenario}\n\n*Options:*\n${currentQuestion.options.map(o => `${o.id.toUpperCase()}. ${o.text}`).join('\n')}\n\nReply with your answer and rationale! Explanation will be posted in 2 hours. 🚀`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCopyText());
    alert("Message copied! You can now paste it into your Google Chat space.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-center">
                  <p className="text-xs text-blue-600 font-bold">Accuracy</p>
                  <p className="text-xl font-black text-blue-800">
                    {progress.totalAttempted > 0 
                      ? Math.round((progress.totalCorrect / progress.totalAttempted) * 100) 
                      : 0}%
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded-xl text-center">
                  <p className="text-xs text-orange-600 font-bold">Streak</p>
                  <p className="text-xl font-black text-orange-800">{progress.streak}🔥</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('daily')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'daily' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
              >
                <i className="fas fa-calendar-day"></i>
                <span className="font-bold">Daily Challenge</span>
              </button>
              <button 
                onClick={() => setActiveTab('bot')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bot' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
              >
                <i className="fas fa-robot"></i>
                <span className="font-bold">Bot Exporter</span>
              </button>
              <button 
                onClick={() => setActiveTab('reference')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'reference' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
              >
                <i className="fas fa-book-open"></i>
                <span className="font-bold">Case Studies</span>
              </button>
            </nav>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <h3 className="font-bold mb-2">Google Chat Integration</h3>
              <p className="text-sm opacity-90 mb-4 leading-relaxed">
                Use the "Bot Exporter" tab to generate and copy messages formatted specifically for your team's Google Chat spaces.
              </p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors">
                Setup Guide
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {activeTab === 'daily' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-gray-800">Professional Cloud Architect</h2>
                    <p className="text-gray-500">Practice for your certification with daily curated scenarios.</p>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={selectedCaseStudy}
                      onChange={(e) => setSelectedCaseStudy(e.target.value)}
                      className="bg-white border border-gray-200 text-sm font-medium rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Random Focus</option>
                      {CASE_STUDIES.map(cs => <option key={cs.name} value={cs.name}>{cs.name}</option>)}
                    </select>
                    <button 
                      onClick={fetchNewQuestion}
                      disabled={isLoading}
                      className="bg-gray-800 text-white px-5 py-2 rounded-xl font-bold hover:bg-black disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                      {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sync"></i>}
                      Generate New
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold text-gray-500 animate-pulse">Architecting a new challenge...</p>
                  </div>
                ) : currentQuestion ? (
                  <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                    <p className="text-gray-500">No question loaded. Click "Generate New".</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bot' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-black text-gray-800 mb-2">Message Exporter</h2>
                  <p className="text-gray-500 mb-8">Format the current challenge for posting to Google Chat, Slack, or Discord.</p>
                  
                  <div className="bg-gray-900 rounded-xl p-6 relative group">
                    <button 
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                    >
                      <i className="fas fa-copy"></i>
                      Copy Message
                    </button>
                    <div className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                      {getCopyText()}
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <i className="fas fa-lightbulb text-yellow-600"></i>
                      </div>
                      <h4 className="font-bold text-yellow-900">Pro Tip for Google Chat</h4>
                    </div>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      To make this even better, you can set up a simple Apps Script or Cloud Function triggered daily that calls this generator and posts the result via a Webhook URL to your Chat space. This dashboard helps you test those scenarios manually first.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reference' && (
              <div className="animate-fadeIn">
                <CaseStudyViewer />
              </div>
            )}

          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
