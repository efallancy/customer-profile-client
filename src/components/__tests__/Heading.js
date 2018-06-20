import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { PageHeading, TitleHeading, ErrorHeading } from '../Heading';

describe('Heading', () => {
  it('Page heading renders correctly', () => {
    const pageHeading = renderer.create(<PageHeading />).toJSON();
    expect(pageHeading).toMatchSnapshot();
  });

  it('Title heading renders correctly', () => {
    const titleHeading = renderer.create(<TitleHeading />).toJSON();
    expect(titleHeading).toMatchSnapshot();
  });

  it('Error heading renders correctly', () => {
    const errorHeading = renderer.create(<ErrorHeading />).toJSON();
    expect(errorHeading).toMatchSnapshot();
  });
});
