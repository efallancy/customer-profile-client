import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { PrimaryButton, SecondaryButton } from '../Button';

describe('Button', () => {
  describe('Primary', () => {
    it('renders correctly', () => {
      const button = renderer.create(<PrimaryButton />).toJSON();
      expect(button).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
      const button = renderer.create(<PrimaryButton disabled />).toJSON();
      expect(button).toMatchSnapshot();
    });
  });

  describe('Secondary', () => {
    it('renders correctly', () => {
      const button = renderer.create(<SecondaryButton />).toJSON();
      expect(button).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
      const button = renderer.create(<SecondaryButton disabled />).toJSON();
      expect(button).toMatchSnapshot();
    });
  });
});
