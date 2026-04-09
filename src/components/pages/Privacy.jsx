const Privacy = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-12 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          Your privacy is important to us. This Privacy Policy explains how
          PasswordLab handles your information.
        </p>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            1. No Data Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            PasswordLab does not collect, store, or share any personal data or
            passwords. All password generation happens locally in your browser.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            2. No Tracking
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We do not use trackers, cookies, or analytics that identify users
            personally.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            3. Security
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Since no data is stored or transmitted, your generated passwords
            remain completely private and secure. And this is totally Open source, so you can see the code in <a href="https://github.com/animeshmaiti/password-gen" target="_blank" className="text-blue-500 hover:underline">GitHub</a> and verify it yourself.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            4. Third-Party Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            PasswordLab does not rely on third-party services that collect user
            data.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            5. Updates
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This policy may be updated in the future. Any changes will be
            reflected on this page.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Last updated: 09-Apr-2026</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
