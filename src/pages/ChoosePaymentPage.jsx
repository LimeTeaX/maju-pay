import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';
import PaymentOption from '../components/molecules/PaymentOption.jsx';

const options = [
  { id: 'paypal', title: 'Paypal', subtitle: 'sask***@mail.com', icon: '🅿️' },
  { id: 'mastercard', title: 'Mastercard', subtitle: '4827 8472 7424', icon: '💳' },
  { id: 'wise', title: 'Wise', subtitle: 'wakuwak@igm.com', icon: '💸' },
  { id: 'dana', title: 'DANA Account', subtitle: '62812xxxxxxxx', icon: '📱' },
];

export default function ChoosePaymentPage({ selectedPayment, setSelectedPayment, onContinue, onBack }) {
  const currentMethod = useMemo(
    () => options.find((option) => option.id === selectedPayment) || options[1],
    [selectedPayment]
  );

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
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Payment Method</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Choose Payment</h1>
              <p className="mt-2 text-sm text-gray-600">Select your preferred payment method</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3 mb-6">
            {options.map((option) => (
              <PaymentOption
                key={option.id}
                icon={option.icon}
                title={option.title}
                subtitle={option.subtitle}
                selected={selectedPayment === option.id}
                onSelect={() => setSelectedPayment(option.id)}
              />
            ))}
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-2xl bg-gradient-to-r from-dana-blue to-dana-dark py-4 text-base font-bold text-white transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Continue with {currentMethod.title}
          </button>

          {/* Security Info */}
          <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-100 p-4">
            <p className="text-xs text-blue-900">
              🔒 Your payment information is encrypted and secure. No data is shared with third parties.
            </p>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
