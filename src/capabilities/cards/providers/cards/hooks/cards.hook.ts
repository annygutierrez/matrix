import { useState, useMemo } from 'react';
import { Card, cardsDefaultValues } from '../utils/cards.utils';
  
  export const useCardsContextState = () => {
    const [cards, setCards] = useState<Card[]>(cardsDefaultValues);
  
    const contextState = useMemo(
      () => ({
        cards,
        setCards
      }),
      [
        cards,
        setCards
      ]
    );
  
    return contextState;
  };
  