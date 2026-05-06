import { Delete } from 'lucide-react';

const keypadLayout = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', 'delete']];

export default function PinPad({ onPress, onDelete }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {keypadLayout.flat().map((label, index) => {
        const isEmpty = label === '';
        const isDelete = label === 'delete';

        return (
          <button
            key={index}
            type="button"
            disabled={isEmpty}
            onClick={() => {
              if (isDelete) return onDelete();
              if (!isEmpty) onPress(label);
            }}
            className={`h-16 rounded-2xl border-2 text-xl font-bold transition-all active:scale-95 ${
              isEmpty
                ? 'cursor-default border-transparent bg-transparent'
                : isDelete
                ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-400'
                : 'border-gray-200 bg-white text-gray-900 hover:border-dana-blue hover:bg-dana-light'
            }`}
          >
            {isDelete ? (
              <Delete className="h-6 w-6 mx-auto" strokeWidth={2.5} />
            ) : (
              label
            )}
          </button>
        );
      })}
    </div>
  );
}
