import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import {CardListHeader} from './CardListHeader';

const flatten = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

describe('CardListHeader', () => {
  it('renders default count (0) cards', () => {
    const {getByText} = render(<CardListHeader />);
    expect(getByText('(0) cards')).toBeTruthy();
  });

  it('renders provided numberOfCards', () => {
    const {getByText} = render(<CardListHeader numberOfCards={3} />);
    expect(getByText('(3) cards')).toBeTruthy();
  });

  it('applies label styles (color and fontSize)', () => {
    const {getByText} = render(<CardListHeader numberOfCards={2} />);
    const label = getByText('(2) cards');

    const style = flatten(label.props.style);
    expect(style.color).toBe('#6E6E67');
    expect(style.fontSize).toBe(12);
  });

  it('container has margins (marginTop & paddingBottom)', () => {
    const {getByText} = render(<CardListHeader numberOfCards={1} />);
    const label = getByText('(1) cards');

    let node: any = label.parent;
    let container: any = null;
    while (node && !container) {
      if (node.type === View) container = node;
      node = node.parent;
    }

    expect(container).toBeTruthy();
    const containerStyle = flatten(container.props.style);
    expect(containerStyle.marginTop).toBe(20);
    expect(containerStyle.paddingBottom).toBe(20);
  });
});
