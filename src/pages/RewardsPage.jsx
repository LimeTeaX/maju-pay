// src/pages/RewardsPage.jsx
import { motion } from 'framer-motion';
import { ChevronLeft, Gift, Star, Zap, Coffee, ShoppingBag } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';

const rewards = [
  { id: 1, name: 'Coffee Voucher', points: 500, icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { id: 2, name: 'Shopping Discount', points: 1000, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { id: 3, name: 'Cashback 50k', points: 2000, icon: Zap, color: 'bg-green-100 text-green-600' },
];

export default function RewardsPage({ onBack }) {
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
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Rewards</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">My Rewards</h1>
              <p className="mt-2 text-sm text-gray-600">Redeem your points for exclusive offers</p>
            </div>
          </div>

          {/* Points Card */}
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Gift className="h-8 w-8 text-white/80" />
              <span className="text-xs font-semibold text-white/80">Active Points</span>
            </div>
            <p className="text-4xl font-bold">1,485</p>
            <p className="text-sm text-white/80 mt-2">Available to redeem</p>
            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div className="h-2 w-2/3 rounded-full bg-white"></div>
            </div>
            <p className="text-xs text-white/80 mt-2">1,485 / 2,000 points to next level</p>
          </div>

          {/* Rewards List */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Available Rewards</h3>
            <div className="space-y-3">
              {rewards.map((reward) => {
                const Icon = reward.icon;
                return (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${reward.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{reward.name}</p>
                        <p className="text-sm text-gray-500">{reward.points} points</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Redeem ${reward.name} coming soon!`)}
                      className="rounded-xl bg-dana-light px-4 py-2 text-sm font-semibold text-dana-blue hover:bg-dana-blue hover:text-white transition"
                    >
                      Redeem
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to Earn */}
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">How to earn points?</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✨ Make a transaction → +10 points</p>
              <p>✨ Top up wallet → +50 points</p>
              <p>✨ Invite friends → +200 points</p>
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}