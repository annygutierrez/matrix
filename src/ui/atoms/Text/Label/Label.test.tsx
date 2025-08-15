import React from 'react';
import {render} from '@testing-library/react-native';
import {Label} from './Label';

const flatten = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

describe('Label', () => {
  it('renders children and default style', () => {
    const {getByText} = render(<Label>hello</Label>);
    const el = getByText('hello');

    const style = flatten(el.props.style);
    expect(style.fontSize).toBe(12);
  });

  it('forwards TextProps (e.g., numberOfLines, testID)', () => {
    const {getByTestId} = render(
      <Label numberOfLines={1} testID="label.text">
        Info
      </Label>,
    );
    const el = getByTestId('label.text');
    expect(el.props.numberOfLines).toBe(1);
    expect(el.props.children).toBe('Info');
  });

  it('allows a passed style to override defaults', () => {
    const {getByTestId} = render(
      <Label testID="label.text" style={{fontSize: 14, color: 'blue'}}>
        Info
      </Label>,
    );
    const el = getByTestId('label.text');
    const style = flatten(el.props.style);

    expect(style.fontSize).toBe(14);
    expect(style.color).toBe('blue');
  });
});
