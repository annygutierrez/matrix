import {
    Platform,
    StyleSheet,
  } from 'react-native';
import { TOAST_RADIUS } from './ToastProvider.config';

export const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      left: 0, right: 0,
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    top:    {
        top: Platform.select({ios: 60, android: 24, default: 24}) as number
    },
    bottom: {
        bottom: Platform.select({ios: 40, android: 24, default: 24}) as number
    },
    toast: {
      maxWidth: 640,
      alignSelf: 'center',
      borderRadius: TOAST_RADIUS,
      backgroundColor: 'rgba(20,20,20,0.95)',
      ...Platform.select({
        android: { elevation: 8, backgroundColor: '#202020' },
        ios: {
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 6},
        },
      }),
    },
    press: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: TOAST_RADIUS,
    },
    text: {
      color: '#fff',
      fontSize: 14,
    },
    childrenContainer: {flex: 1}
  });
  