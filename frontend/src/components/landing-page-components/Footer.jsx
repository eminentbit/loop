import { Link } from "react-router-dom";
import { footerLinks } from "src/util/footerLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Loop. All rights reserved.</p>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              {
                name: "Facebook",
                href: "https://www.facebook.com/share/1BEQzdoPAt/?mibextid=wwXIfr",
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                ),
              },
              {
                name: "GitHub",
                href: "https://github.com/eminentbit/loop",
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                ),
              },
              {
                name: "TikTok",
                href: "https://www.tiktok.com/@emp.inc.solution?_t=ZM-8vZgeu9IMZp&_r=1",
                icon: (
                  <path
                    fill="currentColor"
                    d="M16.806 3.337c-.693-.448-1.47-.756-2.301-.918v3.047a6.61 6.61 0 002.301.416v3.053a9.653 9.653 0 01-2.301-.286v6.314c0 2.292-1.861 4.15-4.154 4.15a4.152 4.152 0 01-2.548-.867 4.162 4.162 0 01-1.607-3.283c0-2.293 1.861-4.153 4.155-4.153.136 0 .27.007.403.02v3.066a1.082 1.082 0 00-.403-.075 1.088 1.088 0 100 2.174c.598 0 1.086-.486 1.086-1.085V2.405h3.07c.087.998.475 1.93 1.105 2.682.473.566 1.067 1.038 1.74 1.388v3.068a9.943 9.943 0 01-1.74-.694v6.577c0 3.64-2.96 6.6-6.6 6.6S2.4 20.64 2.4 17c0-3.64 2.96-6.6 6.6-6.6.136 0 .27.004.403.012v3.056a3.58 3.58 0 00-.403-.023c-1.96 0-3.555 1.596-3.555 3.555 0 .95.372 1.844 1.045 2.517a3.572 3.572 0 002.512 1.043c1.96 0 3.555-1.595 3.555-3.554V9.27a9.654 9.654 0 002.301.285V3.337z"
                  />
                ),
              },
            ].map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                aria-label={name}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  {icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
