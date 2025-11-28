import Link from 'next/link';
import { Rocket, Heart, Mail, Github, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity mb-4">
              <Rocket className="h-6 w-6 text-pink-500" />
              <span className="text-xl text-gray-900">
                <span className="font-light">Rocket</span>
                <span className="font-black ml-1">JLPT</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Master Japanese with comprehensive JLPT preparation. Adaptive practice, progress tracking, and mastery-based learning for all levels.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/rocketjlpt" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-pink-500 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/rocketjlpt" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" strokeWidth={2.5} />
              </a>
              <a 
                href="https://facebook.com/rocketjlpt" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-pink-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" strokeWidth={2.5} />
              </a>
              <a 
                href="https://pinterest.com/rocketjlpt" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-pink-500 transition-colors"
                aria-label="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/rocketjlpt" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-pink-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" strokeWidth={2.5} />
              </a>
              <a 
                href="mailto:hello@rocketjlpt.com" 
                className="text-gray-900 hover:text-pink-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Learning
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/kanji" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Kanji
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Progress
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-pink-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Rocket JLPT. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-pink-500" />
              <span>for Japanese learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}