// src/pages/ProfilePage.jsx
import { motion } from 'framer-motion';
import { ChevronLeft, User, Mail, Phone, Shield, Bell, LogOut } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';

export default function ProfilePage({ onBack }) {
  return (
    <motion.section
      className="px-4 py-6 sm:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-md space-y-6">
        <Card className="rounded-3xl p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-dana-blue hover:text-dana-dark transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Profile</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">My Account</h1>
              <p className="mt-2 text-sm text-gray-600">Manage your personal information</p>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-dana-blue to-dana-dark">
                <User className="h-12 w-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-md">
                <div className="rounded-full bg-dana-blue p-1">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">Premium Member</p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4">
              <Mail className="h-5 w-5 text-dana-blue" />
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-900">john.doe@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4">
              <Phone className="h-5 w-5 text-dana-blue" />
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-semibold text-gray-900">+62 812 3456 7890</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4">
              <Shield className="h-5 w-5 text-dana-blue" />
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-900">January 2024</p>
              </div>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="space-y-3 mb-8">
            <button className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <Bell className="h-5 w-5 text-dana-blue" />
              <span className="flex-1 text-left font-semibold text-gray-900">Notifications</span>
              <span className="text-sm text-gray-400">On</span>
            </button>

            <button className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <Shield className="h-5 w-5 text-dana-blue" />
              <span className="flex-1 text-left font-semibold text-gray-900">Security</span>
              <span className="text-sm text-gray-400">Change PIN</span>
            </button>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => alert('Logout feature coming soon!')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-200 bg-red-50 py-4 text-base font-bold text-red-600 transition hover:bg-red-100 active:scale-95"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>

          {/* Version */}
          <p className="mt-4 text-center text-xs text-gray-400">Version 1.0.0</p>
        </Card>
      </div>
    </motion.section>
  );
}