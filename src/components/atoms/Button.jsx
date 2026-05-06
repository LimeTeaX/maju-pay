export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300';
  const palette =
    variant === 'secondary'
      ? 'bg-white/10 text-slate-100 hover:bg-white/15'
      : 'bg-violet-500 text-white hover:bg-violet-400';

  return (
    <button className={`${base} ${palette} ${className}`} {...props}>
      {children}
    </button>
  );
}
