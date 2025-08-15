import { useContext } from 'react';
import { CardsContext } from '../cards.provider';

export const useCardsContext = () => {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCardsContext must be used within an ApplicationProvider');
  }
  return context;
};
