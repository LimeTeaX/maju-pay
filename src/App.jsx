import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WalletContext } from './context/WalletContext.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ActivityPage from './pages/ActivityPage.jsx';
import TopUpPage from './pages/TopUpPage.jsx';
import ChoosePaymentPage from './pages/ChoosePaymentPage.jsx';
import PinConfirmationPage from './pages/PinConfirmationPage.jsx';
import Navbar from './components/organisms/Navbar.jsx';
import BottomNav from './components/organisms/BottomNav.jsx';
import SendPage from './pages/SendPage.jsx';
import RewardsPage from './pages/RewardsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ScanQRPage from './pages/ScanQRPage.jsx';

const pageTransition = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.28, ease: 'easeOut' },
};

function App() {
  const [step, setStep] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('mastercard');
  const [pin, setPin] = useState('');
  const [shakeTopUp, setShakeTopUp] = useState(false);
  const [shakePin, setShakePin] = useState(false);
  const [pinError, setPinError] = useState(false);
  const correctPin = '6381';
  const wallet = useContext(WalletContext);
  const [scanData, setScanData] = useState(null);

  const handleTopUpContinue = (amount) => {
    if (amount <= 0) {
      setShakeTopUp(true);
      window.setTimeout(() => setShakeTopUp(false), 320);
      return;
    }

    setPendingAmount(amount);
    setStep(2);
    setShakeTopUp(false);
  };

  const handlePaymentContinue = () => {
    setStep(3);
  };

  const handlePinConfirm = () => {
    if (pendingAmount <= 0) {
      setShakePin(true);
      setPinError(true);
      window.setTimeout(() => setShakePin(false), 320);
      return;
    }

    if (pin !== correctPin) {
      setShakePin(true);
      setPinError(true);
      window.setTimeout(() => setShakePin(false), 320);
      return;
    }

    wallet.topUp(pendingAmount);
    setPendingAmount(0);
    setPin('');
    setPinError(false);
    setPaymentMethod('mastercard');
    setStep(0);
  };

  const handleReset = () => {
    setStep(0);
    setPendingAmount(0);
    setPaymentMethod('mastercard');
    setPin('');
    setShakeTopUp(false);
    setShakePin(false);
    setPinError(false);
  };

  const handleScanSuccess = (data) => {
  setScanData(data);
  setStep(8); // step khusus untuk hasil scan
  // Atau langsung arahkan ke send page
  if (data.type === 'send') {
    setPendingAmount(data.amount);
    setStep(5); // ke send page
  }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      {/* Subtle background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-dana-light via-white to-white opacity-50" />
      
      <div className="relative mx-auto min-h-screen max-w-md px-4 pb-24 sm:px-6">
        <Navbar activeStep={step} onNavigate={setStep} />
        
        <main className="pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              {step === 0 && (
                <DashboardPage
                  onStartTopUp={() => setStep(1)}
                  onShowActivity={() => setStep(4)}
                  onNavigateToSend={() => setStep(5)}
                  onNavigateToScan={() => setStep(8)}
                />
              )}
              {step === 1 && (
                <TopUpPage
                  topUpAmount={pendingAmount}
                  setTopUpAmount={setPendingAmount}
                  onContinue={() => handleTopUpContinue(pendingAmount)}
                  shake={shakeTopUp}
                  onBack={() => setStep(0)}
                />
              )}
              {step === 2 && (
                <ChoosePaymentPage
                  selectedPayment={paymentMethod}
                  setSelectedPayment={setPaymentMethod}
                  onContinue={handlePaymentContinue}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <PinConfirmationPage
                  pendingAmount={pendingAmount}
                  pin={pin}
                  setPin={setPin}
                  onConfirm={handlePinConfirm}
                  onBack={() => setStep(2)}
                  shake={shakePin}
                  invalid={pinError}
                />
              )}
              {step === 4 && <ActivityPage onNavigateHome={handleReset} />}
              {step === 5 && <SendPage onBack={() => setStep(0)} />}
              {step === 6 && <RewardsPage onBack={() => setStep(0)} />}
              {step === 7 && 
                <ProfilePage 
                  onBack={() => setStep(0)} 
                />}
              {step === 8 && (
                <ScanQRPage 
                  onBack={() => setStep(0)} 
                  onScanSuccess={(data) => {
                  console.log('Hasil scan:', data);
                  alert(`QR Code terdeteksi: ${data.data}`);
                  setStep(0);
                }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <BottomNav activeStep={step} onNavigate={setStep} />
      </div>
    </div>
  );
}

export default App;