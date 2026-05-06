import { Home, History, Send, Gift, User } from 'lucide-react';

const actions = [
  { label: 'Home', step: 0, icon: Home },
  { label: 'History', step: 4, icon: History },
  { label: 'Send', step: 0, icon: Send },
  { label: 'Rewards', step: 0, icon: Gift },
  { label: 'Profile', step: 0, icon: User },
];

export default function BottomNav({ activeStep, onNavigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-lg shadow-lg sm:hidden px-0 py-3">
      <div className="mx-auto flex max-w-md items-center justify-around gap-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const isActive = activeStep === action.step && (action.step === 0 || action.step === 4);
          
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigate(action.step)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-dana-light text-dana-blue'
                  : 'text-gray-600 hover:text-dana-blue hover:bg-gray-50'
              }`}
              title={action.label}
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
              <span className="leading-none">{action.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
