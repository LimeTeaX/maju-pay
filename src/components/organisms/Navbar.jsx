import { Wallet } from 'lucide-react';

export default function Navbar({ activeStep, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-dana-blue to-dana-dark">
            <Wallet className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-dana-blue uppercase">MajuPay</p>
            <h1 className="text-sm font-bold text-gray-900">E-Wallet</h1>
          </div>
        </div>

        <nav className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => onNavigate(0)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeStep === 0
                ? 'bg-dana-light text-dana-blue'
                : 'text-gray-600 hover:text-dana-blue hover:bg-gray-50'
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate(4)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeStep === 4
                ? 'bg-dana-light text-dana-blue'
                : 'text-gray-600 hover:text-dana-blue hover:bg-gray-50'
            }`}
          >
            Activity
          </button>
        </nav>
      </div>
    </header>
  );
}
