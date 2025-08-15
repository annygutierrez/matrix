import React from 'react';
import {render} from '@testing-library/react-native';
import {Header} from './Header';

const flatten = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

describe('Header', () => {
  it('renders children and default style', () => {
    const {getByText} = render(<Header>Hello</Header>);
    const el = getByText('Hello');

    const style = flatten(el.props.style);
    expect(style.fontSize).toBe(25);
  });

  it('forwards TextProps (e.g., numberOfLines, testID)', () => {
    const {getByTestId} = render(
      <Header numberOfLines={1} testID="header.text">
        Title
      </Header>,
    );
    const el = getByTestId('header.text');
    expect(el.props.numberOfLines).toBe(1);
    expect(el.props.children).toBe('Title');
  });

  it('allows a passed style to override the default', () => {
    const {getByTestId} = render(
      <Header testID="header.text" style={{fontSize: 18, color: 'red'}}>
        Title
      </Header>,
    );
    const el = getByTestId('header.text');

    const style = flatten(el.props.style);
    expect(style.fontSize).toBe(18);
    expect(style.color).toBe('red');
  });
});
