import React from 'react';
import {renderHook} from '@testing-library/react-native';
import {useCardsContext} from '../cards/hooks/cards.context';
import {CardsContext} from '../cards/cards.provider';

describe('useCardsContext', () => {
  it('throws if used outside of provider', () => {
    const renderFn = () => renderHook(() => useCardsContext());
    expect(renderFn).toThrow(
      'useCardsContext must be used within an ApplicationProvider',
    );
  });

  it('returns the value when inside provider', () => {
    const value = {
      cards: [{id: 'c1', last4: '1111'}],
      selectedCardId: 'c1',
      setSelectedCardId: jest.fn(),
      refresh: jest.fn(),
    };

    const wrapper: React.FC<React.PropsWithChildren> = ({children}) => (
      <CardsContext.Provider value={value as any}>{children}</CardsContext.Provider>
    );

    const {result} = renderHook(() => useCardsContext(), {wrapper});
    expect(result.current).toBe(value);
  });
});
