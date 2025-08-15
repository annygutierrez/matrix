import React from 'react';
import { render } from '@testing-library/react-native';
import { ProfileHeader } from './ProfileHeader';

jest.mock('../../../../../../ui', () => {
  const { View, Text } = require('react-native');
  return {
    Avatar: ({ width, height, uri, ...rest }) => (
      <View testID="profile-avatar" width={width} height={height} uri={uri} {...rest} />
    ),
    Text: {
      Header: ({ children, ...p }) => <Text {...p}>{children}</Text>,
    },
  };
});

jest.mock('../ProfileTag/ProfileTag', () => {
  const { Text } = require('react-native');
  return {
    ProfileTag: ({ description, ...rest }) => (
      <Text testID="profile-tag" {...rest}>{description}</Text>
    ),
  };
});

describe('ProfileHeader', () => {
  const props = {
    avatar: 'https://example.com/avatar.png',
    userName: 'Ada Lovelace',
    club: 'Chess Club',
  };

  it('renders the user name', () => {
    const { getByText } = render(<ProfileHeader {...props} />);
    expect(getByText(props.userName)).toBeTruthy();
  });

  it('renders the ProfileTag with the club description', () => {
    const { getByTestId, getByText } = render(<ProfileHeader {...props} />);
    expect(getByTestId('profile-tag')).toBeTruthy();
    expect(getByText(props.club)).toBeTruthy();
  });

  it('renders Avatar with correct size and uri', () => {
    const { getByTestId } = render(<ProfileHeader {...props} />);
    const avatar = getByTestId('profile-avatar');

    expect(avatar.props.width).toBe(50);
    expect(avatar.props.height).toBe(50);
    expect(avatar.props.uri).toBe(props.avatar);
  });
});
