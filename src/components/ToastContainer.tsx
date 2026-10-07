import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2rem)] sm:w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#2C1810] text-[#FAF6F0] shadow-xl border border-[#D4AF37]/30"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}

          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}

          {(!toast.type || toast.type === 'info') && (
            <Info className="w-5 h-5 text-[#E5B869] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              {toast.title}
            </h4>

            <p className="text-xs text-[#FAF6F0]/80 mt-0.5 line-clamp-2">
              {toast.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-[#FAF6F0]/60 hover:text-white p-1 rounded"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};