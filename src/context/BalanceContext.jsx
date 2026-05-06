import { createContext, useEffect, useMemo, useState } from 'react';

export const BalanceContext = createContext({});

export function BalanceProvider({ children }) {
  const [balance] = useState(12987500);
  const [visible, setVisible] = useState(true);
  const [fluctuation, setFluctuation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) + 1;
      const sign = Math.random() > 0.5 ? 1 : -1;
      setFluctuation((current) => {
        const next = current + sign * change;
        if (next > 350 || next < -350) return 0;
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatted = useMemo(() => {
    const amount = Math.max(0, balance + fluctuation);
    return new Intl.NumberFormat('id-ID').format(amount);
  }, [balance, fluctuation]);

  const value = useMemo(
    () => ({
      balance: formatted,
      visible,
      toggleVisible: () => setVisible((v) => !v),
      rawBalance: balance,
    }),
    [formatted, visible, balance]
  );

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
}
