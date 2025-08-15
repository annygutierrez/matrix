import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardsNavigation, CardsStack, SessionProvider } from '../capabilities';
import { SCREEN_DEFAULT_CONFIG } from './constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={SCREEN_DEFAULT_CONFIG}
          >
            <Stack.Screen name={CardsNavigation.CARDS_STACK} component={CardsStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      </SessionProvider>
  );
};
