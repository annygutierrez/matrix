export const TOAST_RADIUS = 12;

export type ToastOptions = {
    duration?: number;
    position?: 'top' | 'bottom';
  };
  
export type Ctx = {
    show: (message: string, opts?: ToastOptions) => void;
    hide: () => void;
};