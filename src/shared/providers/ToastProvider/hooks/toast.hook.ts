import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Context, ToastOptions } from '../utils';

export const useToast = () => {
  const [message, setMessage] = useState<string>('');
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [visible, setVisible] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(-16)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(
        opacity, {
            toValue: 1,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true
        }),
      Animated.timing(translate, {
        toValue: position === 'top' ? 0 : 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translate, position]);

  const animateOut = useCallback((onEnd?: () => void) => {
    Animated.parallel([
      Animated.timing(
        opacity,
        {
            toValue: 0,
            duration: 180,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true
        }),
      Animated.timing(translate, {
        toValue: position === 'top' ? -16 : 16,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({finished}) => finished && onEnd?.());
  }, [opacity, translate, position]);

  const show = useCallback((msg: string, opts?: ToastOptions) => {
    const duration = opts?.duration ?? 5000;
    setPosition(opts?.position ?? 'top');
    setMessage(msg);
    clearTimer();

    translate.setValue((opts?.position ?? 'top') === 'top' ? -16 : 16);

    setVisible(true);
    animateIn();

    hideTimer.current = setTimeout(() => {
      animateOut(() => setVisible(false));
      hideTimer.current = null;
    }, duration);
  }, [animateIn, animateOut, translate]);

  const hide = useCallback(() => {
    clearTimer();
    animateOut(() => setVisible(false));
  }, [animateOut]);

  useEffect(() => () => clearTimer(), []);

  const context: Context = { show, hide };

  return {
    context,
    message,
    visible,
    position,
    opacity,
    translate,
    hide
  }
}
