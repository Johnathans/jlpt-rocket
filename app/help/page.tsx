'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, BookOpen, CreditCard, Settings, HelpCircle, ChevronDown } from 'lucide-react';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Help Center - Rocket JLPT | FAQs & Support';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Find answers to common questions about Rocket JLPT. Browse FAQs, tutorials, and guides to get the most out of your Japanese learning experience.');
    updateMetaTag('keywords', 'rocket jlpt help, jlpt faq, japanese learning help, jlpt study guide, support center');
  }, []);

  const faqs = [
    {
      question: "How do I get started with Rocket JLPT?",
      answer: "Simply sign up for a free account, select your target JLPT level, and start practicing! We recommend beginning with our placement assessment to identify your current level and areas for improvement."
    },
    {
      question: "What JLPT levels do you support?",
      answer: "We support all JLPT levels from N5 (beginner) to N1 (advanced). Each level includes comprehensive kanji, vocabulary, and grammar practice materials."
    },
    {
      question: "How does progress tracking work?",
      answer: "Our system tracks your mastery of each item you study. As you practice, items move through different mastery levels. You can view your overall progress and statistics in your profile dashboard."
    },
    {
      question: "Can I switch between JLPT levels?",
      answer: "Yes! You can change your target JLPT level at any time from your settings. Your progress for each level is saved separately."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, Rocket JLPT is a web application that works on all devices through your browser. We're optimized for mobile, tablet, and desktop use."
    },
    {
      question: "How often should I practice?",
      answer: "We recommend daily practice sessions of 15-30 minutes for best results. Consistency is more important than long study sessions. Our spaced repetition system will help you review at optimal intervals."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure payment processor."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    }
  ];

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      color: "pink"
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      description: "Subscription and payment information",
      color: "orange"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your profile and preferences",
      color: "pink"
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions and learn how to get the most out of Rocket JLPT.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const bgColor = category.color === 'pink' ? 'bg-pink-100' : 'bg-orange-100';
              const iconColor = category.color === 'pink' ? 'text-pink-600' : 'text-orange-600';
              
              return (
                <Link
                  key={index}
                  href="#"
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-pink-300 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-16 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all shadow-sm"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </div>
  );
}
