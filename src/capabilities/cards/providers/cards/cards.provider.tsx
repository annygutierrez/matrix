import React, {
    createContext,
    ReactNode
  } from 'react';
import { useCardsContextState } from './hooks/cards.hook';
import { CardsContextProps } from './utils/cards.utils';
  
  export const CardsContext = createContext<
  CardsContextProps | undefined
  >(undefined);
  
  export const CardsProvider = ({
    children
  }: {
    children: ReactNode;
  }) => {
    const contextState = useCardsContextState();
  
    return (
      <CardsContext.Provider value={contextState}>
        {children}
      </CardsContext.Provider>
    );
  };
  