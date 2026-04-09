import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 mt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-5 py-5 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            PasswordLab
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Generate strong, secure passwords instantly. Open-source and
            privacy-first.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
            Connect
          </h3>
          <div className="flex space-x-4 text-sm">
            <a
              href="https://github.com/animeshmaiti"
              target="_blank"
              className="hover:text-blue-500"
            >
              GitHub
            </a>
            <a
              href="https://x.com/AnimeshMaiti7"
              target="_blank"
              className="hover:text-blue-500"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/animeshmaiti/"
              target="_blank"
              className="hover:text-blue-500"
            >
              LinkedIn
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} PasswordLab. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="text-center text-xs py-2 border-t border-gray-200 dark:border-gray-800 text-gray-500">
        Built with ❤️ for better security
      </div>
    </footer>
  );
};

export default Footer;
