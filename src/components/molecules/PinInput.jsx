import { useEffect, useRef } from 'react';

export default function PinInput({ value, onChange, onComplete }) {
  const inputRefs = useRef([]);
  const digits = value.padEnd(4, ' ').split('');

  useEffect(() => {
    if (value.length === 4) {
      onComplete?.(value);
    }
  }, [value, onComplete]);

  const handleChange = (index, event) => {
    const nextValue = event.target.value.replace(/\D/g, '');
    if (!nextValue) return;
    const nextDigits = value.split('').slice(0, 4);
    nextDigits[index] = nextValue[0];
    const updated = nextDigits.join('').trim();
    onChange(updated);
    const nextIndex = Math.min(index + 1, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      const prevIndex = index - 1;
      onChange(value.slice(0, -1));
      inputRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={digit === ' ' ? '' : digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          className="h-16 w-14 rounded-2xl border-2 border-gray-200 bg-white text-center text-2xl font-bold text-gray-900 outline-none transition focus:border-dana-blue focus:ring-2 focus:ring-dana-blue/20"
        />
      ))}
    </div>
  );
}
