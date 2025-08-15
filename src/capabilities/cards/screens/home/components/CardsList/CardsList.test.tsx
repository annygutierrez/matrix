import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CardsList} from './CardsList';

jest.mock('../CardTemplate/CardTemplate', () => {
  const {Pressable, Text} = require('react-native');
  return {
    CardTemplate: ({card, onPress}: any) => (
      <Pressable
        testID={`cardsList.item.${card?.cardId ?? 'unknown'}`}
        onPress={() => onPress(card)}
        accessibilityRole="button"
      >
        <Text>{card?.cardId ?? 'unknown'}</Text>
      </Pressable>
    ),
  };
});

const flatten = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

describe('CardsList', () => {

  it('renders one CardTemplate per card', () => {
    const cards = [
      {cardId: 'card_1', last4: '1111'},
      {cardId: 'card_2', last4: '2222'},
    ] as any;

    const {getByTestId} = render(
      <CardsList cards={cards} onPressItem={jest.fn()} />,
    );

    expect(getByTestId('cardsList.item.card_1')).toBeTruthy();
    expect(getByTestId('cardsList.item.card_2')).toBeTruthy();
  });

  it('forwards onPressItem to CardTemplate and passes the card', () => {
    const cards = [{cardId: 'card_9', last4: '9999'}] as any;
    const onPressItem = jest.fn();

    const {getByTestId} = render(
      <CardsList cards={cards} onPressItem={onPressItem} />,
    );

    fireEvent.press(getByTestId('cardsList.item.card_9'));

    expect(onPressItem).toHaveBeenCalledTimes(1);
    expect(onPressItem).toHaveBeenCalledWith(cards[0]);
  });

  it('applies the contentContainerStyle (rowGap: 12) on the ScrollView', () => {
    const {getByTestId} = render(
      <CardsList cards={[]} onPressItem={jest.fn()} />,
    );

    const scroll = getByTestId('cardsList.scroll');
    const style = flatten(scroll.props.contentContainerStyle);
    expect(style.rowGap).toBe(12);
  });

  it('allows overriding the scroll testID if needed', () => {
    const {getByTestId} = render(
      <CardsList testID="cards.customScroll" cards={[]} onPressItem={jest.fn()} />,
    );
    expect(getByTestId('cards.customScroll')).toBeTruthy();
  });
});
