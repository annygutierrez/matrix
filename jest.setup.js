import '@testing-library/jest-native/extend-expect';

try {
  require('react-native-gesture-handler/jestSetup');
} catch {
  jest.mock(
    'react-native-gesture-handler',
    () => {
      const React = require('react');
      const { View } = require('react-native');
      return {
        GestureHandlerRootView: ({ children }) => <View>{children}</View>,
        State: {},
        PanGestureHandler: ({ children }) => <View>{children}</View>,
        TapGestureHandler: ({ children }) => <View>{children}</View>,
      };
    },
    { virtual: true }
  );
}

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock(
  'react-native/Libraries/Animated/NativeAnimatedHelper',
  () => ({ NativeAnimatedModule: { addListener: jest.fn(), removeListeners: jest.fn() } }),
  { virtual: true }
);
