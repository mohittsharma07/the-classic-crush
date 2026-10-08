import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2rem)] sm:w-full pointer-events-none"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md"
          style={{
            backgroundColor: '#292D1D',
            color: '#FFFCF6',
            borderColor: 'rgba(185,160,100,0.45)',
          }}
          role={toast.type === 'error' ? 'alert' : 'status'}
        >
          {toast.type === 'success' && (
            <CheckCircle2
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: '#86C79A' }}
            />
          )}

          {toast.type === 'error' && (
            <AlertCircle
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: '#F0A29A' }}
            />
          )}

          {(!toast.type || toast.type === 'info') && (
            <Info
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: '#D4BD85' }}
            />
          )}

          <div className="flex-1 min-w-0">
            <h4
              className="text-sm font-semibold tracking-wide"
              style={{ color: '#FFFCF6' }}
            >
              {toast.title}
            </h4>

            <p
              className="text-xs mt-1 line-clamp-2"
              style={{ color: '#F4EBDD' }}
            >
              {toast.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded transition-colors hover:bg-white/10"
            style={{ color: '#D4BD85' }}
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
