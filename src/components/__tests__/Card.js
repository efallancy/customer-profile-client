import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Card from '../Card';

describe('Card', () => {
  it('renders correctly', () => {
    const card = renderer.create(<Card />).toJSON();
    expect(card).toMatchSnapshot();
  });
});
