// src/pages/DashboardPage.jsx
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, Plus, Zap } from 'lucide-react';
import { WalletContext } from '../context/WalletContext.jsx';
import Card from '../components/atoms/Card.jsx';
import TransactionCard from '../components/molecules/TransactionCard.jsx';

const actionButtons = [
  { label: 'Scan QR', action: 'scan', icon: '📱', step: null },
  { label: 'Top Up', action: 'topup', icon: '➕', step: 1 },
  { label: 'Send', action: 'send', icon: '📤', step: 5 },
  { label: 'Request', action: 'activity', icon: '🔔', step: 4 },
];

export default function DashboardPage({ onStartTopUp, onShowActivity, onNavigateToSend, onNavigateToScan }) {
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

  const handleActionClick = (action) => {
    if (action.action === 'topup') {
      onStartTopUp();
    } else if (action.action === 'activity') {
      onShowActivity();
    } else if (action.action === 'send') {
      onNavigateToSend();
    }
    else if (action.action === 'scan') {
      if (onNavigateToScan) {
        onNavigateToScan(); // ini akan setStep ke 9
      }
    }
  };

  return (
    <motion.section
      className="px-3 sm:px-4 md:px-5 py-4 sm:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto space-y-4 sm:space-y-5 md:space-y-6 max-w-md">
        
        {/* Balance Card - Responsive padding & font */}
        <motion.div variants={itemVariants} className="relative">
          <div className="dana-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 text-white shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20" />
            <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white/70 tracking-wide">Balance</p>
                  <div className="flex items-baseline gap-1 sm:gap-2 mt-1 sm:mt-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-all">
                      {visible ? `Rp ${displayBalance}` : '••••••••'}
                    </h1>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleVisible}
                  className="rounded-full bg-white/20 backdrop-blur-sm p-2 sm:p-3 hover:bg-white/30 transition-all shrink-0"
                >
                  {visible ? (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  ) : (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
                  <span className="text-white/70">+2.5% this month</span>
                </div>
                <span className="text-white/40 sm:text-white/50 text-[10px] sm:text-xs">MajuPay Card</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - Responsive grid 2x2 di HP, 4 kolom di tablet */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h2>
              <button
                type="button"
                onClick={onShowActivity}
                className="text-xs sm:text-sm font-semibold text-dana-blue hover:text-dana-dark transition"
              >
                Activity →
              </button>
            </div>
            
            {/* Grid: 2 kolom di HP, 4 kolom di tablet/desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  type="button"
                  onClick={() => handleActionClick(button)}
                  className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-dana-light to-white border border-gray-100 hover:border-dana-blue hover:shadow-md transition-all active:scale-95"
                >
                  <span className="text-xl sm:text-2xl">{button.icon}</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-900 text-center leading-tight">
                    {button.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Transactions</h2>
              <span className="text-[10px] sm:text-xs font-semibold text-dana-blue bg-dana-light px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                Live
              </span>
            </div>

            {transactions && transactions.length > 0 ? (
              <div className="flex flex-col gap-2 sm:gap-3 max-h-64 sm:max-h-80 overflow-y-auto scrollbar-touch">
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
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <p className="text-xs sm:text-sm">No transactions yet</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Info Cards - Responsive 1 kolom di HP, 2 kolom di tablet */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Card className="rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-dana-blue" />
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-600">Rewards</p>
            </div>
            <p className="text-base sm:text-xl font-bold text-gray-900">485 pts</p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Ready to redeem</p>
          </Card>

          <Card className="rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-dana-blue" />
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-600">Credit Line</p>
            </div>
            <p className="text-base sm:text-xl font-bold text-gray-900">Rp 5.0M</p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Available</p>
          </Card>
        </motion.div>
        
      </div>
    </motion.section>
  );
}