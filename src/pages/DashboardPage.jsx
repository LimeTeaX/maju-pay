import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, Plus, ArrowUpRight, Zap } from 'lucide-react';
import { WalletContext } from '../context/WalletContext.jsx';
import Card from '../components/atoms/Card.jsx';
import TransactionCard from '../components/molecules/TransactionCard.jsx';

const actionButtons = [
  { label: 'Scan QR', action: 'scan', icon: '📱' },
  { label: 'Top Up', action: 'topup', icon: '➕' },
  { label: 'Send', action: 'send', icon: '📤' },
  { label: 'Request', action: 'activity', icon: '🔔' },
];

export default function DashboardPage({ onStartTopUp, onShowActivity }) {
  const { displayBalance, visible, toggleVisible, transactions } = useContext(WalletContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="px-4 py-6 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto space-y-6 max-w-md">
        {/* Balance Card */}
        <motion.div variants={itemVariants} className="relative">
          <div className="dana-card rounded-3xl p-6 text-white shadow-lg overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-sm font-semibold text-white/70 tracking-wide">Balance</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h1 className="text-4xl sm:text-5xl font-bold">
                      {visible ? `Rp ${displayBalance}` : '••••••••'}
                    </h1>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleVisible}
                  className="rounded-full bg-white/20 backdrop-blur-sm p-3 hover:bg-white/30 transition-all"
                  title={visible ? 'Hide balance' : 'Show balance'}
                >
                  {visible ? (
                    <Eye className="h-5 w-5 text-white" strokeWidth={2} />
                  ) : (
                    <EyeOff className="h-5 w-5 text-white" strokeWidth={2} />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-white/70" />
                  <span className="text-white/70">+2.5% this month</span>
                </div>
                <span className="text-white/50 text-xs">MajuPay Card</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              <button
                type="button"
                onClick={onShowActivity}
                className="text-sm font-semibold text-dana-blue hover:text-dana-dark transition"
              >
                Activity →
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  type="button"
                  onClick={
                    button.action === 'topup'
                      ? onStartTopUp
                      : button.action === 'activity'
                      ? onShowActivity
                      : () => {} // Placeholder untuk fitur yang belum diimplementasikan
                  }
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br from-dana-light to-white border border-gray-100 hover:border-dana-blue hover:shadow-md transition-all active:scale-95"
                >
                  <span className="text-2xl">{button.icon}</span>
                  <span className="text-xs font-semibold text-gray-900 text-center leading-tight">
                    {button.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
              <span className="text-xs font-semibold text-dana-blue bg-dana-light px-3 py-1 rounded-full">
                Live
              </span>
            </div>

            {transactions && transactions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TransactionCard item={transaction} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No transactions yet</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Card className="rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap className="h-4 w-4 text-dana-blue" />
              </div>
              <p className="text-xs font-semibold text-gray-600">Rewards</p>
            </div>
            <p className="text-xl font-bold text-gray-900">485 pts</p>
            <p className="text-xs text-gray-500 mt-1">Ready to redeem</p>
          </Card>

          <Card className="rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Plus className="h-4 w-4 text-dana-blue" />
              </div>
              <p className="text-xs font-semibold text-gray-600">Credit Line</p>
            </div>
            <p className="text-xl font-bold text-gray-900">Rp 5.0M</p>
            <p className="text-xs text-gray-500 mt-1">Available</p>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}