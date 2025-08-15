import React from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
} from 'react-native';
import { styles } from './utils';
import { ToastContext } from './hooks/toast.context';
import { useToast } from './hooks';

export function ToastProvider({children}: {children: React.ReactNode}) {
  const {
    context,
    position,
    visible,
    opacity,
    translate,
    hide,
    message
} = useToast();

  return (
    <ToastContext.Provider value={context}>
      <View style={styles.childrenContainer}>{children}</View>
      <View
        pointerEvents="box-none"
        style={[
          styles.overlay,
          position === 'top' ? styles.top : styles.bottom,
        ]}>
        {visible ? (
          <Animated.View
            style={[
              styles.toast,
              {
                opacity,
                transform: [{translateY: translate}],
              },
            ]}>
            <Pressable
              onPress={hide}
              style={({pressed}) => [styles.press, pressed && {opacity: 0.85}]}
            >
              <Text style={styles.text}>{message}</Text>
            </Pressable>
          </Animated.View>
        ) : null}
      </View>
    </ToastContext.Provider>
  );
}
