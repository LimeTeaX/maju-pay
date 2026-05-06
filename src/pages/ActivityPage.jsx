import { useContext } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import TransactionCard from '../components/molecules/TransactionCard.jsx';
import Card from '../components/atoms/Card.jsx';
import { WalletContext } from '../context/WalletContext.jsx';

export default function ActivityPage({ onNavigateHome }) {
  const { transactions } = useContext(WalletContext);

  // Calculate statistics
  const stats = {
    income: transactions
      .filter((t) => t.type === 'Top Up')
      .reduce((sum, t) => {
        const amount = parseInt(t.amount.replace(/\D/g, ''));
        return sum + amount;
      }, 0),
    spending: transactions
      .filter((t) => t.type === 'Send')
      .reduce((sum, t) => {
        const amount = parseInt(t.amount.replace(/\D/g, ''));
        return sum + amount;
      }, 0),
  };

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
      <div className="mx-auto max-w-md space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Activity</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">Transactions</h1>
            </div>
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dana-light text-dana-blue font-semibold text-sm hover:bg-gray-100 transition"
            >
              ← Home
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Card className="rounded-3xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              </div>
              <p className="text-xs font-semibold text-gray-600">Income</p>
            </div>
            <p className="text-lg font-bold text-emerald-600">
              Rp {new Intl.NumberFormat('id-ID').format(stats.income)}
            </p>
            <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
          </Card>

          <Card className="rounded-3xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-600" strokeWidth={2} />
              </div>
              <p className="text-xs font-semibold text-gray-600">Spending</p>
            </div>
            <p className="text-lg font-bold text-red-600">
              Rp {new Intl.NumberFormat('id-ID').format(stats.spending)}
            </p>
            <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
          </Card>
        </motion.div>

        {/* Transactions List */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-dana-blue" strokeWidth={2} />
                Transaction History
              </h2>
              <span className="text-xs font-semibold text-dana-blue bg-dana-light px-3 py-1 rounded-full">
                {transactions.length} Total
              </span>
            </div>

            {transactions && transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:scale-102 transition-transform"
                  >
                    <TransactionCard item={transaction} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Download className="h-12 w-12 text-gray-300 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-semibold">No transactions yet</p>
                <p className="text-xs mt-1">Your transactions will appear here</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Export Button */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            className="w-full rounded-2xl border-2 border-gray-300 py-3 text-base font-bold text-gray-900 transition hover:border-dana-blue hover:bg-dana-light active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="h-5 w-5" strokeWidth={2} />
              Export Statement
            </span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
