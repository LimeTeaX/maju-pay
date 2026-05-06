import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';

const presets = [10000, 20000, 50000, 100000];

export default function TopUpPage({ topUpAmount, setTopUpAmount, onContinue, shake, onBack }) {
  const [error, setError] = useState('');

  const formatted = useMemo(
    () => new Intl.NumberFormat('id-ID').format(topUpAmount || 0),
    [topUpAmount]
  );

  const handleCustomChange = (value) => {
    const numValue = Number(value.replace(/\D/g, '') || 0);
    if (numValue > 999999999) {
      setError('Maximum amount is Rp 999,999,999');
      return;
    }
    setError('');
    setTopUpAmount(numValue);
  };

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
          <div className="mb-6 space-y-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-dana-blue hover:text-dana-dark transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Top Up</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Enter Amount</h1>
              <p className="mt-2 text-sm text-gray-600">Choose a preset or enter a custom amount</p>
            </div>
          </div>

          {/* Amount Display */}
          <div className="mb-6 rounded-3xl bg-gradient-to-br from-dana-light to-white border border-gray-200 p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-600">Total Amount</p>
            <p className="mt-3 text-4xl font-bold text-dana-blue">Rp {formatted}</p>
            {topUpAmount > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                {topUpAmount >= 50000 ? '✓ Valid amount' : ''}
              </p>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Quick Select</p>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setTopUpAmount(value);
                    setError('');
                  }}
                  className={`rounded-2xl font-semibold py-3 px-4 transition-all border-2 ${
                    topUpAmount === value
                      ? 'border-dana-blue bg-dana-light text-dana-blue shadow-md'
                      : 'border-gray-200 bg-white text-gray-900 hover:border-dana-blue hover:bg-dana-light'
                  }`}
                >
                  Rp {new Intl.NumberFormat('id-ID').format(value)}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Custom Amount
            </label>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                value={topUpAmount ? String(topUpAmount) : ''}
                onChange={(e) => handleCustomChange(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-5 py-3 text-lg font-semibold text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
              />
              {topUpAmount > 0 && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-2xl">✓</span>
                </div>
              )}
            </div>
            {error && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={onContinue}
            disabled={topUpAmount <= 0 || !!error}
            className={`w-full rounded-2xl py-4 text-base font-bold transition-all ${
              shake
                ? 'animate-shake border-2 border-red-500 bg-red-50 text-red-600'
                : topUpAmount > 0 && !error
                ? 'bg-gradient-to-r from-dana-blue to-dana-dark text-white shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {shake ? 'Invalid Amount' : 'Continue to Payment'}
          </button>

          {/* Info Text */}
          <p className="mt-4 text-xs text-center text-gray-500">
            Minimum top-up: Rp 10,000 • Maximum: Rp 999,999,999
          </p>
        </Card>
      </div>
    </motion.section>
  );
}
