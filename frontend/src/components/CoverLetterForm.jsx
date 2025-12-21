import { useState } from 'react';

const API_URL = 'http://localhost:8787';

function CoverLetterForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    skills: '',
    jobDescription: '',
    extraNotes: '',
  });

  const [projects, setProjects] = useState([{ title: '', desc: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', desc: '' }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Filter out empty projects
      const validProjects = projects.filter(
        (p) => p.title.trim() || p.desc.trim()
      );

      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        skills: formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        projects: validProjects,
        jobDescription: formData.jobDescription,
        extraNotes: formData.extraNotes,
      };

      const response = await fetch(`${API_URL}/api/cover-letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      onSuccess(result.id, result.data);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-r-lg flex items-center gap-3 animate-shake">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Personal Information */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Personal Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
              Desired Role/Position
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
          </div>
          <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
            placeholder="React, Node.js, Python, AWS"
          />
        </div>

        {/* Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          </div>

          {projects.map((project, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl space-y-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                  Project {index + 1}
                </h3>
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                placeholder="Project Title"
              />

              <textarea
                value={project.desc}
                onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 resize-none"
                rows="3"
                placeholder="Project Description"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addProject}
            className="w-full py-4 px-6 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Project
          </button>
        </div>

        {/* Job Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
          </div>
          <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-700 mb-2">
            Paste the job description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            required
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 resize-none"
            rows="6"
            placeholder="Paste the full job description here..."
          />
        </div>

        {/* Extra Notes */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Additional Notes</h2>
          </div>
          <label htmlFor="extraNotes" className="block text-sm font-semibold text-gray-700 mb-2">
            Any other information (optional)
          </label>
          <textarea
            id="extraNotes"
            name="extraNotes"
            value={formData.extraNotes}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 resize-none"
            rows="3"
            placeholder="Any additional information you'd like to include..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Cover Letter
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default CoverLetterForm;
