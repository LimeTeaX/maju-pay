// src/components/molecules/TransactionCard.jsx
import { ArrowUp, ArrowDown, CreditCard } from 'lucide-react';

export default function TransactionCard({ item }) {
  const isIncome = item.type === 'Top Up';
  const isSpending = item.type === 'Send';

  const colorClass = isIncome
    ? 'text-emerald-600 bg-emerald-50'
    : isSpending
    ? 'text-red-600 bg-red-50'
    : 'text-gray-600 bg-gray-50';

  const iconClass = isIncome
    ? 'bg-emerald-100'
    : isSpending
    ? 'bg-red-100'
    : 'bg-gray-100';

  const Icon = isIncome ? ArrowDown : isSpending ? ArrowUp : CreditCard;

  return (
    <div className="flex items-center justify-between rounded-xl sm:rounded-2xl bg-white border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg shrink-0 ${iconClass}`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClass}`} strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{item.title}</p>
          <p className="text-[10px] sm:text-xs text-gray-500">{item.date}</p>
        </div>
      </div>
      <div className={`text-right text-xs sm:text-sm font-bold ${colorClass} shrink-0 ml-2`}>
        {item.amount}
      </div>
    </div>
  );
}