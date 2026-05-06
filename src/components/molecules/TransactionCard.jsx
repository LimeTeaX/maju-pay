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
    <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-4 py-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}>
          <Icon className={`h-5 w-5 ${colorClass}`} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>
      </div>
      <div className={`text-right text-sm font-bold ${colorClass}`}>
        {item.amount}
      </div>
    </div>
  );
}
