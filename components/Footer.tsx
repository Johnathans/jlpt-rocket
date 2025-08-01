import Link from 'next/link';
import { Rocket, Heart, Mail, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="/6110736_rocket_spaceship_icon (2).png" 
                alt="Rocket JLPT Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl text-gray-900">
                <span className="font-black">Rocket</span>
                <span className="font-medium ml-1">JLPT</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Master Japanese reading with graded stories featuring furigana pronunciation guides. 
              Your journey from beginner to advanced starts here.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
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
                <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="text-gray-600 hover:text-green-600 transition-colors">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/kanji" className="text-gray-600 hover:text-green-600 transition-colors">
                  Kanji
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-green-600 transition-colors">
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
                <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-green-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
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
              <Heart className="h-4 w-4 text-red-500" />
              <span>for Japanese learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}