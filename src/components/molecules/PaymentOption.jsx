export default function PaymentOption({ icon, title, subtitle, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border-2 px-4 py-4 text-left transition-all ${
        selected
          ? 'border-dana-blue bg-dana-light shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-semibold ${
          selected
            ? 'bg-dana-blue text-white'
            : 'bg-gray-100 text-gray-900'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={`text-base font-semibold ${selected ? 'text-dana-blue' : 'text-gray-900'}`}>
            {title}
          </p>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${
          selected
            ? 'border-dana-blue bg-dana-blue'
            : 'border-gray-300 bg-white'
        }`}>
          {selected && (
            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
