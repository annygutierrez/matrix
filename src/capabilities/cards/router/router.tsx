import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';
import { CardsNavigation } from './router.enum';
import { CardsProvider } from '../providers';

const Stack = createNativeStackNavigator();

export const CardsStack = () => (
    <CardsProvider>
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
        <Stack.Screen
            name={CardsNavigation.HOME}
            component={HomeScreen}
        />
        </Stack.Navigator>
    </CardsProvider>
);
