import React from 'react';
import {render} from '@testing-library/react-native';
import {Avatar} from './Avatar';

const flatten = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

describe('Avatar', () => {
  it('renders with default props and styles', () => {
    const {getByTestId} = render(<Avatar />);

    const img = getByTestId('avatar-image');
    expect(img.props.source).toEqual({uri: ''});
    expect(img.props.resizeMode).toBe('cover');
    expect(img.props.width).toBe(0);
    expect(img.props.height).toBe(0);

    const style = flatten(img.props.style);
    expect(style.borderRadius).toBe(100);
    expect(style.elevation).toBe(5);
  });

  it('renders custom uri, width, and height', () => {
    const uri = 'https://example.com/avatar.png';
    const {getByTestId} = render(<Avatar uri={uri} width={64} height={64} />);

    const img = getByTestId('avatar-image');
    expect(img.props.source).toEqual({uri});
    expect(img.props.width).toBe(64);
    expect(img.props.height).toBe(64);
  });

  it('allows overriding testID', () => {
    const {getByTestId} = render(<Avatar testID="profile.avatar" />);
    expect(getByTestId('profile.avatar')).toBeTruthy();
  });
});
