// src/pages/SendPage.jsx
import { motion } from 'framer-motion';
import { ChevronLeft, Send, User, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';
import { useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext.jsx';

const presetAmounts = [50000, 100000, 250000, 500000];

export default function SendPage({ onBack }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { balance, topUp } = useContext(WalletContext);

  const numericAmount = parseInt(amount.replace(/\D/g, '')) || 0;
  const isValidAmount = numericAmount > 0 && numericAmount <= balance;
  const isValidPhone = phoneNumber.length >= 10 && phoneNumber.length <= 13;

  const handleSend = () => {
    if (!isValidPhone) {
      setError('Nomor HP tidak valid (minimal 10 digit)');
      setSuccess('');
      return;
    }
    
    if (!isValidAmount) {
      if (numericAmount <= 0) setError('Jumlah transfer harus lebih dari Rp 0');
      else if (numericAmount > balance) setError('Saldo tidak mencukupi');
      setSuccess('');
      return;
    }

    setIsSending(true);
    setError('');
    
    // Simulasi proses kirim
    setTimeout(() => {
      setSuccess(`✅ Berhasil mengirim Rp ${numericAmount.toLocaleString('id-ID')} ke ${phoneNumber}`);
      setIsSending(false);
      
      // Reset form setelah 2 detik
      setTimeout(() => {
        setPhoneNumber('');
        setAmount('');
        setNote('');
        setSuccess('');
        onBack();
      }, 2000);
    }, 1500);
  };

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
          <div className="mb-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-dana-blue hover:text-dana-dark transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Send Money</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Transfer</h1>
              <p className="mt-2 text-sm text-gray-600">Send money to friends or family</p>
            </div>
          </div>

          {/* Saldo Info */}
          <div className="mb-6 rounded-2xl bg-dana-light p-4">
            <p className="text-sm text-gray-600">Saldo tersedia</p>
            <p className="text-xl font-bold text-dana-blue">
              Rp {balance.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4"
            >
              <p className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {success}
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-2xl bg-red-50 border border-red-200 p-4"
            >
              <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            </motion.div>
          )}

          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                placeholder="08123456789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-12 py-3 text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
              />
            </div>
            {phoneNumber.length > 0 && phoneNumber.length < 10 && (
              <p className="mt-1 text-xs text-red-500">Minimal 10 digit</p>
            )}
          </div>

          {/* Preset Amount */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Quick Amount
            </label>
            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className={`rounded-xl py-2 text-sm font-semibold transition border-2 ${
                    numericAmount === preset
                      ? 'border-dana-blue bg-dana-light text-dana-blue'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-dana-blue'
                  }`}
                >
                  Rp {preset.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Amount
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-12 py-3 text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                IDR
              </div>
            </div>
            {numericAmount > balance && numericAmount > 0 && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Melebihi saldo (Rp {balance.toLocaleString('id-ID')})
              </p>
            )}
          </div>

          {/* Note Input */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Note (Optional)
            </label>
            <input
              type="text"
              placeholder="Add a message"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!isValidPhone || !isValidAmount || isSending}
            className={`w-full rounded-2xl py-4 text-base font-bold transition-all ${
              isValidPhone && isValidAmount && !isSending
                ? 'bg-gradient-to-r from-dana-blue to-dana-dark text-white shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {isSending ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Money
                </>
              )}
            </span>
          </button>

          {/* Info Text */}
          <p className="mt-4 text-xs text-center text-gray-500">
            Minimal transfer: Rp 10,000 • Maksimal: Rp {balance.toLocaleString('id-ID')}
          </p>
        </Card>
      </div>
    </motion.section>
  );
}