// src/pages/SendPage.jsx
import { motion } from 'framer-motion';
import { ChevronLeft, Send, User, CreditCard } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';
import { useState } from 'react';

export default function SendPage({ onBack }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

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
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Send Money</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Transfer</h1>
              <p className="mt-2 text-sm text-gray-600">Send money to friends or family</p>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                placeholder="0812xxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-12 py-3 text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Amount
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-12 py-3 text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                IDR
              </div>
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Note (Optional)
            </label>
            <input
              type="text"
              placeholder="Add a message"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={() => alert('Send feature coming soon!')}
            disabled={!phoneNumber || !amount}
            className={`w-full rounded-2xl py-4 text-base font-bold transition-all ${
              phoneNumber && amount
                ? 'bg-gradient-to-r from-dana-blue to-dana-dark text-white shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              Send Money
            </span>
          </button>

          {/* Info Text */}
          <p className="mt-4 text-xs text-center text-gray-500">
            No fees for transactions under Rp 1,000,000
          </p>
        </Card>
      </div>
    </motion.section>
  );
}