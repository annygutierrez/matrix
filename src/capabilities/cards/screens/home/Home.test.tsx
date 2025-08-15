import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Pressable } from 'react-native';
import { HomeScreen } from './Home.screen';
import { useHomeScreen as _useHomeScreen } from './hooks/home-screen.hook';

jest.mock('./components', () => {
  const { View, Pressable } = require('react-native');
  return {
    ProfileHeader: ({ avatar, userName, club }) => (
      <View
        testID="profile-header"
        avatar={avatar}
        userName={userName}
        club={club}
      />
    ),
    CardListHeader: ({ numberOfCards }) => (
      <View testID="card-list-header" numberOfCards={numberOfCards} />
    ),
    CardsList: ({ onPressItem, cards }) => (
      <Pressable
        testID="cards-list"
        onPress={() => onPressItem?.(cards?.[0])}
      />
    ),
  };
});

jest.mock('./hooks/home-screen.hook');

const useHomeScreen = _useHomeScreen as jest.Mock;

describe('HomeScreen', () => {
  const onSelectCard = jest.fn();
  const onCloseModal = jest.fn();
  const handleError = jest.fn();

  const cards = [{ id: 'c1' }, { id: 'c2' }];
  const selectedCard = { id: 'c1', visible: true, hmacSignature: 'sig-123' };

  const FakeSecureViewer = ({
    onClosed,
    onTimeout,
    onError,
    ...props
  }: any) => (
    <View testID="secure-viewer" {...props}>
      <Pressable
        testID="secure-viewer-close"
        onPress={() => onClosed?.({ nativeEvent: { reason: 'closed' } })}
      />
      <Pressable
        testID="secure-viewer-timeout"
        onPress={() => onTimeout?.({ nativeEvent: { reason: 'timeout' } })}
      />
      <Pressable
        testID="secure-viewer-error"
        onPress={() => onError?.({ nativeEvent: { message: 'boom' } })}
      />
    </View>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    useHomeScreen.mockReturnValue({
      userProfile: {
        avatarUrl: 'https://example.com/a.png',
        userName: 'Ada Lovelace',
        membersClub: 'Chess Club',
      },
      numberOfCards: cards.length,
      cards,
      SecureViewer: FakeSecureViewer,
      selectedCard,
      onSelectCard,
      onCloseModal,
      handleError,
    });
  });

  it('passes user data to ProfileHeader', () => {
    const { getByTestId } = render(<HomeScreen />);
    const header = getByTestId('profile-header');
    expect(header.props.avatar).toBe('https://example.com/a.png');
    expect(header.props.userName).toBe('Ada Lovelace');
    expect(header.props.club).toBe('Chess Club');
  });

  it('passes numberOfCards to CardListHeader', () => {
    const { getByTestId } = render(<HomeScreen />);
    const header = getByTestId('card-list-header');
    expect(header.props.numberOfCards).toBe(cards.length);
  });

  it('forwards onSelectCard to CardsList (fires with first card)', () => {
    const { getByTestId } = render(<HomeScreen />);
    fireEvent.press(getByTestId('cards-list'));
    expect(onSelectCard).toHaveBeenCalledTimes(1);
    expect(onSelectCard).toHaveBeenCalledWith(cards[0]);
  });

  it('passes selectedCard props to SecureViewer', () => {
    const { getByTestId } = render(<HomeScreen />);
    const viewer = getByTestId('secure-viewer');
    expect(viewer.props.visible).toBe(true);
    expect(viewer.props.hmacSignature).toBe('sig-123');
    expect(viewer.props.id).toBe('c1');
  });

  it('calls onCloseModal on close and timeout', () => {
    const { getByTestId } = render(<HomeScreen />);
    fireEvent.press(getByTestId('secure-viewer-close'));
    fireEvent.press(getByTestId('secure-viewer-timeout'));
    expect(onCloseModal).toHaveBeenCalledTimes(2);
  });

  it('calls handleError with nativeEvent on error', () => {
    const { getByTestId } = render(<HomeScreen />);
    fireEvent.press(getByTestId('secure-viewer-error'));
    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith({ message: 'boom' });
  });
});
