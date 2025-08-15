import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import {ProfileTag} from './ProfileTag';

const flatten = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

describe('ProfileTag', () => {
  it('renders the description text', () => {
    const {getByText} = render(<ProfileTag description="Gold member" />);
    expect(getByText('Gold member')).toBeTruthy();
  });

  it('applies text styles (color & fontSize) to the label', () => {
    const {getByText} = render(<ProfileTag description="VIP" />);
    const label = getByText('VIP');

    const style = flatten(label.props.style);
    expect(style.color).toBe('#F49417');
    expect(style.fontSize).toBe(11);
  });

  it('applies container styles (bg, marginRight, padding, radius)', () => {
    const {getByText} = render(<ProfileTag description="Member" />);
    const label = getByText('Member');

    let node: any = label.parent;
    let container: any = null;
    while (node && !container) {
      if (node.type === View) container = node;
      node = node.parent;
    }

    expect(container).toBeTruthy();

    const containerStyle = flatten(container.props.style);
    expect(containerStyle.backgroundColor).toBe('#FFEC8D');
    expect(containerStyle.marginRight).toBe('auto');
    expect(containerStyle.paddingHorizontal).toBe(8);
    expect(containerStyle.paddingVertical).toBe(3);
    expect(containerStyle.borderRadius).toBe(15);
  });
});
