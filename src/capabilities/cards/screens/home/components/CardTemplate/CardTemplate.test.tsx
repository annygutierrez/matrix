import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CardTemplate } from './CardTemplate';

jest.mock('react-native-linear-gradient', () => {
  const { View } = require('react-native');
  return ({ children, testID = 'linear-gradient', ...props }) => (
    <View testID={testID} {...props}>
      {children}
    </View>
  );
});

jest.mock('../../../../../../ui', () => {
  const { Text } = require('react-native');
  return {
    Text: {
      Label: ({ children, ...p }) => <Text {...p}>{children}</Text>,
    },
  };
});

jest.mock('../../../../providers', () => ({}));

describe('CardTemplate', () => {
  const card = {
    gradient: ['#111111', '#222222'],
    bankLogo: 'https://example.com/bank.png',
    sponsorLogo: 'https://example.com/visa.png',
    cardNumber: '**** **** **** 1234',
    expirationDate: '12/28',
  } as any;

  it('renders the card number and expiration label', () => {
    const { getByText } = render(<CardTemplate card={card} onPress={jest.fn()} />);
    expect(getByText(card.cardNumber)).toBeTruthy();
    expect(getByText(`Ven. ${card.expirationDate}`)).toBeTruthy();
  });

  it('passes gradient colors to LinearGradient', () => {
    const { getByTestId } = render(<CardTemplate card={card} onPress={jest.fn()} />);
    const gradient = getByTestId('card-template-gradient');
    expect(gradient.props.colors).toEqual(card.gradient);
  });

  it('renders bank and sponsor logos with correct URIs and sizes', () => {
    const { getByTestId } = render(<CardTemplate card={card} onPress={jest.fn()} />);
    const bank = getByTestId('card-template-bank-logo');
    const sponsor = getByTestId('card-template-sponsor-logo');

    expect(bank.props.source?.uri).toBe(card.bankLogo);
    expect(bank.props.width).toBe(60);
    expect(bank.props.height).toBe(30);

    expect(sponsor.props.source?.uri).toBe(card.sponsorLogo);
    expect(sponsor.props.width).toBe(40);
    expect(sponsor.props.height).toBe(24);
  });

  it('calls onPress with the card', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<CardTemplate card={card} onPress={onPress} />);
    fireEvent.press(getByTestId('card-template-pressable'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(card);
  });

  it('does not throw when onPress is omitted (default noop)', () => {
    const { getByTestId } = render(<CardTemplate card={card} />);
    expect(() => fireEvent.press(getByTestId('card-template-pressable'))).not.toThrow();
  });
});
