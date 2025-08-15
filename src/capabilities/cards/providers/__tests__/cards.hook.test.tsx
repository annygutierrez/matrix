import {renderHook, act} from '@testing-library/react-native';

jest.mock('../cards/utils/cards.utils', () => ({
  cardsDefaultValues: [
    {id: 'c1', brand: 'visa', last4: '4242'},
    {id: 'c2', brand: 'mc', last4: '0005'},
  ],
}));

import {useCardsContextState} from '../cards/hooks/cards.hook';

describe('useCardsContextState', () => {
  it('returns default cards on init', () => {
    const {result} = renderHook(() => useCardsContextState());
    expect(result.current.cards).toEqual([
      {id: 'c1', brand: 'visa', last4: '4242'},
      {id: 'c2', brand: 'mc', last4: '0005'},
    ]);
    expect(typeof result.current.setCards).toBe('function');
  });

  it('updates cards when setCards is called', () => {
    const {result} = renderHook(() => useCardsContextState());

    const next = [{id: 'c3', brand: 'amex', last4: '8431'}] as any;

    act(() => {
      result.current.setCards(next);
    });

    expect(result.current.cards).toEqual(next);
  });

  it('memoizes the returned context object when state is unchanged (no-op set)', () => {
    const {result} = renderHook(() => useCardsContextState());
    const firstRef = result.current;
    const sameArrayRef = result.current.cards;

    act(() => {
      result.current.setCards(sameArrayRef as any);
    });

    expect(result.current).toBe(firstRef);
  });

  it('returns a new memoized object when cards changes', () => {
    const {result} = renderHook(() => useCardsContextState());
    const prevRef = result.current;
    const prevSetter = result.current.setCards;

    act(() => {
      result.current.setCards([
        ...result.current.cards,
        {id: 'c4', brand: 'visa', last4: '1111'} as any,
      ]);
    });

    expect(result.current).not.toBe(prevRef);
    expect(result.current.setCards).toBe(prevSetter);
    expect(result.current.cards).toHaveLength(3);
  });
});
