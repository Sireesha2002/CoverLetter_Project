function ResultDisplay({ submissionId, submissionData, onReset }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  console.log('ResultDisplay - extraNotes:', submissionData.extraNotes);
  console.log('ResultDisplay - extraNotes exists?:', !!submissionData.extraNotes);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
      <div className="space-y-8">
        {/* Success Header */}
        <div className="text-center pb-8 border-b-2 border-gray-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-6 shadow-lg animate-bounce-slow">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Submission Successful!
          </h2>
          <p className="text-gray-600 text-lg">
            Your cover letter data has been saved with ID:{' '}
            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{submissionId}</span>
          </p>
        </div>

        {/* Submission Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Submission Details
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-100 hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Name
              </p>
              <p className="font-bold text-gray-900 text-lg">
                {submissionData.name || 'N/A'}
              </p>
            </div>

            {submissionData.email && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-100 hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold text-purple-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </p>
                <p className="font-bold text-gray-900">
                  {submissionData.email}
                </p>
              </div>
            )}

            {submissionData.role && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-100 hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Role
                </p>
                <p className="font-bold text-gray-900">
                  {submissionData.role}
                </p>
              </div>
            )}

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border-2 border-amber-100 hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold text-amber-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Created At
              </p>
              <p className="font-bold text-gray-900">
                {new Date(submissionData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {submissionData.skills && submissionData.skills.length > 0 && (
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-100">
              <p className="text-sm font-semibold text-cyan-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {submissionData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {submissionData.projects && submissionData.projects.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-purple-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Projects
              </p>
              {submissionData.projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                    <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                    {project.title}
                  </h4>
                  <p className="text-gray-700">{project.desc}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100">
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Job Description
              </p>
              <button
                onClick={() => copyToClipboard(submissionData.jobDescription)}
                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {submissionData.jobDescription}
            </p>
          </div>

          {submissionData.extraNotes && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-100">
              <p className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Additional Notes
              </p>
              <p className="text-gray-800 leading-relaxed">
                {submissionData.extraNotes}
              </p>
            </div>
          )}
        </div>

        {/* Cover Letter Status */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-yellow-900 text-lg mb-1">
                AI Cover Letter Generation Coming Soon
              </p>
              <p className="text-yellow-800">
                The cover letter field is currently null. AI integration will be
                added in a future update to automatically generate personalized cover letters.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={onReset}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Another Cover Letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;
