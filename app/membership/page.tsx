'use client';

import { Crown, Check, CreditCard, Calendar, Gift } from 'lucide-react';

export default function MembershipPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f8ff' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Membership Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Membership</h1>
            <p className="text-gray-600">Manage your JLPT Rocket subscription</p>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Current Plan</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-green-900">Free Plan</h3>
                <p className="text-green-700">Access to basic features</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-900">$0</p>
                <p className="text-sm text-green-700">per month</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">5 stories per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Basic vocabulary practice</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Progress tracking</span>
              </div>
            </div>
          </div>

          <button className="w-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-blue-700 hover:border-b-blue-800 text-sm">
            Upgrade to Premium
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Premium Plan</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-blue-900">Premium</h3>
                <p className="text-blue-700">Unlimited access to all features</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">$9.99</p>
                <p className="text-sm text-blue-700">per month</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">Unlimited stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">Advanced vocabulary & kanji practice</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">Detailed progress analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">Offline mode</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">Priority support</span>
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-blue-600 text-white hover:bg-blue-700 font-bold transition-colors rounded-lg shadow-sm border-b-4 border-b-blue-700 hover:border-b-blue-800 text-base">
              Start Premium Trial
            </button>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Payment Method</p>
                <p className="text-gray-600">No payment method on file</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Next Billing Date</p>
                <p className="text-gray-600">N/A - Free Plan</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button className="w-full px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-green-600 hover:border-b-green-700 text-sm text-left flex items-center gap-3">
              <CreditCard className="h-4 w-4" />
              Add Payment Method
            </button>
            
            <button className="w-full px-6 py-3 bg-gray-500 text-white hover:bg-gray-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-gray-600 hover:border-b-gray-700 text-sm text-left flex items-center gap-3">
              <Gift className="h-4 w-4" />
              Redeem Gift Code
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Actions</h2>
          
          <div className="space-y-4">
            <button className="w-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-blue-700 hover:border-b-blue-800 text-sm text-left">
              View Billing History
            </button>
            
            <button className="w-full px-6 py-3 bg-yellow-500 text-white hover:bg-yellow-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-yellow-600 hover:border-b-yellow-700 text-sm text-left">
              Pause Subscription
            </button>
            
            <button className="w-full px-6 py-3 bg-red-500 text-white hover:bg-red-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-red-600 hover:border-b-red-700 text-sm text-left">
              Cancel Subscription
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
