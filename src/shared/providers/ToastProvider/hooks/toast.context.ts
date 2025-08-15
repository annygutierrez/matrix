import { createContext, useContext } from 'react';
import { Ctx } from '../utils/ToastProvider.config';

export const ToastContext = createContext<Ctx | null>(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within an ToastProvider');
  }
  return context;
};
