'use client';

import { User, Mail, Calendar, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">John Doe</h1>
            <p className="text-gray-600">JLPT N5 Student</p>
          </div>
          
          <button className="w-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-blue-700 hover:border-b-blue-800 text-sm">
            <Edit3 className="h-4 w-4 inline mr-2" />
            Edit Profile
          </button>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Member Since</p>
                <p className="text-gray-600">January 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="space-y-4">
            <button className="w-full px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-green-600 hover:border-b-green-700 text-sm text-left">
              Change Password
            </button>
            
            <button className="w-full px-6 py-3 bg-gray-500 text-white hover:bg-gray-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-gray-600 hover:border-b-gray-700 text-sm text-left">
              Download Data
            </button>
            
            <button className="w-full px-6 py-3 bg-red-500 text-white hover:bg-red-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-red-600 hover:border-b-red-700 text-sm text-left">
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}