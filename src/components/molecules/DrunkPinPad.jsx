import { useEffect, useMemo, useState } from 'react';

const baseKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function DrunkPinPad({ onPress, onClear }) {
  const [keys, setKeys] = useState(baseKeys);

  const score = useMemo(() => Math.random(), [keys]);

  useEffect(() => {
    setKeys(shuffle(baseKeys));
  }, []);

  const handleClick = (value) => {
    onPress(value);
    setKeys(shuffle(baseKeys));
  };

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.map((key) => (
        <button
          key={`${key}-${score}`}
          type="button"
          onClick={() => handleClick(key)}
          className="rounded-3xl border border-slate-300 bg-slate-50 py-5 text-xl font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          {key}
        </button>
      ))}
      <button type="button" onClick={onClear} className="col-span-3 rounded-3xl border border-slate-300 bg-rose-50 py-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-100">
        Clear PIN
      </button>
    </div>
  );
}
