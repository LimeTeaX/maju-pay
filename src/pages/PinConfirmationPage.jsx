import { motion } from 'framer-motion';
import { ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';
import PinPad from '../components/molecules/PinPad.jsx';
import PinInput from '../components/molecules/PinInput.jsx';

export default function PinConfirmationPage({ pendingAmount, pin, setPin, onConfirm, onBack, shake, invalid }) {
  const isReady = pin.length === 4;

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
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Security</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Enter Your PIN</h1>
              <p className="mt-2 text-sm text-gray-600">Confirm this transaction with your 4-digit PIN</p>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="mb-6 rounded-3xl bg-gradient-to-br from-dana-light to-white border border-gray-200 p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-600">Amount to Top-Up</p>
            <p className="mt-3 text-3xl font-bold text-dana-blue">
              Rp {new Intl.NumberFormat('id-ID').format(pendingAmount)}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                This transaction requires your 4-digit PIN to proceed
              </p>
            </div>
          </div>

          {/* PIN Input */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Enter PIN
            </label>
            <div className="flex justify-center">
              <PinInput value={pin} onChange={setPin} />
            </div>
          </div>

          {/* Error Message */}
          {invalid && (
            <motion.div
              className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 border border-red-200 p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm font-semibold text-red-900">
                Wrong PIN or invalid amount. Please try again.
              </p>
            </motion.div>
          )}

          {/* PIN Keypad */}
          <div className="mb-6 space-y-6">
            <PinPad
              onPress={(value) => {
                if (pin.length < 4) setPin((prev) => prev + value);
              }}
              onDelete={() => setPin((prev) => prev.slice(0, -1))}
            />

            {/* Confirm Button */}
            <button
              type="button"
              disabled={!isReady}
              onClick={onConfirm}
              className={`w-full rounded-2xl py-4 text-base font-bold transition-all ${
                shake
                  ? 'animate-shake border-2 border-red-500 bg-red-50 text-red-600'
                  : isReady
                  ? 'bg-gradient-to-r from-dana-blue to-dana-dark text-white shadow-lg hover:shadow-xl active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isReady ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Confirm & Complete
                </span>
              ) : (
                `Enter 4-digit PIN (${pin.length}/4)`
              )}
            </button>
          </div>

          {/* Security Footer */}
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-xs text-amber-900">
              🔐 Your PIN is never stored and always encrypted. Never share your PIN with anyone.
            </p>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
