'use client';

import { Crown, Check, CreditCard, Calendar, Gift, Sparkles, Zap, Star } from 'lucide-react';

export default function MembershipPage() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Membership Plans</h1>
          <p className="text-lg text-gray-600">Choose the perfect plan for your JLPT journey</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Access to all kanji & vocabulary</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">5 stories per month</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Basic progress tracking</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Practice tests</span>
              </div>
            </div>

            <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <span className="text-sm font-semibold text-green-700">Current Plan</span>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-8 relative text-white shadow-xl">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">POPULAR</span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold">$9.99</span>
                <span className="text-white/80">/month</span>
              </div>
              <p className="text-white/90">Everything you need to master JLPT</p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white">Everything in Free</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white">Unlimited stories</span>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white">Advanced analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white">Offline mode</span>
              </div>
              <div className="flex items-start gap-3">
                <Crown className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white">Priority support</span>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white">Exclusive content</span>
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-white text-pink-600 hover:bg-gray-50 font-bold transition-colors rounded-xl shadow-lg">
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Billing & Account Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Account</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-5 w-5 text-pink-500" />
                <p className="font-semibold text-gray-900">Payment Method</p>
              </div>
              <p className="text-sm text-gray-600">No payment method on file</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                <p className="font-semibold text-gray-900">Next Billing Date</p>
              </div>
              <p className="text-sm text-gray-600">N/A - Free Plan</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium transition-colors rounded-xl flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" />
              Add Payment Method
            </button>
            
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors rounded-xl flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" />
              Redeem Gift Code
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
