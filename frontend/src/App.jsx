import { useState } from 'react';
import CoverLetterForm from './components/CoverLetterForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [submissionId, setSubmissionId] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);

  const handleSubmissionSuccess = (id, data) => {
    console.log('Submission ID:', id);
    console.log('Submission Data:', data);
    setSubmissionId(id);
    setSubmissionData(data);
  };

  const handleReset = () => {
    setSubmissionId(null);
    setSubmissionData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Cover Letter Generator
            </h1>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto font-medium">
              Create professional cover letters tailored to your job applications with AI-powered insights
            </p>
          </div>

          {/* Main Content */}
          {!submissionId ? (
            <CoverLetterForm onSuccess={handleSubmissionSuccess} />
          ) : (
            <ResultDisplay
              submissionId={submissionId}
              submissionData={submissionData}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
