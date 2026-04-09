const About = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-12 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          About PasswordLab
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          PasswordLab is a simple and secure tool designed to help users
          generate strong, random passwords instantly. In today's digital world,
          weak passwords are one of the biggest security risks — and we aim to
          fix that.
        </p>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            🔐 What We Do
          </h2>
          <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-2">
            <li>Generate highly secure and random passwords</li>
            <li>Provide customizable password options</li>
            <li>
              Ensure privacy by running everything locally in your browser
            </li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            ⚡ Why PasswordLab?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Unlike many tools, PasswordLab does not store or track your
            passwords. Everything happens on your device, ensuring complete
            privacy and safety.This is a passion project built by Animesh Maiti,
            there are many password generators out there, but I wanted to create
            one that is open-source, privacy-focused, and easy to use. You can
            check out the code on{" "}
            <a
              href="https://github.com/animeshmaiti/password-gen"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            . You can run it locally, verify the code.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            🛡️ Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our mission is to make online security simple and accessible for
            everyone.
          </p>
        </div>
        {/* credits */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            🙏 Credits
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This project is inspired by the following resources:
          </p>
          <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              <a
                href="https://passwords-generator.org/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Passwords Generator
              </a>
            </li>
            <li>
              <a
                href="https://passwordentropy.com/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Password Entropy Calculator(open-source code)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
