import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputSearch from '../InputSearch';

Enzyme.configure({ adapter: new Adapter() });

describe('InputSearch', () => {
  let inputSearch;
  const clickSearch = jest.fn();
  
  it('should render correctly', () => {
    inputSearch = mount(<InputSearch onClickSearch={clickSearch} />);
    expect(inputSearch.find('input').length).toBe(1);
    expect(inputSearch.find('button').length).toBe(1);

    describe('setting state correctly and simulate click', () => {
      it('should set "search" state correctly', () => {
        const expectedState = 'My value';
        inputSearch.find('input').simulate('change', {target: {value: expectedState }});

        expect(inputSearch.state('search')).toBe(expectedState);
      });

      it('should call onClickSearch props function', () => {
        inputSearch.find('button').simulate('click');

        expect(clickSearch.mock.calls.length).toBe(1);
      });
    });
  });
});
