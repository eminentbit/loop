import { useState } from 'react';

const App = () => {
  const [isFollowing, setIsFollowing] = useState({ recruiter1: false, recruiter2: true, recruiter3: false, recruiter4: true, recruiter5: false, recruiter6: false });

  const [showCertModal, setShowCertModal] = useState(false);
  const [certificateForm, setCertificateForm] = useState({ title: '', issuer: '', date: '' });
  const [certificates, setCertificates] = useState([]);

  const toggleFollow = id => setIsFollowing(prev => ({ ...prev, [id]: !prev[id] }));

  const openCertModal = () => setShowCertModal(true);
  const closeCertModal = () => {
    setShowCertModal(false);
    setCertificateForm({ title: '', issuer: '', date: '' });
  };

  const handleCertChange = e => {
    const { name, value } = e.target;
    setCertificateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCertSubmit = e => {
    e.preventDefault();
    setCertificates(prev => [...prev, certificateForm]);
    closeCertModal();
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Example usage of toggleFollow */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Follow Recruiters</h2>
        <div className="space-y-4">
          {Object.keys(isFollowing).map(recruiter => (
            <div key={recruiter} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <span>{recruiter}</span>
              <button
                onClick={() => toggleFollow(recruiter)}
                className={`px-4 py-2 rounded-md ${isFollowing[recruiter] ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
              >
                {isFollowing[recruiter] ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Boost Your Profile */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Boost Your Profile</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 space-y-6 transition">
          {/* progress bar omitted */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Skills & Expertise', btn: 'Add Skills', icon: '💡' },
              { title: 'Portfolio & Projects', btn: 'Add Projects', icon: '📁' },
              { title: 'Certifications', btn: 'Add Certifications', icon: '🎓', action: openCertModal }
            ].map(item => (
              <div key={item.title} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <span className="flex items-center px-2.5 py-0.5 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 rounded-full text-xs">
                    👁 Recruiter Visible
                  </span>
                </div>
                <button
                  onClick={item.action}
                  className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
                >
                  <span className="mr-2">{item.icon}</span>{item.btn}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates List */}
        {certificates.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-xl font-semibold">Your Certificates</h4>
            <ul className="space-y-2">
              {certificates.map((c, i) => (
                <li key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{c.issuer} - {c.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Certification Modal */}
      {showCertModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Add Certification</h3>
            <form onSubmit={handleCertSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Certificate Title</label>
                <input
                  name="title"
                  value={certificateForm.title}
                  onChange={handleCertChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Issuer</label>
                <input
                  name="issuer"
                  value={certificateForm.issuer}
                  onChange={handleCertChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Date Earned</label>
                <input
                  name="date"
                  type="date"
                  value={certificateForm.date}
                  onChange={handleCertChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none transition"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeCertModal} className="px-4 py-2">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer CTA omitted for brevity */}

    </div>
  );
};

export default App;
