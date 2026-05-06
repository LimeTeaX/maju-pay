import { createContext, useEffect, useMemo, useState } from 'react';
import initialTransactions from '../data/transactions.json';

export const WalletContext = createContext({});

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(99800);
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [flicker, setFlicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker((current) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = current + delta;
        if (next > 6 || next < -6) return 0;
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const displayBalance = useMemo(() => {
    const amount = Math.max(0, balance + flicker);
    return new Intl.NumberFormat('id-ID').format(amount);
  }, [balance, flicker]);

  const topUp = (amount) => {
    if (amount <= 0) return;

    // Update balance
    setBalance((current) => current + amount);

    // Add transaction
    setTransactions((current) => [
      {
        id: `t-${Date.now()}`,
        category: 'Top Up',
        title: 'Top Up via MajuPay',
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        amount: `+Rp ${new Intl.NumberFormat('id-ID').format(amount)}`,
        type: 'Top Up',
      },
      ...current,
    ]);
  };

  const value = useMemo(
    () => ({
      balance,
      displayBalance,
      visible,
      toggleVisible: () => setVisible((current) => !current),
      transactions,
      topUp,
      rawBalance: balance,
    }),
    [balance, displayBalance, visible, transactions]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
