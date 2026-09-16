import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center justify-between gap-3 border ${
                toast.type === 'success'
                  ? 'bg-surface-container-lowest/95 border-primary/20 text-on-surface'
                  : toast.type === 'warning'
                  ? 'bg-amber-50/95 border-amber-300 text-amber-900'
                  : 'bg-surface-container-lowest/95 border-surface-container-high text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    toast.type === 'success'
                      ? 'bg-primary text-on-primary'
                      : toast.type === 'warning'
                      ? 'bg-amber-500 text-white'
                      : 'bg-secondary text-on-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {toast.type === 'success'
                      ? 'check'
                      : toast.type === 'warning'
                      ? 'warning'
                      : 'info'}
                  </span>
                </div>
                <span className="text-sm font-medium leading-tight">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-outline hover:text-on-surface p-1 rounded-full cursor-pointer transition-colors"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
