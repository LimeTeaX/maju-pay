// src/components/organisms/BottomNav.jsx
import { Home, History, Send, Gift, User } from 'lucide-react';

const actions = [
  { label: 'Home', step: 0, icon: Home },
  { label: 'History', step: 4, icon: History },
  { label: 'Send', step: 5, icon: Send },
  { label: 'Rewards', step: 6, icon: Gift },
  { label: 'Profile', step: 7, icon: User },
];

export default function BottomNav({ activeStep, onNavigate }) {
  const isActive = (step) => activeStep === step;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md border-t border-gray-200 bg-white/95 backdrop-blur-lg shadow-lg sm:max-w-full md:max-w-md px-2 py-2 sm:px-0 sm:py-3">
      <div className="flex w-full items-center justify-around gap-1 sm:gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigate(action.step)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-semibold transition-all ${
                isActive(action.step)
                  ? 'bg-dana-light text-dana-blue'
                  : 'text-gray-600 hover:text-dana-blue hover:bg-gray-50'
              }`}
              title={action.label}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
              <span className="leading-none hidden sm:block">{action.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}